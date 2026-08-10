import Scorecard, { runAndEvaluate } from 'scorecard-ai';
import type { Testcase } from 'scorecard-ai/resources/testcases';
import type { SystemVersion } from 'scorecard-ai/resources/systems';

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

async function systemWithoutVersion(inputs: { question: string }) {
  return { inputs, response: 'bar' };
}

async function systemWithVersion(inputs: { question: string }, systemVersion: SystemVersion) {
  expect(systemVersion.config).toBeDefined();
  return {
    inputs,
    config: systemVersion.config,
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

    it('should run with manual testcases and no system version', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          system: systemWithoutVersion,
          testcases,
        },
        options,
      );
    });

    it('should run with manual testcases and a system version', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          systemVersionId: '12345678-0a8b-4f66-b6f3-2ddcfa097257',
          system: systemWithVersion,
          testcases,
        },
        options,
      );
    });

    it('should run with testset and no system version', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          system: systemWithoutVersion,
          testsetId: '123',
        },
        options,
      );
    });

    it('should run with testset and a system version', async () => {
      await runAndEvaluate<{ question: string }, { response: string }>(
        client,
        {
          projectId: '123',
          metricIds: ['123'],
          systemVersionId: '12345678-0a8b-4f66-b6f3-2ddcfa097257',
          system: systemWithVersion,
          testsetId: '123',
        },
        options,
      );
    });

    it.each([undefined, 1, 3])('should run with trials=%s', async (trials) => {
      const createSpy = jest.spyOn(client.records, 'create');
      const systemSpy = jest.fn(systemWithoutVersion);

      await runAndEvaluate(
        client,
        { projectId: '123', metricIds: ['123'], system: systemSpy, testcases },
        trials ? { ...options, trials } : options,
      );

      const expectedCalls = (trials ?? 1) * testcases.length;
      expect(createSpy).toHaveBeenCalledTimes(expectedCalls);
      expect(systemSpy).toHaveBeenCalledTimes(expectedCalls);
    });
  },
);
