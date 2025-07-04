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
  httpPath: '/testsets/{testsetId}/testcases',
  operationId: 'createTestcases',
};

export const tool: Tool = {
  name: 'create_testcases',
  description: 'Create multiple Testcases in the specified Testset.',
  inputSchema: {
    type: 'object',
    properties: {
      testsetId: {
        type: 'string',
      },
      items: {
        type: 'array',
        description: 'Testcases to create (max 100).',
        items: {
          type: 'object',
          properties: {
            jsonData: {
              type: 'object',
              description: "The JSON data of the Testcase, which is validated against the Testset's schema.",
            },
          },
          required: ['jsonData'],
        },
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testsetId, ...body } = args as any;
  return asTextContentResult(await client.testcases.create(testsetId, body));
};

export default { metadata, tool, handler };
