#!/usr/bin/env -S npx ts-node

import OpenAI from 'openai';
import Scorecard, { runAndEvaluate } from 'scorecard-ai';

// Replace these with your own IDs.
const PROJECT_ID = '317';
const METRIC_IDS = ['925', '907', '876'];

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const scorecard = new Scorecard({
  apiKey: process.env['SCORECARD_API_KEY'],
});

/**
 * Input to the system under test.
 */
interface ToneSystemInput {
  original: string;
  tone: string;
  recipient?: string;
}

/**
 * Output from the system under test.
 */
interface ToneSystemOutput {
  rewritten: string;
}

/**
 * The "system under test" -- the AI system that you want to evaluate.
 */
async function runSystem(input: ToneSystemInput): Promise<ToneSystemOutput> {
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
  const run = await runAndEvaluate<ToneSystemInput, ToneSystemOutput>(
    scorecard,
    {
      projectId: PROJECT_ID,
      metricIds: METRIC_IDS,
      system: runSystem,
      testcases: [
        {
          inputs: {
            original: 'We need your feedback on the new designs ASAP.',
            tone: 'polite',
          },
          expected: {
            idealRewritten:
              'Hi! your feedback is crucial to the success of the new designs. Please share your thoughts as soon as possible.',
          },
        },
        {
          inputs: {
            original: "I'll be late to the office because my cat is sleeping on my keyboard.",
            tone: 'funny',
            recipient: 'team',
          },
          expected: {
            idealRewritten:
              "Hey team! My cat's napping on my keyboard and I'm just waiting for her to give me permission to leave. I'll be a bit late!",
          },
        },
      ],
    },
    {
      runInParallel: true,
    },
  );
  console.log(`Go to ${run.url} to view your Run's scorecard.`);
}

main();
