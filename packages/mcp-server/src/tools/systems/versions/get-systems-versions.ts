// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems.versions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/versions/{systemVersionId}',
  operationId: 'getSystemVersion',
};

export const tool: Tool = {
  name: 'get_systems_versions',
  description: 'Retrieve a specific system version by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      systemVersionId: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemVersionId, ...body } = args as any;
  return asTextContentResult(await client.systems.versions.get(systemVersionId));
};

export default { metadata, tool, handler };
