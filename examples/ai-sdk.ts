import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { wrapAISDK } from 'scorecard-ai/lib/wrapAISDK';

async function main() {
  const { generateText } = await wrapAISDK(ai);

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'What is the capital of France? Answer in one sentence.',
  });

  console.log('Response:', text);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
