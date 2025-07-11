// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'metrics',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects/{projectId}/metrics',
  operationId: 'createMetric',
};

export const tool: Tool = {
  name: 'create_metrics',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new Metric for evaluating system outputs. The structure of a metric depends on the evalType and outputType of the metric.",
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'AI-based evaluation type.',
            enum: ['ai'],
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          outputType: {
            type: 'string',
            description: 'Integer output type.',
            enum: ['int'],
          },
          promptTemplate: {
            type: 'string',
            description:
              'The complete prompt template for AI evaluation. Should include placeholders for dynamic content.',
          },
          description: {
            type: 'string',
            description: 'The description of the Metric.',
          },
          evalModelName: {
            type: 'string',
            description: 'The AI model to use for evaluation.',
          },
          guidelines: {
            type: 'string',
            description: 'Guidelines for AI evaluation on how to score the metric.',
          },
          passingThreshold: {
            type: 'integer',
            description: 'The threshold for determining pass/fail from integer scores (1-5).',
          },
          temperature: {
            type: 'number',
            description: 'The temperature for AI evaluation (0-2).',
          },
        },
      },
      {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Human-based evaluation type.',
            enum: ['human'],
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          outputType: {
            type: 'string',
            description: 'Integer output type.',
            enum: ['int'],
          },
          description: {
            type: 'string',
            description: 'The description of the Metric.',
          },
          guidelines: {
            type: 'string',
            description: 'Guidelines for human evaluators.',
          },
          passingThreshold: {
            type: 'integer',
            description: 'The threshold for determining pass/fail from integer scores (1-5).',
          },
        },
      },
      {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Heuristic-based evaluation type.',
            enum: ['heuristic'],
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          outputType: {
            type: 'string',
            description: 'Integer output type.',
            enum: ['int'],
          },
          description: {
            type: 'string',
            description: 'The description of the Metric.',
          },
          guidelines: {
            type: 'string',
            description: 'Optional guidelines for heuristic evaluation logic.',
          },
          passingThreshold: {
            type: 'integer',
            description: 'The threshold for determining pass/fail from integer scores (1-5).',
          },
        },
      },
      {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'AI-based evaluation type.',
            enum: ['ai'],
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          outputType: {
            type: 'string',
            description: 'Boolean output type.',
            enum: ['boolean'],
          },
          promptTemplate: {
            type: 'string',
            description:
              'The complete prompt template for AI evaluation. Should include placeholders for dynamic content.',
          },
          description: {
            type: 'string',
            description: 'The description of the Metric.',
          },
          evalModelName: {
            type: 'string',
            description: 'The AI model to use for evaluation.',
          },
          guidelines: {
            type: 'string',
            description: 'Guidelines for AI evaluation on how to score the metric.',
          },
          temperature: {
            type: 'number',
            description: 'The temperature for AI evaluation (0-2).',
          },
        },
      },
      {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Human-based evaluation type.',
            enum: ['human'],
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          outputType: {
            type: 'string',
            description: 'Boolean output type.',
            enum: ['boolean'],
          },
          description: {
            type: 'string',
            description: 'The description of the Metric.',
          },
          guidelines: {
            type: 'string',
            description: 'Guidelines for human evaluators.',
          },
        },
      },
      {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Heuristic-based evaluation type.',
            enum: ['heuristic'],
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          outputType: {
            type: 'string',
            description: 'Boolean output type.',
            enum: ['boolean'],
          },
          description: {
            type: 'string',
            description: 'The description of the Metric.',
          },
          guidelines: {
            type: 'string',
            description: 'Optional guidelines for heuristic evaluation logic.',
          },
        },
      },
    ],
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  return asTextContentResult(await client.metrics.create(projectId, body));
};

export default { metadata, tool, handler };
