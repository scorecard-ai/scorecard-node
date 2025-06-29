// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource metrics', () => {
  test('create: only required params', async () => {
    const responsePromise = client.metrics.create('314', {
      evalType: 'ai',
      name: 'name',
      outputType: 'int',
      promptTemplate: 'promptTemplate',
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
    const response = await client.metrics.create('314', {
      evalType: 'ai',
      name: 'name',
      outputType: 'int',
      promptTemplate: 'promptTemplate',
      description: 'description',
      evalModelName: 'evalModelName',
      guidelines: 'guidelines',
      passingThreshold: 1,
      temperature: 0,
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.metrics.update('321', { evalType: 'ai', outputType: 'int' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.metrics.update('321', {
      evalType: 'ai',
      outputType: 'int',
      description: 'description',
      evalModelName: 'evalModelName',
      guidelines: 'guidelines',
      name: 'name',
      passingThreshold: 1,
      promptTemplate: 'promptTemplate',
      temperature: 0,
    });
  });
});
