// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testsets',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_testsets',
  description: 'Delete testset',
  inputSchema: {
    type: 'object',
    properties: {
      testsetId: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { testsetId } = args;
  return client.testsets.delete(testsetId);
};

export default { metadata, tool, handler };
