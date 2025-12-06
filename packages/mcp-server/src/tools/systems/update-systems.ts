// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/systems/{systemId}',
  operationId: 'updateSystem',
};

export const tool: Tool = {
  name: 'update_systems',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate an existing system. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/system',\n  $defs: {\n    system: {\n      type: 'object',\n      description: 'A System Under Test (SUT).\\n\\nSystems are templates - to run evaluations, pair them with a SystemVersion that provides specific\\nparameter values.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the system.'\n        },\n        description: {\n          type: 'string',\n          description: 'The description of the system.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the system. Unique within the project.'\n        },\n        productionVersion: {\n          $ref: '#/$defs/system_version'\n        },\n        versions: {\n          type: 'array',\n          description: 'The versions of the system.',\n          items: {\n            type: 'object',\n            description: 'A SystemVersion defines the specific settings for a System Under Test.\\n\\nSystem versions contain parameter values that determine system behavior during evaluation.\\nThey are immutable snapshots - once created, they never change.\\n\\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'The ID of the system version.'\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the system version.'\n              }\n            },\n            required: [              'id',\n              'name'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'description',\n        'name',\n        'productionVersion',\n        'versions'\n      ]\n    },\n    system_version: {\n      type: 'object',\n      description: 'A SystemVersion defines the specific settings for a System Under Test.\\n\\nSystem versions contain parameter values that determine system behavior during evaluation.\\nThey are immutable snapshots - once created, they never change.\\n\\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the system version.'\n        },\n        config: {\n          type: 'object',\n          description: 'The configuration of the system version.',\n          additionalProperties: true\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the system version.'\n        },\n        systemId: {\n          type: 'string',\n          description: 'The ID of the system the system version belongs to.'\n        }\n      },\n      required: [        'id',\n        'config',\n        'name',\n        'systemId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
      },
      description: {
        type: 'string',
        description: 'The description of the system.',
      },
      name: {
        type: 'string',
        description: 'The name of the system. Unique within the project.',
      },
      productionVersionId: {
        type: 'string',
        description: 'The ID of the production version of the system.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['systemId'],
  },
  annotations: {},
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.systems.update(systemId, body)));
  } catch (error) {
    if (error instanceof Scorecard.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
