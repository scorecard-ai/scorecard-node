#!/usr/bin/env -S npx ts-node

import Scorecard from 'scorecard-ai';

const scorecard = new Scorecard({
  apiKey: process.env['SCORECARD_API_KEY'],
});

// Find your Project's ID in the Scorecard UI.
const PROJECT_ID: string = '310';
// This script will create a Testset with this name if it doesn't exist.
// and update the testcases within it.
const TESTSET_NAME: string = 'My first SDK testset';

interface TestcaseData {
  jsonData: {
    original: string;
    tone: string;
    recipient?: string;
    idealRewritten: string;
  };
}

/**
 * Adds some Testcases to a Testset (creating it if it doesn't exist).
 */
async function main(): Promise<void> {
  let testset = await findTestsetWithName(TESTSET_NAME);
  // Create a new testset if it doesn't exist, otherwise clear it out.
  if (testset) {
    await deleteAllTestcases(testset.id);
  } else {
    testset = await createTestset(TESTSET_NAME);
  }
  const testsetUrl = `https://app.getscorecard.ai/projects/${PROJECT_ID}/testsets/${testset.id}`;
  console.log(`Find testset at ${testsetUrl}`);

  const testcases = await createTestcases(testset.id);
  // Print out the validation errors for each created Testcase.
  for (const testcase of testcases) {
    const numErrors = testcase.validationErrors?.length || 0;
    console.log(`Created Testcase ${testcase.id} with ${numErrors} validation errors`);
    for (const error of testcase.validationErrors ?? []) {
      console.log(`\t"${error.path}": ${error.message}`);
    }
  }
}

/**
 * Returns the Testset with the given name, or null if it doesn't exist.
 */
async function findTestsetWithName(testsetName: string): Promise<Scorecard.Testsets.Testset | null> {
  for await (const testset of scorecard.testsets.list(PROJECT_ID)) {
    if (testset.name === testsetName) {
      return testset;
    }
  }
  return null;
}

/**
 * Creates a Testset with the given name.
 */
async function createTestset(testsetName: string): Promise<Scorecard.Testsets.Testset> {
  const testset = await scorecard.testsets.create(PROJECT_ID, {
    name: testsetName,
    description: 'Testcases about rewriting messages in a different tone.',
    fieldMapping: {
      // Inputs are fields that represent the input to the AI system.
      inputs: ['original', 'recipient', 'tone'],
      // Expected fields are fields that represent the expected output of the AI system.
      expected: ['idealRewritten'],
      // Metadata fields are used for grouping Testcases, but not seen by the AI system.
      metadata: [],
    },
    jsonSchema: {
      type: 'object',
      properties: {
        original: { type: 'string' }, // The original message.
        recipient: { type: 'string' }, // The recipient of the message.
        tone: { type: 'string' }, // The tone that the message should be rewritten in.
        idealRewritten: { type: 'string' }, // The ideal AI-generated rewritten message.
      },
      required: ['original', 'tone', 'idealRewritten'],
    },
  });

  return testset;
}

async function deleteAllTestcases(testsetId: string): Promise<void> {
  const testcaseIds: Array<string> = [];
  for await (const testcase of scorecard.testcases.list(testsetId)) {
    testcaseIds.push(testcase.id);
  }
  await scorecard.testcases.delete({
    ids: testcaseIds,
  });
}

/**
 * Adds some Testcases to the given Testset. Returns the created Testcases.
 */
async function createTestcases(testsetId: string): Promise<Array<Scorecard.Testcases.Testcase>> {
  const testcaseResponse = await scorecard.testcases.create(testsetId, {
    items: [
      {
        jsonData: {
          original: 'We need your feedback on the new designs ASAP.',
          tone: 'polite',
          recipient: 'Darius',
          idealRewritten:
            'Hi Darius, your feedback is crucial to the success of the new designs. Please share your thoughts as soon as possible.',
        },
      },
      {
        jsonData: {
          original: "I'll be late to the office because my cat is sleeping on my keyboard.",
          tone: 'funny',
          recipient: 'team',
          // @ts-ignore This should return a validation error because it's missing the `idealRewritten` field.
          fieldNameWithTypo:
            "Hey team! My cat's napping on my keyboard and I'm just waiting for her to give me permission to leave. I'll be a bit late!",
        },
      },
      {
        jsonData: {
          original: 'Schedule a meeting to discuss this project.',
          tone: 'casual',
          idealRewritten: "Let's find a time to chat about the project. Coffee or boba?",
        },
      },
    ] satisfies Array<TestcaseData>,
  });

  return testcaseResponse.items;
}

main();
