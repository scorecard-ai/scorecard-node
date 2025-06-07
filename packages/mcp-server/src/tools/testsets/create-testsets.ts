// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testsets',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects/{projectId}/testsets',
  operationId: 'createTestset',
};

export const tool: Tool = {
  name: 'create_testsets',
  description:
    'Create a new Testset for a Project. The Testset will be created in the Project specified in the path.',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
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

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  return asTextContentResult(await client.testsets.create(projectId, body));
};

export default { metadata, tool, handler };
