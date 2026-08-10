import { wrap } from 'scorecard-ai';
import OpenAI from 'openai';

const openai = wrap(
  new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  }),
);

async function main() {
  console.log('Streaming response from OpenAI...\n');

  // Note: stream_options enables usage tracking in streams
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Write a short poem about TypeScript programming.' },
    ],
    temperature: 0.7,
    max_tokens: 200,
    stream: true,
    stream_options: { include_usage: true },
  });

  // Consume the stream
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      process.stdout.write(content);
    }
  }

  console.log('\n\nStream complete! Check your Scorecard dashboard for traces.');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
