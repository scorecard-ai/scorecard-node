// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource scores', () => {
  test('upsert: only required params', async () => {
    const responsePromise = client.scores.upsert('a1b2c3d4-e5f6-7890-1234-567890abcdef', {
      recordId: '777',
      score: { value: 'bar', reasoning: 'bar' },
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
    const response = await client.scores.upsert('a1b2c3d4-e5f6-7890-1234-567890abcdef', {
      recordId: '777',
      score: { value: 'bar', reasoning: 'bar' },
    });
  });
});
