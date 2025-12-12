import { wrap } from 'scorecard-ai';
import OpenAI from 'openai';

const openai = wrap(
  new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  }),
  {
    apiKey: process.env['SCORECARD_API_KEY'],
    projectId: '987',
  },
);

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is the capital of France?' },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  console.log('Response:', response.choices[0]?.message?.content || 'No response');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
