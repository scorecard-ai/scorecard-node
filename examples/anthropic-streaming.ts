import { wrap } from 'scorecard-ai';
import Anthropic from '@anthropic-ai/sdk';

const claude = wrap(
  new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  }),
);

async function main() {
  console.log('Streaming response from Claude...\n');

  // Create a streaming request
  const stream = await claude.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    messages: [{ role: 'user', content: 'Write a short poem about TypeScript programming.' }],
    temperature: 0.7,
    max_tokens: 200,
  });

  // Consume the stream
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta?.type === 'text_delta') {
      process.stdout.write(chunk.delta.text);
    }
  }

  console.log('\n\nStream complete! Check your Scorecard dashboard for traces.');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
