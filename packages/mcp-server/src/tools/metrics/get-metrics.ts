// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'metrics',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/metrics/{metricId}',
  operationId: 'getMetric',
};

export const tool: Tool = {
  name: 'get_metrics',
  description: 'Retrieve a specific Metric by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      metricId: {
        type: 'string',
      },
    },
    required: ['metricId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { metricId, ...body } = args as any;
  try {
    return asTextContentResult(await client.metrics.get(metricId));
  } catch (error) {
    if (error instanceof Scorecard.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
