// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'metrics',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/metrics/{metricId}',
  operationId: 'updateMetric',
};

export const tool: Tool = {
  name: 'update_metrics',
  description:
    'Update an existing Metric. You must specify the evalType and outputType of the metric. The structure of a metric depends on the evalType and outputType of the metric.',
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          metricId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'AI-based evaluation type.',
            enum: ['ai'],
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
          evalModelName: {
            type: 'string',
            description: 'The AI model to use for evaluation.',
          },
          guidelines: {
            type: 'string',
            description: 'Guidelines for AI evaluation on how to score the metric.',
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          passingThreshold: {
            type: 'integer',
            description: 'The threshold for determining pass/fail from integer scores (1-5).',
          },
          promptTemplate: {
            type: 'string',
            description:
              'The complete prompt template for AI evaluation. Should include placeholders for dynamic content.',
          },
          temperature: {
            type: 'number',
            description: 'The temperature for AI evaluation (0-2).',
          },
        },
        required: ['metricId', 'evalType', 'outputType'],
      },
      {
        type: 'object',
        properties: {
          metricId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Human-based evaluation type.',
            enum: ['human'],
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
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          passingThreshold: {
            type: 'integer',
            description: 'The threshold for determining pass/fail from integer scores (1-5).',
          },
        },
        required: ['metricId', 'evalType', 'outputType'],
      },
      {
        type: 'object',
        properties: {
          metricId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Heuristic-based evaluation type.',
            enum: ['heuristic'],
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
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          passingThreshold: {
            type: 'integer',
            description: 'The threshold for determining pass/fail from integer scores (1-5).',
          },
        },
        required: ['metricId', 'evalType', 'outputType'],
      },
      {
        type: 'object',
        properties: {
          metricId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'AI-based evaluation type.',
            enum: ['ai'],
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
          evalModelName: {
            type: 'string',
            description: 'The AI model to use for evaluation.',
          },
          guidelines: {
            type: 'string',
            description: 'Guidelines for AI evaluation on how to score the metric.',
          },
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
          promptTemplate: {
            type: 'string',
            description:
              'The complete prompt template for AI evaluation. Should include placeholders for dynamic content.',
          },
          temperature: {
            type: 'number',
            description: 'The temperature for AI evaluation (0-2).',
          },
        },
        required: ['metricId', 'evalType', 'outputType'],
      },
      {
        type: 'object',
        properties: {
          metricId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Human-based evaluation type.',
            enum: ['human'],
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
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
        },
        required: ['metricId', 'evalType', 'outputType'],
      },
      {
        type: 'object',
        properties: {
          metricId: {
            type: 'string',
          },
          evalType: {
            type: 'string',
            description: 'Heuristic-based evaluation type.',
            enum: ['heuristic'],
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
          name: {
            type: 'string',
            description: 'The name of the Metric.',
          },
        },
        required: ['metricId', 'evalType', 'outputType'],
      },
    ],
  },
  annotations: {},
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { metricId, ...body } = args as any;
  return asTextContentResult(await client.metrics.update(metricId, body));
};

export default { metadata, tool, handler };
