import { wrap } from 'scorecard-ai';
import Anthropic from '@anthropic-ai/sdk';

const claude = wrap(
  new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  }),
);

async function main() {
  const response = await claude.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    messages: [{ role: 'user', content: 'What is the capital of France?' }],
  });

  const textContent = response.content.find((block) => block.type === 'text');
  console.log('Response:', textContent?.text ?? 'No response');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
