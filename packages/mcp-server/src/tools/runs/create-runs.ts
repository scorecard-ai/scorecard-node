// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'runs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_runs',
  description: 'Create a new run.',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      metricIds: {
        type: 'array',
        description: 'The IDs of the metrics this Run is using',
        items: {
          type: 'string',
        },
      },
      testsetId: {
        type: 'string',
        description: 'The ID of the Testset this Run is testing',
      },
      systemConfigId: {
        type: 'string',
        description: 'The ID of the system configuration this Run is using',
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { projectId, ...body } = args;
  return client.runs.create(projectId, body);
};

export default { metadata, tool, handler };
