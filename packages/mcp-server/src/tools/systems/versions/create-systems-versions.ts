// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems.versions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/systems/{systemId}/configs',
  operationId: 'createSystemVersion',
};

export const tool: Tool = {
  name: 'create_systems_versions',
  description:
    "Create a new version for a system.\n\nEach version contains specific parameter values that match the system's `configSchema` - things like model parameters, thresholds, or processing options.\nOnce created, versions cannot be modified, ensuring stable reference points for evaluations.\n\nWhen creating a system version:\n- The `config` object is validated against the parent system's `configSchema`.\n- System versions with validation errors are still stored, with errors included in the response.\n- Validation errors indicate fields that don't match the schema but don't prevent creation.\n- Having validation errors may affect how some evaluation metrics are calculated.",
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
      config: {
        type: 'object',
        description: 'The configuration of the system version.',
      },
      name: {
        type: 'string',
        description: 'The name of the system version.',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, ...body } = args as any;
  return asTextContentResult(await client.systems.versions.create(systemId, body));
};

export default { metadata, tool, handler };
