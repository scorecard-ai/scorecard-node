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
  name: 'update_systems',
  description:
    "Update an existing system definition. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.\n\nWhen updating schemas:\n- The system will accept your changes regardless of compatibility with existing configurations\n- Schema updates won't invalidate existing evaluations or configurations\n- For significant redesigns, creating a new system definition provides a cleaner separation",
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
      configSchema: {
        type: 'object',
        description: "The schema of the system's configuration",
      },
      description: {
        type: 'string',
        description: 'The description of the system',
      },
      inputSchema: {
        type: 'object',
        description: "The schema of the system's inputs",
      },
      name: {
        type: 'string',
        description: 'The name of the system',
      },
      outputSchema: {
        type: 'object',
        description: "The schema of the system's outputs",
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { systemId, ...body } = args;
  return client.systems.update(systemId, body);
};

export default { metadata, tool, handler };
