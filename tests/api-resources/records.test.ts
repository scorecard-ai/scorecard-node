// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource records', () => {
  test('create: only required params', async () => {
    const responsePromise = client.records.create('135', {
      expected: { idealAnswer: 'bar' },
      inputs: { question: 'bar' },
      outputs: { response: 'bar' },
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
    const response = await client.records.create('135', {
      expected: { idealAnswer: 'bar' },
      inputs: { question: 'bar' },
      outputs: { response: 'bar' },
      testcaseId: '248',
    });
  });
});
