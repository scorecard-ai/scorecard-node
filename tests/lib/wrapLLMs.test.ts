import { EventEmitter } from 'node:events';
import { trace } from '@opentelemetry/api';
import { Stream as AnthropicStream } from '@anthropic-ai/sdk/core/streaming';
import { MessageStream } from '@anthropic-ai/sdk/lib/MessageStream';
import { Stream as OpenAIStream } from 'openai/core/streaming';
import { wrap } from '../../src/lib/wrapLLMs';

jest.mock('@opentelemetry/sdk-trace-node', () => ({
  NodeTracerProvider: jest.fn().mockImplementation(() => ({ register: jest.fn() })),
  BatchSpanProcessor: jest.fn(),
}));

const params = { model: 'requested-model', messages: [{ role: 'user', content: 'Hello' }] };
const message = {
  id: 'msg-1',
  model: 'response-model',
  stop_reason: 'end_turn',
  content: [{ type: 'text', text: 'Hello world' }],
  usage: { input_tokens: 3, output_tokens: 5 },
};
const anthropicChunks = [
  { type: 'message_start', message: { ...message, usage: { input_tokens: 3, output_tokens: 0 } } },
  { type: 'content_block_delta', delta: { type: 'text_delta', text: 'Hello ' } },
  { type: 'content_block_delta', delta: { type: 'text_delta', text: 'world' } },
  { type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } },
];
const openaiChunks = [
  { id: 'chat-1', model: 'response-model', choices: [{ delta: { content: 'Hello ' } }] },
  { choices: [{ delta: { content: 'world' }, finish_reason: 'stop' }] },
  { choices: [], usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 } },
];

class FakeMessageStream extends EventEmitter {
  async finalMessage() {
    await new Promise<void>((resolve, reject) => {
      this.once('end', resolve);
      this.once('error', reject);
      this.once('abort', reject);
    });
    return message;
  }

  async *[Symbol.asyncIterator]() {
    yield* anthropicChunks;
    await this.finalMessage();
  }

  get textStream() {
    const self = this;
    return (async function* () {
      const final = await self.finalMessage();
      yield final.content[0]!.text;
    })();
  }

  complete() {
    for (const chunk of anthropicChunks) this.emit('streamEvent', chunk);
    this.emit('text', 'Hello world');
    this.emit('finalMessage', message);
    this.emit('end');
  }

  abort(error = new Error('aborted')) {
    this.emit('abort', error);
    this.emit('end');
  }
}

