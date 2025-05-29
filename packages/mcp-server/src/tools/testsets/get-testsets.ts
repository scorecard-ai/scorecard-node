// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testsets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/testsets/{testsetId}',
  operationId: 'getTestset',
};

export const tool: Tool = {
  name: 'get_testsets',
  description: 'Get Testset by ID',
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
  return client.testsets.get(testsetId);
};

export default { metadata, tool, handler };
