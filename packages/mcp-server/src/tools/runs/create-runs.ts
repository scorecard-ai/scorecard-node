// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'runs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects/{projectId}/runs',
  operationId: 'createRun',
};

export const tool: Tool = {
  name: 'create_runs',
  description: 'Create a new Run.',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      metricIds: {
        type: 'array',
        description: 'The IDs of the metrics this Run is using.',
        items: {
          type: 'string',
        },
      },
      systemVersionId: {
        type: 'string',
        description: 'The ID of the system version this Run is using.',
      },
      testsetId: {
        type: 'string',
        description: 'The ID of the Testset this Run is testing.',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  return asTextContentResult(await client.runs.create(projectId, body));
};

export default { metadata, tool, handler };
