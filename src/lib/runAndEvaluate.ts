import { Scorecard } from '../client';

/**
 * Runs a system on a Testset and records the results in Scorecard.
 *
 * @param scorecard The Scorecard client
 * @param projectId The ID of the Project to run the system on.
 * @param testsetId The ID of the Testset to run the system on.
 * @param metricIds The IDs of the Metrics to use for evaluation.
 * @param system The system to run on the Testset.
 */
export async function runAndEvaluate<SystemInput extends Object, SystemOutput extends Object>(
  scorecard: Scorecard,
  {
    projectId,
    testsetId,
    metricIds,
    system,
  }: {
    projectId: string;
    testsetId: string;
    metricIds: Array<string>;
    system: (testcaseInput: SystemInput) => Promise<SystemOutput>;
  },
): Promise<Pick<Scorecard.Runs.Run, 'id'> & { url: string }> {
  const run = await scorecard.runs.create(projectId, {
    testsetId,
    metricIds,
  });

  // Run each Testcase sequentially
  const recordPromises: Array<Promise<any>> = [];
  for await (const testcase of scorecard.testcases.list(run.testsetId)) {
    const modelResponse = await system(testcase.inputs as SystemInput);
    const promise = scorecard.records.create(run.id, {
      testcaseId: testcase.id,
      inputs: testcase.inputs,
      labels: testcase.labels,
      outputs: modelResponse as Record<string, unknown>,
    });
    recordPromises.push(promise);
  }
  // Wait until all the Records are created
  await Promise.all(recordPromises);

  // Mark the Run as done with execution and ready for scoring.
  await scorecard.runs.update(run.id, {
    status: 'awaiting_scoring',
  });

  const runUrl = `https://app.getscorecard.ai/projects/${projectId}/runs/grades/${run.id}`;

  return { id: run.id, url: runUrl };
}
