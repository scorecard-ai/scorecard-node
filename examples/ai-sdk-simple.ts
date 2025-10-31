import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { wrapAISDK } from 'scorecard-ai';

const aiSDK = wrapAISDK(ai);
const aiSDKWithMetrics = wrapAISDK(ai, {
  serviceName: 'ai-sdk-with-metrics',
  projectId: '37604',
  metrics: ['Check if the response is concise'],
});

async function main() {
  const { text } = await aiSDK.generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'What is the capital of France? Answer in one sentence.',
  });

  const { text: textWithMetrics } = await aiSDKWithMetrics.generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'What is the capital of France? Answer in one sentence.',
  });

  console.log('Response:', text, textWithMetrics);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
