import { Scorecard } from '../client';
import { SystemConfig, Testcase } from '../resources';

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
    | // If system config is provided, the system function receives a system config
    {
        /**
         * The ID of the System Configuration to use for the run.
         */
        systemConfigId: string;

        /**
         * The system function to run on the Testset.
         */
        system: (testcaseInput: SystemInput, systemConfig: SystemConfig) => Promise<SystemOutput>;
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
        ...testcase,
        testcaseId: testcase.id,
        inputs: testcase.inputs as SystemInput,
      };
    }
  } else {
    for (const testcase of args.testcases) {
      yield {
        ...testcase,
        testcaseId: 'id' in testcase ? testcase.id : null,
        inputs: testcase.inputs as SystemInput,
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
 * @param args.systemConfigId The optional ID of the System Configuration to associate with the Run.
 * @param args.system The system to run on the Testset.
 * @param options.runInParallel Whether to call `args.system` in parallel. False (sequential) by default.
 */
export async function runAndEvaluate<
  SystemInput extends Record<string, any>,
  SystemOutput extends Record<string, any>,
>(
  scorecard: Scorecard,
  args: RunAndEvaluateArgs<SystemInput, SystemOutput>,
  options: {
    runInParallel: boolean;
  } = {
    runInParallel: false,
  },
): Promise<Pick<Scorecard.Runs.Run, 'id'> & { url: string }> {
  const hasSystemConfig = 'systemConfigId' in args;
  const hasTestset = 'testsetId' in args;

  const runPromise = scorecard.runs.create(args.projectId, {
    testsetId: hasTestset ? args.testsetId : null,
    metricIds: args.metricIds,
    ...(hasSystemConfig ?
      {
        systemConfigId: args.systemConfigId,
      }
    : null),
  });
  const systemConfig = hasSystemConfig ? await scorecard.systemConfigs.get(args.systemConfigId) : null;
  const run = await runPromise;

  const recordPromises: Array<Promise<unknown>> = [];

  for await (const { testcaseId, inputs, expected } of testcaseIterator(scorecard, args)) {
    const modelResponsePromise = hasSystemConfig ? args.system(inputs, systemConfig!) : args.system(inputs);

    function createRecord(outputs: SystemOutput): Promise<unknown> {
      return scorecard.records.create(run.id, {
        inputs,
        expected,
        outputs,
        ...(testcaseId != null ? { testcaseId } : null),
      });
    }

    if (options.runInParallel) {
      recordPromises.push(modelResponsePromise.then(createRecord));
    } else {
      recordPromises.push(createRecord(await modelResponsePromise));
    }
  }
  // Wait until all the Records are created
  await Promise.all(recordPromises);

  const runUrl = `${scorecard.baseAppURL}/projects/${args.projectId}/runs/${run.id}`;

  return { id: run.id, url: runUrl };
}
