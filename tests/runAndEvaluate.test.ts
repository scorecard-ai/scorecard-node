import Scorecard, { runAndEvaluate } from 'scorecard-ai';
import type { Testcase } from 'scorecard-ai/resources/testcases';
import type { SystemConfig } from 'scorecard-ai/resources/system-configs';

const client = new Scorecard({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

const testcases = [
  {
    inputs: { question: 'foo' },
    expected: { idealAnswer: 'bar' },
  },
  {
    inputs: { question: 'bar' },
    expected: { idealAnswer: 'baz' },
  },
];

const scorecardTestcases: Testcase[] = testcases.map(
  ({ inputs, expected }, i): Testcase => ({
    id: String(i),
    testsetId: '123',
    inputs,
    expected,
    jsonData: { ...inputs, ...expected },
    validationErrors: [],
  }),
);

async function systemWithoutConfig(inputs: { question: string }) {
  return { inputs, response: 'bar' };
}

async function systemWithConfig(inputs: { question: string }, systemConfig: SystemConfig) {
  return {
    inputs,
    config: systemConfig.config,
    response: 'bar',
  };
}

describe.each([{ runInParallel: false }, { runInParallel: true }])(
  'runAndEvaluate with options %j',
  (options) => {
    beforeEach(() => {
      // mock scorecard.testcases.list to not return an infinite Async Iterator
      jest.spyOn(client.testcases, 'list').mockImplementation(
        // @ts-expect-error mock implementation doesn't include unnecessary properties of PagePromise
        () =>
          ({
            [Symbol.asyncIterator]: async function* () {
              yield* scorecardTestcases;
            },
          }) satisfies Pick<ReturnType<typeof client.testcases.list>, typeof Symbol.asyncIterator>,
      );
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it(`should run with manual testcases and no system config`, async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          system: systemWithoutConfig,
          testcases,
        },
        options,
      );
    });

    it('should run with manual testcases and a system config', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          systemConfigId: '12345678-0a8b-4f66-b6f3-2ddcfa097257',
          system: systemWithConfig,
          testcases,
        },
        options,
      );
    });

    it('should run with testset and no system config', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          system: systemWithoutConfig,
          testsetId: '123',
        },
        options,
      );

      // clear spy on testcases.list
      jest.clearAllMocks();
    });

    it('should run with testset and a system config', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          systemConfigId: '12345678-0a8b-4f66-b6f3-2ddcfa097257',
          system: systemWithConfig,
          testsetId: '123',
        },
        options,
      );
    });
  },
);
