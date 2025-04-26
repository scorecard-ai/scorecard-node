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
  description: 'Create multiple testcases in the specified testset.',
  inputSchema: {
    type: 'object',
    properties: {
      testsetId: {
        type: 'string',
      },
      items: {
        type: 'array',
        description: 'Testcases to create (max 100)',
        items: {
          type: 'object',
          description:
            "A test case in the Scorecard system. Contains JSON data that is validated against the schema defined by its testset.\nThe `inputs` and `labels` fields are derived from the `data` field based on the testset's `fieldMapping`, and include all mapped fields, including those with validation errors.\nTestcases are stored regardless of validation results, with any validation errors included in the `validationErrors` field.",
          properties: {
            jsonData: {
              type: 'object',
              description: "The JSON data of the testcase, which is validated against the testset's schema.",
            },
          },
          required: ['jsonData'],
        },
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { testsetId, ...body } = args;
  return client.testcases.create(testsetId, body);
};

export default { metadata, tool, handler };
