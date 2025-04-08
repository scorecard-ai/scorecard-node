// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource testsets', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.testsets.create(0, {
      description: 'Testset for long context Q&A chatbot.',
      fieldMapping: { inputs: ['string'], labels: ['string'], metadata: ['string'] },
      name: 'Long Context Q&A',
      schema: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          idealAnswer: { type: 'string' },
          provenance: { type: 'string' },
          geo: { type: 'string' },
        },
        fieldMapping: { inputs: ['question'], labels: ['idealAnswer'], metadata: [] },
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.testsets.create(0, {
      description: 'Testset for long context Q&A chatbot.',
      fieldMapping: { inputs: ['string'], labels: ['string'], metadata: ['string'] },
      name: 'Long Context Q&A',
      schema: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          idealAnswer: { type: 'string' },
          provenance: { type: 'string' },
          geo: { type: 'string' },
        },
        fieldMapping: { inputs: ['question'], labels: ['idealAnswer'], metadata: [] },
      },
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.testsets.update(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.testsets.update(
        0,
        {
          description: 'Updated description for the Q&A testset.',
          fieldMapping: { inputs: ['string'], labels: ['string'], metadata: ['string'] },
          name: 'Updated Q&A Testset',
          schema: {},
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.testsets.list(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.testsets.list(0, { cursor: 'cursor', limit: 20 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete', async () => {
    const responsePromise = client.testsets.delete(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('createTestcases: only required params', async () => {
    const responsePromise = client.testsets.createTestcases(0, {
      items: [
        { data: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { data: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { data: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
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

  // skipped: tests are disabled for the time being
  test.skip('createTestcases: required and optional params', async () => {
    const response = await client.testsets.createTestcases(0, {
      items: [
        { data: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { data: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
        { data: { question: 'bar', idealAnswer: 'bar', provenance: 'bar' } },
      ],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteTestcases: only required params', async () => {
    const responsePromise = client.testsets.deleteTestcases(0, { ids: [123, 124, 125] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteTestcases: required and optional params', async () => {
    const response = await client.testsets.deleteTestcases(0, { ids: [123, 124, 125] });
  });

  // skipped: tests are disabled for the time being
  test.skip('get', async () => {
    const responsePromise = client.testsets.get(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('listTestcases', async () => {
    const responsePromise = client.testsets.listTestcases(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('listTestcases: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.testsets.listTestcases(0, { cursor: 'cursor', limit: 20 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });
});
