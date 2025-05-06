#!/usr/bin/env -S npx ts-node

import OpenAI from 'openai';
import Scorecard from 'scorecard-ai';
import { runAndEvaluate } from 'scorecard-ai/lib/runAndEvaluate';

// Replace these with your own IDs.
const PROJECT_ID = '310';
const TESTSET_ID = '5290';
const METRIC_IDS = ['868', '869'];

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const scorecard = new Scorecard({
  apiKey: process.env['SCORECARD_API_KEY'],
});

/**
 * Input to the system under test.
 */
interface SystemInput {
  original: string;
  tone: string;
  recipient?: string;
}

/**
 * Output from the system under test.
 */
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
  const run = await runAndEvaluate(scorecard, {
    projectId: PROJECT_ID,
    testsetId: TESTSET_ID,
    metricIds: METRIC_IDS,
    system: runSystem,
  });
  console.log(`Go to ${run.url} and click "Run Scoring" to grade your Records.`);
}

main();
