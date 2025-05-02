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
  description: 'Delete Testset',
  inputSchema: {
    type: 'object',
    properties: {
      testsetId: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testsetId, ...body } = args as any;
  return client.testsets.delete(testsetId);
};

export default { metadata, tool, handler };
