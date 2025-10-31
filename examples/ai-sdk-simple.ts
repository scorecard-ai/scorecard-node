import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { wrapAISDK } from 'scorecard-ai/lib/wrapAISDK';

const aiSDK = wrapAISDK(ai);

async function main() {
  const { text } = await aiSDK.generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'What is the capital of France? Answer in one sentence.',
  });

  console.log('Response:', text);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
