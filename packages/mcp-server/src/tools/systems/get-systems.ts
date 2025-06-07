// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/{systemId}',
  operationId: 'getSystem',
};

export const tool: Tool = {
  name: 'get_systems',
  description: 'Retrieve a specific system by ID.',
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
  return asTextContentResult(await client.systems.get(systemId));
};

export default { metadata, tool, handler };
