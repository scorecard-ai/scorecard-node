// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Scorecard from 'scorecard';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource score', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.run.testrecord.score.create(12, {
      run_id: 1,
      binary_score: true,
      int_score: 10,
      metric_id: 1,
      reasoning: 'The moon is made of cheese.',
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
    const response = await client.run.testrecord.score.create(12, {
      run_id: 1,
      binary_score: true,
      int_score: 10,
      metric_id: 1,
      reasoning: 'The moon is made of cheese.',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('update: only required params', async () => {
    const responsePromise = client.run.testrecord.score.update(123, {
      run_id: 1,
      testrecord_id: 12,
      binary_score: false,
      int_score: 1,
      reasoning: "Turns out the moon insn't acutally made of cheese.",
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
    const response = await client.run.testrecord.score.update(123, {
      run_id: 1,
      testrecord_id: 12,
      binary_score: false,
      int_score: 1,
      reasoning: "Turns out the moon insn't acutally made of cheese.",
    });
  });
});
