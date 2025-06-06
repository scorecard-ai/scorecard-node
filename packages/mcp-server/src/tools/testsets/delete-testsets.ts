// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testsets',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/testsets/{testsetId}',
  operationId: 'deleteTestset',
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

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testsetId, ...body } = args as any;
  return asTextContentResult(await client.testsets.delete(testsetId));
};

export default { metadata, tool, handler };
