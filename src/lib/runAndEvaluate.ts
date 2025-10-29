import { Scorecard } from '../client';
import { Testcase } from '../resources';
import { ScorecardError } from '../error';
import { SystemVersion } from '../resources/systems';

type RunAndEvaluateArgs<SystemInput extends Record<string, any>, SystemOutput extends Record<string, any>> =
  // Project and metrics are always required
  {
    /**
     * The ID of the Project to run the system on.
     */
    projectId: string;

    /**
     * The IDs of the Metrics to use for evaluation.
     */
    metricIds: Array<string>;
  } & (
    | // If systemVersionId is provided, the system function receives a system version
    {
        /**
         * The ID of the SystemVersion to use for the run.
         */
        systemVersionId: string;

        /**
         * The system function to run on the Testset.
         */
        system: (testcaseInput: SystemInput, systemVersion: SystemVersion) => Promise<SystemOutput>;
      }
    // Otherwise, the system function receives only the testcase input
    | {
        /**
         * The system function to run on the Testset.
         */
        system: (testcaseInput: SystemInput) => Promise<SystemOutput>;
      }
  ) &
    // If testset is not provided, you must pass in all the testcases manually
    (| {
          /**
           * The ID of the Scorecard Testset to run the system on.
           */
          testsetId: string;
        }
      | {
          /**
           * The list of test cases to run the system on. Can be a list of Scorecard Testcases or a list of inputs and expected outputs.
           */
          testcases:
            | Array<{
                inputs: SystemInput;
                expected: Record<string, unknown>;
              }>
            | Array<Testcase>;
        }
    );

/**
 * Returns an async generator over the given Testset or Testcases.
 */
async function* testcaseIterator<SystemInput extends Record<string, any>>(
  scorecard: Scorecard,
  args: RunAndEvaluateArgs<SystemInput, any>,
): AsyncGenerator<{
  testcaseId: string | null;
  inputs: SystemInput;
  expected: Record<string, unknown>;
}> {
  if ('testsetId' in args) {
    for await (const testcase of scorecard.testcases.list(args.testsetId)) {
      yield {
        testcaseId: testcase.id,
        inputs: testcase.inputs as SystemInput,
        expected: testcase.expected,
      };
    }
  } else {
    for (const testcase of args.testcases) {
      yield {
        testcaseId: 'id' in testcase ? testcase.id : null,
        inputs: testcase.inputs as SystemInput,
        expected: testcase.expected,
      };
    }
  }
}

/**
 * Runs a system on a Testset and records the results in Scorecard.
 *
 * @param scorecard The Scorecard client
 * @param args.projectId The ID of the Project to run the system on.
 * @param args.testsetId The optional ID of the Testset to run the system on. Either this or `args.testcases` must be provided.
 * @param args.testcases The optional list of Testcases to run the system on. Either this or `args.testsetId` must be provided.
 * @param args.metricIds The IDs of the Metrics to use for evaluation.
 * @param args.systemVersionId The optional ID of the System Version to associate with the Run.
 * @param args.system The system to run on the Testset.
 * @param options.runInParallel Whether to call `args.system` in parallel. False (sequential) by default.
 * @param options.trials The number of times to run the system on each Testcase. 1 by default.
 */
export async function runAndEvaluate<
  SystemInput extends Record<string, any>,
  SystemOutput extends Record<string, any>,
>(
  scorecard: Scorecard,
  args: RunAndEvaluateArgs<SystemInput, SystemOutput>,
  options: {
    /**
     * Whether to call `args.system` in parallel. False (sequential) by default.
     */
    runInParallel?: boolean;
    /**
     * The number of times to run the system on each Testcase. 1 by default.
     */
    trials?: number;
  } = {
    runInParallel: false,
    trials: 1,
  },
): Promise<{
  /** The ID of the Run. */
  id: string;
  /** The URL of the Run. */
  url: string;
}> {
  const runInParallel = options.runInParallel ?? false;
  const trials = options.trials ?? 1;
  if (!(Number.isInteger(trials) && trials >= 1)) {
    throw new ScorecardError('trials must be a positive integer');
  }

  const hasSystemVersion = 'systemVersionId' in args;
  const hasTestset = 'testsetId' in args;

  const runPromise = scorecard.runs.create(args.projectId, {
    testsetId: hasTestset ? args.testsetId : null,
    metricIds: args.metricIds,
    ...(hasSystemVersion ?
      {
        systemVersionId: args.systemVersionId,
      }
    : null),
  });
  const systemVersion = hasSystemVersion ? await scorecard.systems.versions.get(args.systemVersionId) : null;
  const run = await runPromise;

  const recordPromises: Array<Promise<unknown>> = [];

  for await (const { testcaseId, inputs, expected } of testcaseIterator(scorecard, args)) {
    for (let i = 0; i < trials; i++) {
      const modelResponsePromise =
        hasSystemVersion ? args.system(inputs, systemVersion!) : args.system(inputs);

      function createRecord(outputs: SystemOutput): Promise<unknown> {
        return scorecard.records.create(run.id, {
          inputs,
          expected,
          outputs,
          ...(testcaseId != null ? { testcaseId } : null),
        });
      }

      if (runInParallel) {
        recordPromises.push(modelResponsePromise.then(createRecord));
      } else {
        recordPromises.push(createRecord(await modelResponsePromise));
      }
    }
  }
  // Wait until all the Records are created
  await Promise.all(recordPromises);

  const runUrl = `${scorecard.baseAppURL}/projects/${args.projectId}/runs/${run.id}`;

  return { id: run.id, url: runUrl };
}
