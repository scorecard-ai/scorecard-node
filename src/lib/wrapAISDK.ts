import { NodeTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { defaultResource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { Tracer } from '@opentelemetry/api';

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
   * Metrics to track
   * Defaults to empty array
   */
  metrics?: string[];

  /**
   * Scorecard API key for authentication
   * Defaults to SCORECARD_API_KEY environment variable
   */
  apiKey?: string;

  /**
   * Scorecard tracing endpoint
   * Defaults to https://tracing.scorecard.io/otel/v1/traces
   */
  endpoint?: string;

  /**
   * Scorecard API base URL
   * Defaults to https://api2.scorecard.io
   */
  apiBaseUrl?: string;

  /**
   * Service name for telemetry
   * Defaults to "ai-sdk-app"
   */
  serviceName?: string;

  /**
   * Max export batch size for the batch span processor
   * Defaults to 1 so the traces are exported immediately
   */
  maxExportBatchSize?: number;
}

let tracerProvider: NodeTracerProvider | null = null;
let tracer: Tracer | null = null;
const SCORECARD_API_KEY = process.env['SCORECARD_API_KEY'];
const SCORECARD_PROJECT_ID = process.env['SCORECARD_PROJECT_ID'];

/**
 * Initialize the OpenTelemetry tracer with Scorecard configuration
 */
function initializeTracer(config: ScorecardConfig = {}): Tracer {
  // Return existing tracer if already initialized
  if (tracer && tracerProvider) {
    return tracer;
  }

  const {
    projectId = SCORECARD_PROJECT_ID,
    apiKey = SCORECARD_API_KEY,
    endpoint = 'https://tracing.scorecard.io/otel/v1/traces',
    serviceName = 'ai-sdk-app',
    maxExportBatchSize = 1,
  } = config;

  // Create resource with service information
  const resource = defaultResource().merge(
    resourceFromAttributes({
      [ATTR_SERVICE_NAME]: serviceName,
      [ATTR_SERVICE_VERSION]: '1.0.0',
      'scorecard.project_id': projectId,
    }),
  );

  // Create span processors
  const spanProcessors = [];

  try {
    // Create OTLP exporter for Scorecard
    const otlpExporter = new OTLPTraceExporter({
      url: endpoint,
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
 *   prompt: 'Hello!',
 * });
 * ```
 */
export async function wrapAISDK<T extends Record<string, any>>(
  aiSDKModule: T,
  config: ScorecardConfig = {},
): Promise<T> {
  const apiKey = config.apiKey || SCORECARD_API_KEY;
  if (!apiKey) {
    throw new Error('SCORECARD_API_KEY environment variable is not set');
  }

  const baseUrl = new URL(config.apiBaseUrl || 'https://api2.scorecard.io');
  // Create metrics and monitor if needed
  if (config.metrics && config.metrics.length > 0 && config.projectId) {
    fetch(`${baseUrl.origin}/api/v2/projects/${config.projectId}/monitoring/create-if-needed`, {
      method: 'POST',
      body: JSON.stringify({
        description: config.serviceName,
        metrics: config.metrics,
        filter: {
          serviceName: config.serviceName,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
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
    'generateText',
    'streamText',
    'generateObject',
    'streamObject',
    'embed',
    'embedMany',
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
            if (args.length > 0 && typeof args[0] === 'object') {
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
