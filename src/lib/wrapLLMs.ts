import { trace, context, Span } from '@opentelemetry/api';
import { NodeTracerProvider, BatchSpanProcessor, ReadableSpan } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { readEnv } from '../internal/utils';
import { ScorecardError } from '../error';

/**
 * Configuration for wrapping LLM SDKs
 */
interface WrapConfig {
  /**
   * ID of the Scorecard project that traces should be associated with.
   * Defaults to SCORECARD_PROJECT_ID environment variable.
   */
  projectId?: string | undefined;

  /**
   * Scorecard API key for authentication.
   * Defaults to SCORECARD_API_KEY environment variable.
   */
  apiKey?: string | undefined;

  /**
   * Service name for telemetry.
   * Defaults to "llm-app".
   */
  serviceName?: string | undefined;

  /**
   * OTLP endpoint for trace export.
   * Defaults to "https://tracing.scorecard.io/otel/v1/traces".
   */
  endpoint?: string | undefined;

  /**
   * Maximum batch size of spans to be exported in a single request.
   * Lower values provide faster feedback but more network requests.
   * Higher values are more efficient but delay span visibility.
   * @default 1
   */
  maxExportBatchSize?: number | undefined;
}

type LLMProvider = 'openai' | 'anthropic';

/**
 * Custom exporter that wraps OTLP exporter and injects projectId from span attributes
 * into the resource before export. This allows per-span projectId while keeping
 * ResourceAttributes where the backend expects them.
 */
class ScorecardExporter extends OTLPTraceExporter {
  override export(spans: ReadableSpan[], resultCallback: (result: any) => void): void {
    // For each span, if it has a projectId in attributes, inject it into the resource
    spans.forEach((span) => {
      const projectId = span.attributes['scorecard.project_id'];

      if (projectId && typeof projectId === 'string') {
        // Merge projectId into the resource and overwrite
        const newResource = span.resource.merge(
          resourceFromAttributes({
            'scorecard.project_id': projectId,
          }),
        );

        // Directly assign the new resource (cast to any to bypass readonly)
        (span as any).resource = newResource;
      }
    });

    // Call the parent exporter with modified spans
    super.export(spans, resultCallback);
  }
}

/**
 * Composite processor that forwards span events to all registered processors.
 * Allows dynamic addition of exporters after provider registration.
 */
class CompositeProcessor {
  private processors = new Map<string, BatchSpanProcessor>();

  addProcessor(apiKey: string, endpoint: string, maxExportBatchSize: number): void {
    const key = `${apiKey}:${endpoint}`;
    if (this.processors.has(key)) return;

    const exporter = new ScorecardExporter({
      url: endpoint,
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const processor = new BatchSpanProcessor(exporter, {
      maxExportBatchSize,
    });

    this.processors.set(key, processor);
  }

  onStart(span: Span, parentContext: any): void {
    for (const processor of this.processors.values()) {
      processor.onStart(span as any, parentContext);
    }
  }

  onEnd(span: ReadableSpan): void {
    for (const processor of this.processors.values()) {
      processor.onEnd(span);
    }
  }

  async forceFlush(): Promise<void> {
    await Promise.all(Array.from(this.processors.values()).map((p) => p.forceFlush()));
  }

  async shutdown(): Promise<void> {
    await Promise.all(Array.from(this.processors.values()).map((p) => p.shutdown()));
  }
}

let globalProvider: NodeTracerProvider | null = null;
let globalTracer: ReturnType<typeof trace.getTracer> | null = null;
let compositeProcessor: CompositeProcessor | null = null;

/**
 * Initialize OpenTelemetry provider for LLM SDK wrappers.
 * Creates a single global provider for nesting support, with exporters
 * added dynamically for each unique apiKey+endpoint combination.
 */
function initProvider(config: WrapConfig): string | undefined {
  const apiKey = config.apiKey || readEnv('SCORECARD_API_KEY');
  if (!apiKey) {
    throw new ScorecardError(
      'Scorecard API key is required. Set SCORECARD_API_KEY environment variable or pass apiKey in config.',
    );
  }

  const endpoint = config.endpoint || 'https://tracing.scorecard.io/otel/v1/traces';
  const serviceName = config.serviceName || 'llm-app';
  const projectId = config.projectId || readEnv('SCORECARD_PROJECT_ID');
  const maxExportBatchSize = config.maxExportBatchSize ?? 1;

  // Create the global provider once (enables span nesting)
  if (!globalProvider) {
    compositeProcessor = new CompositeProcessor();

    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: serviceName,
    });

    globalProvider = new NodeTracerProvider({
      resource,
      spanProcessors: [compositeProcessor as any],
    });

    globalProvider.register();
    globalTracer = trace.getTracer('scorecard-llm');
  }

  // Add an exporter for this specific apiKey+endpoint (if not already added)
  compositeProcessor?.addProcessor(apiKey, endpoint, maxExportBatchSize);

  return projectId;
}

/**
 * Detect which LLM provider the client is for
 */
function detectProvider(client: any): LLMProvider {
  // Check for OpenAI SDK structure
  if (client.chat?.completions) {
    return 'openai';
  }

  // Check for Anthropic SDK structure
  if (client.messages) {
    return 'anthropic';
  }

  throw new ScorecardError(
    'Unable to detect LLM provider. Client must be an OpenAI or Anthropic SDK instance.',
  );
}

