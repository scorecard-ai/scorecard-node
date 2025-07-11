// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/systems/{systemId}',
  operationId: 'updateSystem',
};

export const tool: Tool = {
  name: 'update_systems',
  description:
    'Update an existing system. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.',
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
      description: {
        type: 'string',
        description: 'The description of the system.',
      },
      name: {
        type: 'string',
        description: 'The name of the system. Unique within the project.',
      },
      productionVersionId: {
        type: 'string',
        description: 'The ID of the production version of the system.',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, ...body } = args as any;
  return asTextContentResult(await client.systems.update(systemId, body));
};

export default { metadata, tool, handler };
