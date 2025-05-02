// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource systemConfigs', () => {
  test('create: only required params', async () => {
    const responsePromise = client.systemConfigs.create('12345678-0a8b-4f66-b6f3-2ddcfa097257', {
      config: { temperature: 'bar', maxTokens: 'bar', model: 'bar' },
      name: 'Production (Low Temperature)',
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
    const response = await client.systemConfigs.create('12345678-0a8b-4f66-b6f3-2ddcfa097257', {
      config: { temperature: 'bar', maxTokens: 'bar', model: 'bar' },
      name: 'Production (Low Temperature)',
      validationErrors: [{ message: 'Required field missing', path: '/data/question' }],
    });
  });

  test('list', async () => {
    const responsePromise = client.systemConfigs.list('12345678-0a8b-4f66-b6f3-2ddcfa097257');
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
      client.systemConfigs.list(
        '12345678-0a8b-4f66-b6f3-2ddcfa097257',
        { cursor: 'eyJvZmZzZXQiOjAsInBhZ2VJZCI6ImNvZGUifQ', limit: 20 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  test('get: only required params', async () => {
    const responsePromise = client.systemConfigs.get('87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0', {
      systemId: '12345678-0a8b-4f66-b6f3-2ddcfa097257',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: required and optional params', async () => {
    const response = await client.systemConfigs.get('87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0', {
      systemId: '12345678-0a8b-4f66-b6f3-2ddcfa097257',
    });
  });
});
