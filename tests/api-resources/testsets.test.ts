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
        {
          data: {
            question: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
              '13': 'bar',
              '14': 'bar',
              '15': 'bar',
              '16': 'bar',
              '17': 'bar',
              '18': 'bar',
              '19': 'bar',
              '20': 'bar',
              '21': 'bar',
              '22': 'bar',
              '23': 'bar',
              '24': 'bar',
              '25': 'bar',
              '26': 'bar',
              '27': 'bar',
              '28': 'bar',
              '29': 'bar',
            },
            idealAnswer: { '0': 'bar', '1': 'bar', '2': 'bar', '3': 'bar', '4': 'bar' },
            provenance: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
            },
          },
        },
        {
          data: {
            question: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
              '13': 'bar',
              '14': 'bar',
              '15': 'bar',
              '16': 'bar',
              '17': 'bar',
              '18': 'bar',
              '19': 'bar',
              '20': 'bar',
              '21': 'bar',
              '22': 'bar',
              '23': 'bar',
              '24': 'bar',
              '25': 'bar',
              '26': 'bar',
              '27': 'bar',
              '28': 'bar',
              '29': 'bar',
              '30': 'bar',
              '31': 'bar',
              '32': 'bar',
              '33': 'bar',
              '34': 'bar',
              '35': 'bar',
              '36': 'bar',
              '37': 'bar',
              '38': 'bar',
              '39': 'bar',
              '40': 'bar',
              '41': 'bar',
              '42': 'bar',
              '43': 'bar',
              '44': 'bar',
              '45': 'bar',
              '46': 'bar',
            },
            idealAnswer: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
            },
            provenance: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
            },
          },
        },
        {
          data: {
            question: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
              '13': 'bar',
              '14': 'bar',
              '15': 'bar',
              '16': 'bar',
              '17': 'bar',
              '18': 'bar',
              '19': 'bar',
              '20': 'bar',
              '21': 'bar',
              '22': 'bar',
              '23': 'bar',
              '24': 'bar',
              '25': 'bar',
              '26': 'bar',
              '27': 'bar',
              '28': 'bar',
              '29': 'bar',
              '30': 'bar',
              '31': 'bar',
              '32': 'bar',
              '33': 'bar',
              '34': 'bar',
              '35': 'bar',
              '36': 'bar',
              '37': 'bar',
              '38': 'bar',
              '39': 'bar',
              '40': 'bar',
            },
            idealAnswer: {},
            provenance: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
            },
          },
        },
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
        {
          data: {
            question: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
              '13': 'bar',
              '14': 'bar',
              '15': 'bar',
              '16': 'bar',
              '17': 'bar',
              '18': 'bar',
              '19': 'bar',
              '20': 'bar',
              '21': 'bar',
              '22': 'bar',
              '23': 'bar',
              '24': 'bar',
              '25': 'bar',
              '26': 'bar',
              '27': 'bar',
              '28': 'bar',
              '29': 'bar',
            },
            idealAnswer: { '0': 'bar', '1': 'bar', '2': 'bar', '3': 'bar', '4': 'bar' },
            provenance: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
            },
          },
        },
        {
          data: {
            question: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
              '13': 'bar',
              '14': 'bar',
              '15': 'bar',
              '16': 'bar',
              '17': 'bar',
              '18': 'bar',
              '19': 'bar',
              '20': 'bar',
              '21': 'bar',
              '22': 'bar',
              '23': 'bar',
              '24': 'bar',
              '25': 'bar',
              '26': 'bar',
              '27': 'bar',
              '28': 'bar',
              '29': 'bar',
              '30': 'bar',
              '31': 'bar',
              '32': 'bar',
              '33': 'bar',
              '34': 'bar',
              '35': 'bar',
              '36': 'bar',
              '37': 'bar',
              '38': 'bar',
              '39': 'bar',
              '40': 'bar',
              '41': 'bar',
              '42': 'bar',
              '43': 'bar',
              '44': 'bar',
              '45': 'bar',
              '46': 'bar',
            },
            idealAnswer: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
            },
            provenance: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
            },
          },
        },
        {
          data: {
            question: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
              '13': 'bar',
              '14': 'bar',
              '15': 'bar',
              '16': 'bar',
              '17': 'bar',
              '18': 'bar',
              '19': 'bar',
              '20': 'bar',
              '21': 'bar',
              '22': 'bar',
              '23': 'bar',
              '24': 'bar',
              '25': 'bar',
              '26': 'bar',
              '27': 'bar',
              '28': 'bar',
              '29': 'bar',
              '30': 'bar',
              '31': 'bar',
              '32': 'bar',
              '33': 'bar',
              '34': 'bar',
              '35': 'bar',
              '36': 'bar',
              '37': 'bar',
              '38': 'bar',
              '39': 'bar',
              '40': 'bar',
            },
            idealAnswer: {},
            provenance: {
              '0': 'bar',
              '1': 'bar',
              '2': 'bar',
              '3': 'bar',
              '4': 'bar',
              '5': 'bar',
              '6': 'bar',
              '7': 'bar',
              '8': 'bar',
              '9': 'bar',
              '10': 'bar',
              '11': 'bar',
              '12': 'bar',
            },
          },
        },
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