describe('LLM streaming wrappers', () => {
  let span: {
    setAttributes: jest.Mock;
    setAttribute: jest.Mock;
    recordException: jest.Mock;
    end: jest.Mock;
  };
  let attributes: Record<string, any>;

  beforeEach(() => {
    attributes = {};
    span = {
      setAttributes: jest.fn((values) => Object.assign(attributes, values)),
      setAttribute: jest.fn((key, value) => (attributes[key] = value)),
      recordException: jest.fn(),
      end: jest.fn(),
    };
    jest.spyOn(trace, 'getTracer').mockReturnValue({ startSpan: () => span } as any);
  });

  afterEach(() => jest.restoreAllMocks());

  function wrappedMessages(stream: FakeMessageStream) {
    const messages = { stream: jest.fn((_params: any) => stream) };
    const client = wrap({ messages }, { apiKey: 'test-key', projectId: 'project-1' });
    return { client, messages };
  }

  function expectTelemetry() {
    expect(attributes).toMatchObject({
      'gen_ai.request.model': params.model,
      'gen_ai.prompt.messages': JSON.stringify(params.messages),
      'gen_ai.response.model': message.model,
      'gen_ai.usage.prompt_tokens': 3,
      'gen_ai.usage.completion_tokens': 5,
      'gen_ai.usage.total_tokens': 8,
      'gen_ai.completion.choices': JSON.stringify([
        { message: { role: 'assistant', content: 'Hello world' } },
      ]),
    });
    expect(span.end).toHaveBeenCalledTimes(1);
  }

  it('returns the original MessageStream synchronously and traces finalMessage without iteration', async () => {
    const original = new FakeMessageStream();
    const { client, messages } = wrappedMessages(original);
    const stream = client.messages.stream(params);
    expect(typeof (stream as any).then).toBe('undefined');
    expect(stream).toBe(original);
    expect(messages.stream.mock.instances[0]).toBe(messages);
    expect(span.end).not.toHaveBeenCalled();
    const text = jest.fn();
    expect(stream.on('text', text)).toBe(original);
    const final = stream.finalMessage();
    original.complete();
    expect(await final).toBe(message);
    expect(text).toHaveBeenCalledWith('Hello world');
    expect(attributes['scorecard.project_id']).toBe('project-1');
    expectTelemetry();
  });

  it('preserves textStream and records telemetry when only textStream is consumed', async () => {
    const original = new FakeMessageStream();
    const { client } = wrappedMessages(original);
    const textStream = client.messages.stream(params).textStream;
    const texts: string[] = [];
    const consumed = (async () => {
      for await (const text of textStream) texts.push(text);
    })();
    original.complete();
    await consumed;
    expect(texts).toEqual(['Hello world']);
    expectTelemetry();
  });

  it('preserves the real SDK MessageStream through a fake messages client', async () => {
    const chunks = [
      {
        type: 'message_start',
        message: { ...message, content: [], usage: { input_tokens: 3, output_tokens: 0 } },
      },
      { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } },
      ...anthropicChunks.slice(1, 3).map((chunk) => ({ ...chunk, index: 0 })),
      { type: 'content_block_stop', index: 0 },
      anthropicChunks[3],
      { type: 'message_stop' },
    ];
    const messages = {
      create: () => ({
        withResponse: async () => ({
          response: null,
          data: new AnthropicStream(async function* () {
            yield* chunks;
          }, new AbortController()),
        }),
      }),
      stream(request: any) {
        return MessageStream.createMessage(this as any, request);
      },
    };
    const client = wrap({ messages }, { apiKey: 'test-key' });
    const stream = client.messages.stream({ ...params, max_tokens: 10 });
    expect(stream).toBeInstanceOf(MessageStream);
    const text = jest.fn();
    stream.on('text', text);
    expect(await stream.finalMessage()).toMatchObject(message);
    expect(text).toHaveBeenCalledTimes(2);
    expectTelemetry();
  });

  it('ends on end without finalMessage and keeps metadata from stream events', () => {
    const original = new FakeMessageStream();
    const { client } = wrappedMessages(original);
    expect(client.messages.stream(params)).toBe(original);
    for (const chunk of anthropicChunks) original.emit('streamEvent', chunk);
    original.emit('end');
    original.emit('end');
    expectTelemetry();
  });

  it.each(['error', 'abort'])('records %s and ends once even when end follows', async (event) => {
    const original = new FakeMessageStream();
    const { client } = wrappedMessages(original);
    const stream = client.messages.stream(params);
    const final = stream.finalMessage();
    const error = new Error(event);
    original.emit('streamEvent', anthropicChunks[0]);
    original.emit(event, error);
    original.emit('end');
    await expect(final).rejects.toBe(error);
    expect(span.recordException).toHaveBeenCalledTimes(1);
    expect(span.recordException).toHaveBeenCalledWith(error);
    expect(span.end).toHaveBeenCalledTimes(1);
    expect(attributes['gen_ai.usage.prompt_tokens']).toBe(3);
  });

  describe.each([
    { provider: 'anthropic', Stream: AnthropicStream, chunks: anthropicChunks },
    { provider: 'openai', Stream: OpenAIStream, chunks: openaiChunks },
  ])('$provider create streaming', ({ provider, Stream, chunks }) => {
    function setup(
      iterator: (controller: AbortController) => AsyncGenerator<any> = async function* () {
        yield* chunks;
      },
    ) {
      const controller = new AbortController();
      const original = new Stream(() => iterator(controller), controller);
      const request = Object.assign(Promise.resolve(original), {
        withResponse: async () => ({ data: original, response: 'response' }),
      });
      const resource = { create: jest.fn((_params: any) => request) };
      const client = wrap(
        provider === 'anthropic' ? { messages: resource } : { chat: { completions: resource } },
        { apiKey: 'test-key' },
      );
      const wrappedResource = 'messages' in client ? client.messages! : client.chat!.completions;
      return { original, request, wrappedResource };
    }

    it('preserves the request and resolved stream, including controller and readable helper', async () => {
      const { original, request, wrappedResource } = setup();
      const result = wrappedResource.create({ ...params, stream: true });
      expect(result).toBe(request);
      const { data } = await result.withResponse();
      expect(data).toBe(original);
      expect(await result).toBe(original);
      expect(span.end).not.toHaveBeenCalled();
      const reader = data.toReadableStream().getReader();
      const decoded: any[] = [];
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        decoded.push(JSON.parse(decoder.decode(value)));
      }
      expect(decoded).toEqual(chunks);
      expectTelemetry();
    });

    it('preserves tee and traces chunks once across both branches', async () => {
      const { original, wrappedResource } = setup();
      const stream = await wrappedResource.create({ ...params, stream: true });
      expect(stream).toBe(original);
      const branches = stream.tee();
      const results = await Promise.all(
        branches.map(async (branch) => {
          const values = [];
          for await (const chunk of branch) values.push(chunk);
          return values;
        }),
      );
      expect(results).toEqual([chunks, chunks]);
      expectTelemetry();
    });

    it('records iterator errors and ends once', async () => {
      const error = new Error('stream failed');
      const { wrappedResource } = setup(async function* (controller) {
        try {
          yield chunks[0];
          throw error;
        } finally {
          controller.abort();
        }
      });
      const stream = await wrappedResource.create({ ...params, stream: true });
      await expect(
        (async () => {
          for await (const _chunk of stream) {
            /* consume */
          }
        })(),
      ).rejects.toBe(error);
      expect(span.recordException).toHaveBeenCalledWith(error);
      expect(span.end).toHaveBeenCalledTimes(1);
    });

    it('ends on controller abort without requiring iteration', async () => {
      const { original, wrappedResource } = setup();
      const stream = await wrappedResource.create({ ...params, stream: true });
      expect(stream.controller).toBe(original.controller);
      stream.controller.abort();
      for await (const _chunk of stream) {
        /* consume */
      }
      expect(span.end).toHaveBeenCalledTimes(1);
    });

    it('ends on controller abort after a chunk without requiring another next call', async () => {
      const { wrappedResource } = setup();
      const stream = await wrappedResource.create({ ...params, stream: true });
      const iterator = stream[Symbol.asyncIterator]();
      expect((await iterator.next()).value).toEqual(chunks[0]);
      stream.controller.abort();
      expect(span.end).toHaveBeenCalledTimes(1);
      await iterator.return?.();
      expect(span.end).toHaveBeenCalledTimes(1);
    });

    it('ends when iteration stops early', async () => {
      const { wrappedResource } = setup();
      const stream = await wrappedResource.create({ ...params, stream: true });
      for await (const _chunk of stream) break;
      expect(span.end).toHaveBeenCalledTimes(1);
    });
  });

  it.each(['anthropic', 'openai'])('ends rejected %s streaming requests', async (provider) => {
    const error = new Error('request failed');
    const resource = { create: jest.fn((_params: any) => Promise.reject(error)) };
    const client = wrap(
      provider === 'anthropic' ? { messages: resource } : { chat: { completions: resource } },
      { apiKey: 'test-key' },
    );
    const wrappedResource = 'messages' in client ? client.messages! : client.chat!.completions;
    await expect(wrappedResource.create({ ...params, stream: true })).rejects.toBe(error);
    expect(span.recordException).toHaveBeenCalledWith(error);
    expect(span.end).toHaveBeenCalledTimes(1);
  });

  it('ends synchronously thrown MessageStream requests', () => {
    const error = new Error('invalid request');
    const client = wrap(
      {
        messages: {
          stream: () => {
            throw error;
          },
        },
      },
      { apiKey: 'test-key' },
    );
    expect(() => client.messages.stream()).toThrow(error);
    expect(span.recordException).toHaveBeenCalledWith(error);
    expect(span.end).toHaveBeenCalledTimes(1);
  });

  it('leaves the already synchronous OpenAI stream helper intact', () => {
    const original = { finalChatCompletion: jest.fn(), on: jest.fn() };
    const client = wrap({ chat: { completions: { stream: () => original } } }, { apiKey: 'test-key' });
    expect(client.chat.completions.stream()).toBe(original);
    expect(span.end).not.toHaveBeenCalled();
  });

  it.each(['anthropic', 'openai'])('preserves non-streaming %s responses and telemetry', async (provider) => {
    const response =
      provider === 'anthropic' ? message : (
        {
          id: 'chat-1',
          model: message.model,
          choices: [{ message: { role: 'assistant', content: 'Hello world' }, finish_reason: 'stop' }],
          usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 },
        }
      );
    const resource = { create: (_params: any) => Promise.resolve(response) };
    const client = wrap(
      provider === 'anthropic' ? { messages: resource } : { chat: { completions: resource } },
      { apiKey: 'test-key' },
    );
    const wrappedResource = 'messages' in client ? client.messages! : client.chat!.completions;
    expect(await wrappedResource.create(params)).toBe(response);
    expect(attributes['gen_ai.response.model']).toBe(message.model);
    expect(attributes['gen_ai.usage.total_tokens']).toBe(8);
    expect(span.end).toHaveBeenCalledTimes(1);
  });
});
