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
  name: 'update_testsets',
  description:
    'Update a Testset. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.\n\nWhen updating the schema:\n- If field mappings are not provided and existing mappings reference fields that no longer exist, those mappings will be automatically removed\n- To preserve all existing mappings, ensure all referenced fields remain in the updated schema\n- For complete control, provide both schema and fieldMapping when updating the schema',
  inputSchema: {
    type: 'object',
    properties: {
      testsetId: {
        type: 'string',
      },
      description: {
        type: 'string',
        description: 'The description of the Testset.',
      },
      fieldMapping: {
        type: 'object',
        description:
          'Maps top-level keys of the Testcase schema to their roles (input/expected output). Unmapped fields are treated as metadata.',
        properties: {
          expected: {
            type: 'array',
            description: 'Fields that represent expected outputs.',
            items: {
              type: 'string',
            },
          },
          inputs: {
            type: 'array',
            description: 'Fields that represent inputs to the AI system.',
            items: {
              type: 'string',
            },
          },
          metadata: {
            type: 'array',
            description: 'Fields that are not inputs or expected outputs.',
            items: {
              type: 'string',
            },
          },
        },
        required: ['expected', 'inputs', 'metadata'],
      },
      jsonSchema: {
        type: 'object',
        description: 'The JSON schema for each Testcase in the Testset.',
      },
      name: {
        type: 'string',
        description: 'The name of the Testset.',
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testsetId, ...body } = args as any;
  return client.testsets.update(testsetId, body);
};

export default { metadata, tool, handler };
