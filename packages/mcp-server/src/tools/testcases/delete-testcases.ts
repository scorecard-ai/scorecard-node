// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testcases',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_testcases',
  description: 'Delete multiple testcases by their IDs.',
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description: 'IDs of testcases to delete',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { ...body } = args;
  return client.testcases.delete(body);
};

export default { metadata, tool, handler };
