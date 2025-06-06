// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'system_configs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/{systemId}/configs',
  operationId: 'listSystemConfigs',
};

export const tool: Tool = {
  name: 'list_system_configs',
  description:
    'Retrieve a paginated list of configurations for a specific system.\n\nSystem configurations provide concrete parameter values for a System Under Test, defining exactly how the system should be configured during an evaluation run.',
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
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
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, ...body } = args as any;
  return asTextContentResult(await client.systemConfigs.list(systemId, body));
};

export default { metadata, tool, handler };
