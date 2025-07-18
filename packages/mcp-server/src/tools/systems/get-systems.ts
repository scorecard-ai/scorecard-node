// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/systems/{systemId}',
  operationId: 'getSystem',
};

export const tool: Tool = {
  name: 'get_systems',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a specific system by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/system',\n  $defs: {\n    system: {\n      type: 'object',\n      description: 'A System Under Test (SUT).\\n\\nSystems are templates - to run evaluations, pair them with a SystemVersion that provides specific\\nparameter values.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the system.'\n        },\n        description: {\n          type: 'string',\n          description: 'The description of the system.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the system. Unique within the project.'\n        },\n        productionVersion: {\n          $ref: '#/$defs/system_version'\n        },\n        versions: {\n          type: 'array',\n          description: 'The versions of the system.',\n          items: {\n            type: 'object',\n            description: 'A SystemVersion defines the specific settings for a System Under Test.\\n\\nSystem versions contain parameter values that determine system behavior during evaluation.\\nThey are immutable snapshots - once created, they never change.\\n\\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'The ID of the system version.'\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the system version.'\n              }\n            },\n            required: [              'id',\n              'name'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'description',\n        'name',\n        'productionVersion',\n        'versions'\n      ]\n    },\n    system_version: {\n      type: 'object',\n      description: 'A SystemVersion defines the specific settings for a System Under Test.\\n\\nSystem versions contain parameter values that determine system behavior during evaluation.\\nThey are immutable snapshots - once created, they never change.\\n\\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the system version.'\n        },\n        config: {\n          type: 'object',\n          description: 'The configuration of the system version.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the system version.'\n        },\n        systemId: {\n          type: 'string',\n          description: 'The ID of the system the system version belongs to.'\n        }\n      },\n      required: [        'id',\n        'config',\n        'name',\n        'systemId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      systemId: {
        type: 'string',
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
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { systemId, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.systems.get(systemId)));
};

export default { metadata, tool, handler };
