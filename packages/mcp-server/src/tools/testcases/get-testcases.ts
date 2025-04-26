// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testcases',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'get_testcases',
  description: 'Retrieve a specific testcase by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      testcaseId: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { testcaseId } = args;
  return client.testcases.get(testcaseId);
};

export default { metadata, tool, handler };
