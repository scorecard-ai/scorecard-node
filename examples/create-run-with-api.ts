#!/usr/bin/env -S npx ts-node

import OpenAI from 'openai';
import Scorecard from 'scorecard-ai';

// Replace these with your own IDs.
const PROJECT_ID = '310';
const TESTSET_ID = '5290';
const METRIC_IDS = ['868', '869'];

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const scorecard = new Scorecard({
  bearerToken: process.env['SCORECARD_API_KEY'],
});

interface SystemInput {
  original: string;
  tone: string;
  recipient?: string;
}

interface SystemOutput {
  rewritten: string;
}

/**
 * The "system under test" -- the AI system that you want to evaluate.
 */
async function runSystem(input: SystemInput): Promise<SystemOutput> {
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    instructions: `You are a tone translator that converts a user's message to a different tone ("${
      input.tone
    }"). ${input.recipient ? `Address the recipient: ${input.recipient}` : ''}`,
    input: input.original,
  });

  return { rewritten: response.output_text };
}

async function main() {
  // Create a new Run on the Testset with the given Metrics.
  const run = await scorecard.runs.create(PROJECT_ID, {
    testsetId: TESTSET_ID,
    metricIds: METRIC_IDS,
  });

  // Run the system on each Testcase.
  for await (const testcase of scorecard.testcases.list(TESTSET_ID)) {
    const outputs = await runSystem(testcase.inputs as unknown as SystemInput);
    console.log(`Outputs: ${JSON.stringify(outputs)}`);
    await scorecard.records.create(run.id, {
      testcaseId: testcase.id,
      inputs: testcase.inputs,
      labels: testcase.labels,
      outputs: outputs as unknown as Record<string, unknown>,
    });
  }

  // Mark the Run as done with execution and ready for scoring.
  await scorecard.runs.update(run.id, {
    status: 'awaiting_scoring',
  });

  const runUrl = `https://app.getscorecard.ai/projects/${PROJECT_ID}/runs/grades/${run.id}`;
  console.log(`Go to ${runUrl} and click "Run Scoring" to grade your Records.`);
}

main();
