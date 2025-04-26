// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'get_systems',
  description: 'Retrieve a specific system by ID.',
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
  return client.systems.get(systemId);
};

export default { metadata, tool, handler };
