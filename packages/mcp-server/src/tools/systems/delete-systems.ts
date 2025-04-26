// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_systems',
  description: 'Delete a system definition by ID. This will not delete associated system configurations.',
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { systemId } = args;
  return client.systems.delete(systemId);
};

export default { metadata, tool, handler };
