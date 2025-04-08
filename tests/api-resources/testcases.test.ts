// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource testcases', () => {
  // skipped: tests are disabled for the time being
  test.skip('update: only required params', async () => {
    const responsePromise = client.testcases.update(0, {
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
        idealAnswer: {
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
  test.skip('update: required and optional params', async () => {
    const response = await client.testcases.update(0, {
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
        idealAnswer: {
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
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('get', async () => {
    const responsePromise = client.testcases.get(0);
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
