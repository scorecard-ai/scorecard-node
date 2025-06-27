// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects/{projectId}/systems',
  operationId: 'upsertSystem',
};

export const tool: Tool = {
  name: 'upsert_systems',
  description: 'Create a new system. If one with the same name in the project exists, it updates it instead.',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      config: {
        type: 'object',
        description: 'The configuration of the system.',
      },
      description: {
        type: 'string',
        description: 'The description of the system.',
      },
      name: {
        type: 'string',
        description:
          'The name of the system. Should be unique within the project. Default is "Default system"',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  return asTextContentResult(await client.systems.upsert(projectId, body));
};

export default { metadata, tool, handler };
