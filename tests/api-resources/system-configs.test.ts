// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard-ai';

const client = new Scorecard({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource systemConfigs', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.systemConfigs.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      id: '5fa85f64-5717-4562-b3fc-2c963f66afa7',
      config: { temperature: 'bar', maxTokens: 'bar', model: 'bar' },
      label: 'Production (Low Temperature)',
      body_systemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
    const response = await client.systemConfigs.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      id: '5fa85f64-5717-4562-b3fc-2c963f66afa7',
      config: { temperature: 'bar', maxTokens: 'bar', model: 'bar' },
      label: 'Production (Low Temperature)',
      body_systemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      validationErrors: [{ message: 'Required field missing', path: '/data/question' }],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.systemConfigs.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.systemConfigs.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { cursor: '123', limit: 20 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Scorecard.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('get: only required params', async () => {
    const responsePromise = client.systemConfigs.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      systemId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('get: required and optional params', async () => {
    const response = await client.systemConfigs.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      systemId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
