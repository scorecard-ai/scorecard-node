// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource testsets', () => {
  test('create: only required params', async () => {
    const responsePromise = client.testsets.create('314', {
      description: 'Testset for long context Q&A chatbot.',
      fieldMapping: { expected: ['idealAnswer'], inputs: ['question'], metadata: ['string'] },
      jsonSchema: { type: 'bar', properties: 'bar' },
      name: 'Long Context Q&A',
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
    const response = await client.testsets.create('314', {
      description: 'Testset for long context Q&A chatbot.',
      fieldMapping: { expected: ['idealAnswer'], inputs: ['question'], metadata: ['string'] },
      jsonSchema: { type: 'bar', properties: 'bar' },
      name: 'Long Context Q&A',
    });
  });

  test('update', async () => {
    const responsePromise = client.testsets.update('246');
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
      client.testsets.update(
        '246',
        {
          description: 'Updated description for the Q&A Testset.',
          fieldMapping: { expected: ['string'], inputs: ['string'], metadata: ['string'] },
          jsonSchema: { foo: 'bar' },
          name: 'Updated Q&A Testset',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.testsets.list('314');
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
      client.testsets.list('314', { cursor: '123', limit: 20 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.testsets.delete('246');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get', async () => {
    const responsePromise = client.testsets.get('246');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
