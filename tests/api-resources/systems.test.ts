// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource systems', () => {
  test('create: only required params', async () => {
    const responsePromise = client.systems.create('314', {
      configSchema: { type: 'bar', properties: 'bar', required: 'bar' },
      description: 'Production chatbot powered by GPT-4',
      inputSchema: { type: 'bar', properties: 'bar', required: 'bar' },
      name: 'GPT-4 Chatbot',
      outputSchema: { type: 'bar', properties: 'bar', required: 'bar' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.systems.create('314', {
      configSchema: { type: 'bar', properties: 'bar', required: 'bar' },
      description: 'Production chatbot powered by GPT-4',
      inputSchema: { type: 'bar', properties: 'bar', required: 'bar' },
      name: 'GPT-4 Chatbot',
      outputSchema: { type: 'bar', properties: 'bar', required: 'bar' },
    });
  });

  test('update', async () => {
    const responsePromise = client.systems.update('12345678-0a8b-4f66-b6f3-2ddcfa097257');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.systems.update(
        '12345678-0a8b-4f66-b6f3-2ddcfa097257',
        {
          configSchema: { foo: 'bar' },
          description: 'Updated production chatbot powered by GPT-4 Turbo',
          inputSchema: { foo: 'bar' },
          name: 'GPT-4 Turbo Chatbot',
          outputSchema: { foo: 'bar' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.systems.list('314');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.systems.list(
        '314',
        { cursor: 'eyJvZmZzZXQiOjAsInBhZ2VJZCI6ImNvZGUifQ', limit: 20 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.systems.delete('12345678-0a8b-4f66-b6f3-2ddcfa097257');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get', async () => {
    const responsePromise = client.systems.get('12345678-0a8b-4f66-b6f3-2ddcfa097257');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
