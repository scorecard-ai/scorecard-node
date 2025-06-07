// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'system_configs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/configs/{systemConfigId}',
  operationId: 'getSystemConfig',
};

export const tool: Tool = {
  name: 'get_system_configs',
  description: 'Retrieve a specific system configuration by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      systemConfigId: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemConfigId, ...body } = args as any;
  return asTextContentResult(await client.systemConfigs.get(systemConfigId));
};

export default { metadata, tool, handler };
