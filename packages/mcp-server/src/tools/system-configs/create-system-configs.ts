// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'system_configs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/systems/{systemId}/configs',
  operationId: 'createSystemConfig',
};

export const tool: Tool = {
  name: 'create_system_configs',
  description:
    "Create a new configuration for a system.\n\nEach configuration contains specific parameter values that match the system's configSchema - things like model parameters, thresholds, or processing options.\nOnce created, configurations cannot be modified, ensuring stable reference points for evaluations.\n\nWhen creating a configuration:\n- The 'config' object is validated against the parent system's configSchema\n- Configurations with validation errors are still stored, with errors included in the response\n- Validation errors indicate fields that don't match the schema but don't prevent creation\n- Having validation errors may affect how some evaluation metrics are calculated",
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
      config: {
        type: 'object',
        description: 'The configuration of the system.',
      },
      name: {
        type: 'string',
        description: 'The name of the system configuration.',
      },
      validationErrors: {
        type: 'array',
        description:
          "Validation errors found in the configuration. If present, the configuration doesn't fully conform to its system's configSchema.",
        items: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Human-readable error description.',
            },
            path: {
              type: 'string',
              description: 'JSON Pointer to the field with the validation error.',
            },
          },
          required: ['message', 'path'],
        },
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, ...body } = args as any;
  return asTextContentResult(await client.systemConfigs.create(systemId, body));
};

export default { metadata, tool, handler };
