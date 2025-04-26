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
  description: 'Replace the data of an existing testcase while keeping its ID.',
  inputSchema: {
    type: 'object',
    properties: {
      testcaseId: {
        type: 'string',
      },
      jsonData: {
        type: 'object',
        description: "The JSON data of the testcase, which is validated against the testset's schema.",
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { testcaseId, ...body } = args;
  return client.testcases.update(testcaseId, body);
};

export default { metadata, tool, handler };
