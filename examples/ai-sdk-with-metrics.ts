import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { wrapAISDK } from 'scorecard-ai/lib/wrapAISDK';
import { z } from 'zod';

const aiSDK = wrapAISDK(ai, {
  projectId: '37604', // use your own project id
  metrics: ['Check if the response object contains the key "capital"'], // use either metric ids, metric descriptions, or a mix of both
});

async function main() {
  const { object: capitalOfFrance } = await aiSDK.generateObject({
    model: openai('gpt-4o-mini'),
    prompt: 'What is the capital of France? Answer in one sentence.',
    schema: z.object({
      capital: z.string(),
      country: z.string(),
    }),
  });

  const { object: capitalOfBrazil } = await aiSDK.generateObject({
    model: openai('gpt-4o-mini'),
    prompt: 'What is the capital of Brazil? Answer in one sentence.',
    schema: z.object({
      capital: z.string(),
      country: z.string(),
    }),
  });

  console.log('Response:', capitalOfFrance, capitalOfBrazil);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
