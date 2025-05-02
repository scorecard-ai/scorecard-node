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
  name: 'update_testcases',
  description: 'Replace the data of an existing Testcase while keeping its ID.',
  inputSchema: {
    type: 'object',
    properties: {
      testcaseId: {
        type: 'string',
      },
      jsonData: {
        type: 'object',
        description: "The JSON data of the Testcase, which is validated against the Testset's schema.",
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testcaseId, ...body } = args as any;
  return client.testcases.update(testcaseId, body);
};

export default { metadata, tool, handler };