/**
 * Handle OpenAI-specific response parsing
 */
function handleOpenAIResponse(span: Span, result: any, params: any) {
  span.setAttributes({
    'gen_ai.response.id': result.id || 'unknown',
    'gen_ai.response.model': result.model || params.model || 'unknown',
    'gen_ai.response.finish_reason': result.choices?.[0]?.finish_reason || 'unknown',
    'gen_ai.usage.prompt_tokens': result.usage?.prompt_tokens || 0,
    'gen_ai.usage.completion_tokens': result.usage?.completion_tokens || 0,
    'gen_ai.usage.total_tokens': result.usage?.total_tokens || 0,
  });

  if (result.choices?.[0]?.message) {
    span.setAttribute('gen_ai.completion.choices', JSON.stringify([result.choices[0].message]));
  }
}

/**
 * Handle Anthropic-specific response parsing
 */
function handleAnthropicResponse(span: Span, result: any, params: any) {
  span.setAttributes({
    'gen_ai.response.id': result.id || 'unknown',
    'gen_ai.response.model': result.model || params.model || 'unknown',
    'gen_ai.response.finish_reason': result.stop_reason || 'unknown',
    'gen_ai.usage.prompt_tokens': result.usage?.input_tokens || 0,
    'gen_ai.usage.completion_tokens': result.usage?.output_tokens || 0,
    'gen_ai.usage.total_tokens': (result.usage?.input_tokens || 0) + (result.usage?.output_tokens || 0),
  });

  if (result.content?.[0]?.text) {
    span.setAttribute(
      'gen_ai.completion.choices',
      JSON.stringify([{ message: { role: 'assistant', content: result.content[0].text } }]),
    );
  }
}

/**
 * Wrap any LLM SDK (OpenAI or Anthropic) to automatically trace all API calls
 *
 * @example
 * ```typescript
 * import { wrap } from '@scorecard/node';
 * import OpenAI from 'openai';
 * import Anthropic from '@anthropic-ai/sdk';
 *
 * // Works with OpenAI
 * const openai = wrap(new OpenAI({ apiKey: '...' }), {
 *   apiKey: process.env.SCORECARD_API_KEY,
 *   projectId: '123'
 * });
 *
 * // Works with Anthropic
 * const claude = wrap(new Anthropic({ apiKey: '...' }), {
 *   apiKey: process.env.SCORECARD_API_KEY,
 *   projectId: '123'
 * });
 *
 * // Use normally - traces are automatically sent to Scorecard
 * const response = await openai.chat.completions.create({...});
 * const response2 = await claude.messages.create({...});
 * ```
 */
export function wrap<T>(client: T, config: WrapConfig = {}): T {
  const projectId = initProvider(config);

  if (!globalTracer) {
    throw new ScorecardError('Failed to initialize tracer');
  }

  const tracer = globalTracer;
  const provider = detectProvider(client);

  const createHandler = (target: any): ProxyHandler<any> => ({
    get(target, prop: string | symbol) {
      const value = target[prop];

      // Intercept the 'create' method
      if (prop === 'create' && typeof value === 'function') {
        return async function (this: any, ...args: any[]) {
          // Start span in the current active context (enables nesting)
          const span = tracer.startSpan(`${provider}.request`, {}, context.active());
          const params = args[0] || {};

          // Set request attributes (common to both providers)
          span.setAttributes({
            'gen_ai.system': provider,
            'gen_ai.request.model': params.model || 'unknown',
            'gen_ai.operation.name': 'chat',
            ...(params.temperature !== undefined && { 'gen_ai.request.temperature': params.temperature }),
            ...(params.max_tokens !== undefined && { 'gen_ai.request.max_tokens': params.max_tokens }),
            ...(params.top_p !== undefined && { 'gen_ai.request.top_p': params.top_p }),
          });

          // Store projectId as span attribute - our custom exporter will inject it
          // into ResourceAttributes before export (where the backend expects it)
          if (projectId) {
            span.setAttribute('scorecard.project_id', projectId);
          }

          // Set prompt messages
          if (params.messages) {
            span.setAttribute('gen_ai.prompt.messages', JSON.stringify(params.messages));
          }

          // Execute within the span's context (enables nested spans to be children)
          return context.with(trace.setSpan(context.active(), span), async () => {
            try {
              const result = await value.apply(target, args);

              // Set response attributes (provider-specific)
              if (provider === 'openai') {
                handleOpenAIResponse(span, result, params);
              } else if (provider === 'anthropic') {
                handleAnthropicResponse(span, result, params);
              }

              return result;
            } catch (error: any) {
              span.recordException(error);
              throw error;
            } finally {
              span.end();
            }
          });
        };
      }

      // Recursively proxy nested objects
      if (value && typeof value === 'object') {
        return new Proxy(value, createHandler(value));
      }

      // Return functions and primitives as-is
      if (typeof value === 'function') {
        return value.bind(target);
      }

      return value;
    },
  });

  return new Proxy(client, createHandler(client)) as T;
}

// Backwards compatibility aliases
export const wrapOpenAI = wrap;
export const wrapAnthropic = wrap;
