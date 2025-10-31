import { NodeTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { defaultResource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { Tracer } from '@opentelemetry/api';
import { readEnv } from '../internal/utils';
import { ScorecardError } from '../error';
import { Scorecard } from '../client';

/**
 * Configuration for the Scorecard AI SDK wrapper
 */
interface ScorecardConfig {
  /**
   * Scorecard project ID
   * Defaults to SCORECARD_PROJECT_ID environment variable
   */
  projectId?: string;

  /**
   * Metrics to score the traces against
   * It can be a list of metric IDs, descriptions of what you want the metric to do, or a mix of both
   * For example: ['123', 'Check if the response is concise']
   * If it's a description, the metric will be created if it doesn't exist
   * Defaults to empty array
   */
  metrics?: string[];

  /**
   * Scorecard API key for authentication
   * Defaults to SCORECARD_API_KEY environment variable
   */
  apiKey?: string;

  /**
   * Service name for telemetry
   * Defaults to "ai-sdk-app"
   */
  serviceName?: string;

  /**
   * Service version for telemetry
   * Defaults to "1.0.0"
   */
  serviceVersion?: string;

  /**
   * Max export batch size for the batch span processor
   * Defaults to 1 so the traces are exported immediately
   */
  maxExportBatchSize?: number;
}

let tracerProvider: NodeTracerProvider | null = null;
let tracer: Tracer | null = null;
const DEFAULT_SERVICE_NAME = 'ai-sdk-app';
/**
 * Initialize the OpenTelemetry tracer with Scorecard configuration
 */
function initializeTracer(config: ScorecardConfig = {}): Tracer {
  // Return existing tracer if already initialized
  if (tracer && tracerProvider) {
    return tracer;
  }

  const {
    projectId = readEnv('SCORECARD_PROJECT_ID'),
    apiKey = readEnv('SCORECARD_API_KEY'),
    serviceName = DEFAULT_SERVICE_NAME,
    serviceVersion = '1.0.0',
    maxExportBatchSize = 1,
  } = config;

  // Create resource with service information
  const resource = defaultResource().merge(
    resourceFromAttributes({
      [ATTR_SERVICE_NAME]: serviceName,
      [ATTR_SERVICE_VERSION]: serviceVersion,
      ...(projectId != null ? { 'scorecard.project_id': projectId } : null),
    }),
  );

  // Create span processors
  const spanProcessors = [];

  try {
    const tracingUrl = readEnv('SCORECARD_TRACING_URL') || 'https://tracing.scorecard.io/otel/v1/traces';
    // Create OTLP exporter for Scorecard
    const otlpExporter = new OTLPTraceExporter({
      url: tracingUrl,
      headers:
        apiKey ?
          {
            Authorization: `Bearer ${apiKey}`,
          }
        : {},
    });

    // Add batch span processor with OTLP exporter
    spanProcessors.push(
      new BatchSpanProcessor(otlpExporter, {
        maxExportBatchSize,
      }),
    );
  } catch (error) {
    // Handle initialization errors
    console.error('Failed to initialize Scorecard telemetry:', error);
  }

  // Create tracer provider with span processors
  tracerProvider = new NodeTracerProvider({
    resource,
    spanProcessors,
  });

  // Register the provider
  tracerProvider.register();

  // Get tracer instance
  tracer = tracerProvider.getTracer('ai-sdk-wrapper');

  return tracer;
}

/**
 * Wraps the AI SDK module to automatically inject telemetry configuration
 *
 * @param aiSDKModule - The AI SDK module (e.g., import('ai'))
 * @param config - Optional Scorecard configuration
 * @returns Proxied AI SDK module with automatic telemetry injection
 *
 * @example
 * ```typescript
 * import ai from 'ai';
 * import { wrapAISDK } from 'scorecard-ai/lib/wrapAISDK';
 *
 * const aiSDK = await wrapAISDK(ai);
 *
 * // Now all AI SDK calls will automatically send traces to Scorecard
 * const { text } = await aiSDK.generateText({
 *   model: openai('gpt-4o-mini'),
 *   prompt: 'What is the capital of France? Answer in one sentence.',
 * });
 * ```
 */
export function wrapAISDK<T extends Record<string, unknown>>(
  aiSDKModule: T,
  config: ScorecardConfig = {},
): T {
  const projectId = config.projectId || readEnv('SCORECARD_PROJECT_ID');
  const apiKey = config.apiKey || readEnv('SCORECARD_API_KEY');
  const serviceName = config.serviceName || DEFAULT_SERVICE_NAME;
  if (!apiKey) {
    throw new Error('SCORECARD_API_KEY environment variable is not set');
  }
  const client = new Scorecard({ apiKey });

  if (config.metrics && config.metrics.length > 0 && !projectId) {
    throw new ScorecardError(
      "The SCORECARD_PROJECT_ID environment variable is missing or empty; either provide it, or instantiate the AI SDK wrapper with a projectId option, like ScorecardAIWrapper({ projectId: '123' }).",
    );
  }

  // Create metrics and monitor if needed
  if (config.metrics && config.metrics.length > 0 && projectId) {
    client
      .put(`/api/v2/projects/${projectId}/monitors`, {
        body: {
          description: serviceName,
          metrics: config.metrics,
          filter: {
            serviceName,
          },
        },
      })
      // we use catch instead of try/catch to avoid needing async/await in the wrapper
      // otherwise the code would await here before giving back the wrapped AI SDK module
      .catch((error) => {
        console.error(
          `Failed to create a monitor for your traces. The most common case is your projectId is incorrect.`,
          error,
        );
      });
  }
  // Initialize tracer
  const tracerInstance = initializeTracer(config);

  // Create telemetry configuration to inject
  const telemetryConfig = {
    isEnabled: true,
    recordInputs: true,
    recordOutputs: true,
    tracer: tracerInstance,
  };

  // List of AI SDK functions that accept experimental_telemetry
  const telemetryEnabledFunctions = new Set([
    'embed',
    'embedMany',
    'generateObject',
    'generateText',
    'streamObject',
    'streamText',
  ]);

  // Create a proxy to intercept function calls
  return new Proxy(aiSDKModule, {
    get(target, prop: string | symbol) {
      const originalValue = target[prop as keyof T];

      // Only wrap functions that support telemetry
      if (
        typeof prop === 'string' &&
        telemetryEnabledFunctions.has(prop) &&
        typeof originalValue === 'function'
      ) {
        return function (this: any, ...args: any[]) {
          try {
            // The first argument is typically the options object
            if (args.length > 0 && args[0] && typeof args[0] === 'object') {
              // Inject experimental_telemetry if not already present
              if (!args[0].experimental_telemetry) {
                args[0].experimental_telemetry = telemetryConfig;
              }
            }
          } catch (error) {
            // Silently handle any errors during injection
            console.error('Failed to inject telemetry config:', error);
          }

          // Call the original function
          return originalValue.apply(this, args);
        };
      }

      // Return original value for non-function properties or non-telemetry functions
      return originalValue;
    },
  });
}
