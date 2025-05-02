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
          description:
            "A test case in the Scorecard system. Contains JSON data that is validated against the schema defined by its Testset.\nThe `inputs` and `labels` fields are derived from the `data` field based on the Testset's `fieldMapping`, and include all mapped fields, including those with validation errors.\nTestcases are stored regardless of validation results, with any validation errors included in the `validationErrors` field.",
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

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testsetId, ...body } = args as any;
  return client.testcases.create(testsetId, body);
};

export default { metadata, tool, handler };
