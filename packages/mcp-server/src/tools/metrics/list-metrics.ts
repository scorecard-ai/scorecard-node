// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'metrics',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/projects/{projectId}/metrics',
  operationId: 'listMetrics',
};

export const tool: Tool = {
  name: 'list_metrics',
  description:
    'List Metrics configured for the specified Project. Metrics are returned in reverse chronological order.',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      cursor: {
        type: 'string',
        description:
          'Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.',
      },
    },
    required: ['projectId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  const response = await client.metrics.list(projectId, body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
