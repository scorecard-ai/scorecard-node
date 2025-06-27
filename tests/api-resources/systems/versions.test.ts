// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource versions', () => {
  test('get', async () => {
    const responsePromise = client.systems.versions.get('87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upsert: only required params', async () => {
    const responsePromise = client.systems.versions.upsert('12345678-0a8b-4f66-b6f3-2ddcfa097257', {
      config: { temperature: 'bar', maxTokens: 'bar', model: 'bar' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upsert: required and optional params', async () => {
    const response = await client.systems.versions.upsert('12345678-0a8b-4f66-b6f3-2ddcfa097257', {
      config: { temperature: 'bar', maxTokens: 'bar', model: 'bar' },
      name: 'Test model: Gemini',
    });
  });
});
