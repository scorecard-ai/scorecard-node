// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'system_configs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/{systemId}/configs/{systemConfigId}',
  operationId: 'getSystemConfig',
};

export const tool: Tool = {
  name: 'get_system_configs',
  description: 'Retrieve a specific system configuration by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
      systemConfigId: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemConfigId, ...body } = args as any;
  return client.systemConfigs.get(systemConfigId, body);
};

export default { metadata, tool, handler };
