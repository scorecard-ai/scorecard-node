import { wrap } from 'scorecard-ai';
import OpenAI from 'openai';
import { trace } from '@opentelemetry/api';

const openai = wrap(
  new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  }),
  {
    apiKey: process.env['SCORECARD_API_KEY'],
    projectId: '987',
  },
);

// Example: LLM call nested within a custom span
async function processUserRequest(userId: string, question: string) {
  const tracer = trace.getTracer('my-app');

  return tracer.startActiveSpan('process-request', async (span) => {
    span.setAttribute('user.id', userId);
    span.setAttribute('question.length', question.length);

    try {
      // This LLM call will automatically be a child of the 'process-request' span
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
        max_tokens: 100,
      });

      const answer = response.choices[0].message.content;
      span.setAttribute('answer.length', answer?.length || 0);
      span.end();

      return answer;
    } catch (error: any) {
      span.recordException(error);
      span.end();
      throw error;
    }
  });
}

async function main() {
  const answer = await processUserRequest('user-123', 'What is the capital of France?');
  console.log('Answer:', answer);
  console.log('\n✅ The OpenAI span is nested under the "process-request" span!');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
