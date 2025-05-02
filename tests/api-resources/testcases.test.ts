// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource testcases', () => {
  test('create: only required params', async () => {
    const responsePromise = client.testcases.create('246', {
      items: [
        { jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
      ],
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
    const response = await client.testcases.create('246', {
      items: [
        { jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
      ],
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.testcases.update('248', {
      jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.testcases.update('248', {
      jsonData: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' },
    });
  });

  test('list', async () => {
    const responsePromise = client.testcases.list('246');
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
      client.testcases.list('246', { cursor: '123', limit: 20 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.testcases.delete({ ids: ['123', '124', '125'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.testcases.delete({ ids: ['123', '124', '125'] });
  });

  test('get', async () => {
    const responsePromise = client.testcases.get('248');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
