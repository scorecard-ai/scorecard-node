// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

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
  return asTextContentResult(await client.metrics.get(metricId));
};

export default { metadata, tool, handler };
