// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'projects',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_projects',
  description: 'Create a new Project.',
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the Project.',
      },
      name: {
        type: 'string',
        description: 'The name of the Project.',
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.projects.create(body);
};

export default { metadata, tool, handler };
