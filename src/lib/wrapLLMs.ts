import { trace, context, Span, Context } from '@opentelemetry/api';
import {
  NodeTracerProvider,
  BatchSpanProcessor,
  ReadableSpan,
  Span as SdkSpan,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-node';
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
    // For each span, inject all scorecard.* attributes into the resource
    spans.forEach((span) => {
      // Collect all scorecard.* attributes from span attributes
      const scorecardAttrs = Object.entries(span.attributes).reduce(
        (acc, [key, value]) => {
          if (key.startsWith('scorecard.')) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );

      if (Object.keys(scorecardAttrs).length > 0) {
        // Merge all scorecard.* attributes into the resource
        const newResource = span.resource.merge(resourceFromAttributes(scorecardAttrs));

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
class CompositeProcessor implements SpanProcessor {
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

  onStart(span: SdkSpan, parentContext: Context): void {
    for (const processor of this.processors.values()) {
      processor.onStart(span, parentContext);
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

  // Collect text from all text blocks (Anthropic can return multiple content blocks)
  if (result.content) {
    const completionTexts = result.content.filter((c: any) => c.text).map((c: any) => c.text);
    if (completionTexts.length > 0) {
      span.setAttribute(
        'gen_ai.completion.choices',
        JSON.stringify([{ message: { role: 'assistant', content: completionTexts.join('\n') } }]),
      );
    }
  }
}

/**
 * Wrapper for async streams that collects metadata and ends span when consumed
 */
class StreamWrapper {
  private contentParts: string[] = [];
  private finishReason: string | null = null;
  private usageData: Record<string, number> = {};
  private responseId: string | null = null;
  private model: string | null = null;

  constructor(
    private stream: AsyncIterable<any>,
    private span: Span,
    private provider: LLMProvider,
    private params: any,
  ) {}

  async *[Symbol.asyncIterator](): AsyncIterator<any> {
    try {
      for await (const chunk of this.stream) {
        this.processChunk(chunk);
        yield chunk;
      }
    } finally {
      this.finalizeSpan();
    }
  }

  private processChunk(chunk: any): void {
    // OpenAI streaming format
    if (this.provider === 'openai') {
      if (!this.responseId && chunk.id) {
        this.responseId = chunk.id;
      }
      if (!this.model && chunk.model) {
        this.model = chunk.model;
      }

      if (chunk.choices?.[0]) {
        const choice = chunk.choices[0];
        if (choice.delta?.content) {
          this.contentParts.push(choice.delta.content);
        }
        if (choice.finish_reason) {
          this.finishReason = choice.finish_reason;
        }
      }

      // OpenAI includes usage in the last chunk with stream_options
      if (chunk.usage) {
        this.usageData = {
          prompt_tokens: chunk.usage.prompt_tokens || 0,
          completion_tokens: chunk.usage.completion_tokens || 0,
          total_tokens: chunk.usage.total_tokens || 0,
        };
      }
    }
    // Anthropic streaming format
    else if (this.provider === 'anthropic') {
      if (chunk.type === 'message_start' && chunk.message) {
        this.responseId = chunk.message.id;
        this.model = chunk.message.model;
        if (chunk.message.usage) {
          this.usageData['input_tokens'] = chunk.message.usage.input_tokens || 0;
        }
      } else if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
        this.contentParts.push(chunk.delta.text);
      } else if (chunk.type === 'message_delta') {
        if (chunk.delta?.stop_reason) {
          this.finishReason = chunk.delta.stop_reason;
        }
        if (chunk.usage?.output_tokens) {
          this.usageData['output_tokens'] = chunk.usage.output_tokens;
        }
      }
    }
  }

  private finalizeSpan(): void {
    // Set response attributes
    this.span.setAttributes({
      'gen_ai.response.id': this.responseId || 'unknown',
      'gen_ai.response.model': this.model || this.params.model || 'unknown',
      'gen_ai.response.finish_reason': this.finishReason || 'unknown',
    });

    // Set usage data
    if (Object.keys(this.usageData).length > 0) {
      if (this.provider === 'openai') {
        this.span.setAttributes({
          'gen_ai.usage.prompt_tokens': this.usageData['prompt_tokens'] || 0,
          'gen_ai.usage.completion_tokens': this.usageData['completion_tokens'] || 0,
          'gen_ai.usage.total_tokens': this.usageData['total_tokens'] || 0,
        });
      } else if (this.provider === 'anthropic') {
        const inputTokens = this.usageData['input_tokens'] || 0;
        const outputTokens = this.usageData['output_tokens'] || 0;
        this.span.setAttributes({
          'gen_ai.usage.prompt_tokens': inputTokens,
          'gen_ai.usage.completion_tokens': outputTokens,
          'gen_ai.usage.total_tokens': inputTokens + outputTokens,
        });
      }
    }

    // Set completion content if any was collected
    if (this.contentParts.length > 0) {
      const content = this.contentParts.join('');
      this.span.setAttribute(
        'gen_ai.completion.choices',
        JSON.stringify([{ message: { role: 'assistant', content } }]),
      );
    }

    this.span.end();
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

  // Track the path to determine if we should wrap this method
  const createHandler = (target: any, path: string[] = []): ProxyHandler<any> => ({
    get(target, prop: string | symbol) {
      const value = target[prop];

      // Check if this is a method we should wrap based on the path
      const currentPath = [...path, prop.toString()];
      const shouldWrap =
        (provider === 'openai' && currentPath.join('.') === 'chat.completions.create') ||
        (provider === 'anthropic' &&
          (currentPath.join('.') === 'messages.create' || currentPath.join('.') === 'messages.stream'));

      // Intercept specific LLM methods
      if (shouldWrap && typeof value === 'function') {
        return async function (this: any, ...args: any[]) {
          const params = args[0] || {};
          // Streaming if: 1) stream param is true, or 2) using the 'stream' method
          const isStreaming = params.stream === true || prop === 'stream';

          // Start span in the current active context (enables nesting)
          const span = tracer.startSpan(`${provider}.request`, {}, context.active());

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

              if (isStreaming) {
                // For streaming, wrap the stream to collect metadata and end span when consumed
                return new StreamWrapper(result, span, provider, params);
              } else {
                // For non-streaming, set response attributes immediately
                if (provider === 'openai') {
                  handleOpenAIResponse(span, result, params);
                } else if (provider === 'anthropic') {
                  handleAnthropicResponse(span, result, params);
                }
                return result;
              }
            } catch (error: any) {
              span.recordException(error);
              throw error;
            } finally {
              // Only end span for non-streaming (streaming ends in StreamWrapper)
              if (!isStreaming) {
                span.end();
              }
            }
          });
        };
      }

      // Recursively proxy nested objects, passing the path along
      if (value && typeof value === 'object') {
        return new Proxy(value, createHandler(value, currentPath));
      }

      // Return functions and primitives as-is
      if (typeof value === 'function') {
        return value.bind(target);
      }

      return value;
    },
  });

  return new Proxy(client, createHandler(client, [])) as T;
}

// Backwards compatibility aliases
export const wrapOpenAI = wrap;
export const wrapAnthropic = wrap;
