import { wrap } from 'scorecard-ai';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { trace } from '@opentelemetry/api';

// Wrap the clients
const openai = wrap(
  new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  }),
  {
    apiKey: process.env['SCORECARD_API_KEY'],
    projectId: '987',
  },
);

const claude = wrap(
  new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  }),
  {
    apiKey: process.env['SCORECARD_API_KEY'],
    projectId: '987',
  },
);

// Example: Complex workflow with nested traces
async function analyzeWithMultipleLLMs(userQuery: string) {
  const tracer = trace.getTracer('my-app');

  // Parent span for the entire workflow
  return tracer.startActiveSpan('analyze-query-workflow', async (workflowSpan) => {
    try {
      console.log('Starting analysis workflow...');

      // First LLM call (will be nested under workflow span)
      const gptResponse = await tracer.startActiveSpan('get-gpt-analysis', async (gptSpan) => {
        gptSpan.setAttribute('llm.provider', 'openai');

        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'Analyze this query and provide initial thoughts.' },
            { role: 'user', content: userQuery },
          ],
          max_tokens: 200,
        });

        gptSpan.end();
        return response.choices[0]?.message?.content || '';
      });

      console.log('GPT Analysis:', gptResponse);

      // Second LLM call (will also be nested under workflow span)
      const claudeResponse = await tracer.startActiveSpan('get-claude-analysis', async (claudeSpan) => {
        claudeSpan.setAttribute('llm.provider', 'anthropic');

        const response = await claude.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 200,
          messages: [
            {
              role: 'user',
              content: `Here's an analysis from another model: "${gptResponse}"\n\nNow provide your own analysis of: ${userQuery}`,
            },
          ],
        });

        claudeSpan.end();
        const textContent = response.content.find((block) => block.type === 'text');
        return textContent && 'text' in textContent ? textContent.text : '';
      });

      console.log('Claude Analysis:', claudeResponse);

      // Final synthesis (could call another LLM here)
      workflowSpan.setAttribute('workflow.status', 'completed');
      workflowSpan.end();

      return {
        gptAnalysis: gptResponse,
        claudeAnalysis: claudeResponse,
      };
    } catch (error: any) {
      workflowSpan.recordException(error);
      workflowSpan.end();
      throw error;
    }
  });
}

async function main() {
  const result = await analyzeWithMultipleLLMs('What are the key differences between Python and JavaScript?');

  console.log('\nFinal Result:', result);
  console.log('\n✅ Check your Scorecard dashboard to see the nested trace tree!');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
