function checkInstalled(...modules: string[]) {
  for (let i = 0; i < modules.length; i++) {
    let module = modules[i];
    try {
      require.resolve(module);
    } catch (e) {
      return false;
    }
  }

  return true;
}

module.exports = {
  setup(name: string, scorecardConfig: {
    telemetryKey: string,
    telemetryUrl?: string,
  }, debug = false) {
    const required = [
      '@opentelemetry/api',
      '@opentelemetry/core',
      '@opentelemetry/exporter-trace-otlp-http',
      '@opentelemetry/resources',
      '@opentelemetry/sdk-trace-node',
      '@opentelemetry/semantic-conventions'
    ];

    if (!checkInstalled(...required)) {
      throw new Error(`Required OpenTelemetry packages not installed. Please ensure that all necessary peerDependencies are installed:\n${required.map(module => `- ${module}`).join('\n')}`);
    }

    const { propagation, trace } = require('@opentelemetry/api');
    const { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } = require('@opentelemetry/core');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
    const { Resource } = require('@opentelemetry/resources');
    const { BatchSpanProcessor, ConsoleSpanExporter, NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
    const { SEMRESATTRS_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

    const resource = Resource.default().merge(
      new Resource({
        [SEMRESATTRS_SERVICE_NAME]: name,
      }),
    );

    const provider = new NodeTracerProvider({
      resource,
    });

    if (debug) {
      const consoleExporter = new ConsoleSpanExporter();
      const processor = new BatchSpanProcessor(consoleExporter);
      provider.addSpanProcessor(processor);
    }

    propagation.setGlobalPropagator(new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator()
      ]
    }));

    const url = scorecardConfig.telemetryUrl ? scorecardConfig.telemetryUrl : 'https://telemetry.getscorecard.ai';
    const otlpExporter = new OTLPTraceExporter({
      url: `${url}/v1/traces`,
      headers: {
        'Authorization': `Bearer ${scorecardConfig.telemetryKey}`
      },
    });
    const processor = new BatchSpanProcessor(otlpExporter);
    provider.addSpanProcessor(processor);

    provider.register();

    if (checkInstalled('@langchain/core', '@arizeai/openinference-instrumentation-langchain', '@opentelemetry/instrumentation')) {
      const { LangChainInstrumentation } = require('@arizeai/openinference-instrumentation-langchain');
      new LangChainInstrumentation().manuallyInstrument(require('@langchain/core/callbacks/manager'));
    }

    if (checkInstalled('openai', '@arizeai/openinference-instrumentation-openai', '@opentelemetry/instrumentation')) {
      const { OpenAIInstrumentation } = require('@arizeai/openinference-instrumentation-openai');
      new OpenAIInstrumentation().manuallyInstrument(require('openai'));
    }

    const tracer = trace.getTracer();

    process.on('beforeExit', async () => {
      await provider.shutdown();
    });

    return tracer;
  }
};