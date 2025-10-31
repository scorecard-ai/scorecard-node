import { openai } from '@ai-sdk/openai';
import * as ai from 'ai';
import { wrapAISDK } from 'scorecard-ai';

const aiSDK = wrapAISDK(ai);

async function main() {
  const { embeddings } = await aiSDK.embedMany({
    model: openai.textEmbeddingModel('text-embedding-3-small'),
    values: ['sunny day at the beach', 'rainy afternoon in the city', 'snowy night in the mountains'],
  });

  console.log('Response:', embeddings);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
