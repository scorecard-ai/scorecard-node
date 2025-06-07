// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testcases',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/testcases/{testcaseId}',
  operationId: 'getTestcase',
};

export const tool: Tool = {
  name: 'get_testcases',
  description: 'Retrieve a specific Testcase by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      testcaseId: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testcaseId, ...body } = args as any;
  return asTextContentResult(await client.testcases.get(testcaseId));
};

export default { metadata, tool, handler };
