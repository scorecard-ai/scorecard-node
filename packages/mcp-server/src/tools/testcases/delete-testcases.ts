// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testcases',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/testcases/bulk-delete',
  operationId: 'deleteTestcases',
};

export const tool: Tool = {
  name: 'delete_testcases',
  description: 'Delete multiple Testcases by their IDs.',
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description: 'IDs of Testcases to delete.',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.testcases.delete(body));
};

export default { metadata, tool, handler };
