// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/systems/{systemId}',
  operationId: 'deleteSystem',
};

export const tool: Tool = {
  name: 'delete_systems',
  description: 'Delete a system definition by ID. This will not delete associated system configurations.',
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, ...body } = args as any;
  return asTextContentResult(await client.systems.delete(systemId));
};

export default { metadata, tool, handler };
