// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems.versions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/versions/{systemVersionId}',
  operationId: 'getSystemVersion',
};

export const tool: Tool = {
  name: 'get_systems_versions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a specific system version by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/system_version',\n  $defs: {\n    system_version: {\n      type: 'object',\n      description: 'A SystemVersion defines the specific settings for a System Under Test.\\n\\nSystem versions contain parameter values that determine system behavior during evaluation.\\nThey are immutable snapshots - once created, they never change.\\n\\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the system version.'\n        },\n        config: {\n          type: 'object',\n          description: 'The configuration of the system version.',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the system version.'\n        },\n        systemId: {\n          type: 'string',\n          description: 'The ID of the system the system version belongs to.'\n        }\n      },\n      required: [        'id',\n        'config',\n        'name',\n        'systemId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      systemVersionId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['systemVersionId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemVersionId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.systems.versions.get(systemVersionId)),
    );
  } catch (error) {
    if (error instanceof Scorecard.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
