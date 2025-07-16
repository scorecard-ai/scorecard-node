// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testsets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/projects/{projectId}/testsets',
  operationId: 'listTestsets',
};

export const tool: Tool = {
  name: 'list_testsets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of Testsets belonging to a Project.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/testset'\n      }\n    },\n    hasMore: {\n      type: 'boolean'\n    },\n    nextCursor: {\n      type: 'string'\n    },\n    total: {\n      type: 'integer'\n    }\n  },\n  required: [    'data',\n    'hasMore',\n    'nextCursor'\n  ],\n  $defs: {\n    testset: {\n      type: 'object',\n      description: 'A collection of Testcases that share the same schema.\\nEach Testset defines the structure of its Testcases through a JSON schema.\\nThe `fieldMapping` object maps top-level keys of the Testcase schema to their roles (input/expected output).\\nFields not mentioned in the `fieldMapping` during creation or update are treated as metadata.\\n\\n## JSON Schema validation constraints supported:\\n\\n- **Required fields** - Fields listed in the schema\\'s `required` array must be present in Testcases.\\n- **Type validation** - Values must match the specified type (string, number, boolean, null, integer, object, array).\\n- **Enum validation** - Values must be one of the options specified in the `enum` array.\\n- **Object property validation** - Properties of objects must conform to their defined schemas.\\n- **Array item validation** - Items in arrays must conform to the `items` schema.\\n- **Logical composition** - Values must conform to at least one schema in the `anyOf` array.\\n\\nTestcases that fail validation will still be stored, but will include `validationErrors` detailing the issues.\\nExtra fields in the Testcase data that are not in the schema will be stored but are ignored during validation.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Testset.'\n        },\n        description: {\n          type: 'string',\n          description: 'The description of the Testset.'\n        },\n        fieldMapping: {\n          type: 'object',\n          description: 'Maps top-level keys of the Testcase schema to their roles (input/expected output). Unmapped fields are treated as metadata.',\n          properties: {\n            expected: {\n              type: 'array',\n              description: 'Fields that represent expected outputs.',\n              items: {\n                type: 'string'\n              }\n            },\n            inputs: {\n              type: 'array',\n              description: 'Fields that represent inputs to the AI system.',\n              items: {\n                type: 'string'\n              }\n            },\n            metadata: {\n              type: 'array',\n              description: 'Fields that are not inputs or expected outputs.',\n              items: {\n                type: 'string'\n              }\n            }\n          },\n          required: [            'expected',\n            'inputs',\n            'metadata'\n          ]\n        },\n        jsonSchema: {\n          type: 'object',\n          description: 'The JSON schema for each Testcase in the Testset.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the Testset.'\n        }\n      },\n      required: [        'id',\n        'description',\n        'fieldMapping',\n        'jsonSchema',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      cursor: {
        type: 'string',
        description:
          'Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  const response = await client.testsets.list(projectId, body).asResponse();
  return asTextContentResult(await maybeFilter(args, await response.json()));
};

export default { metadata, tool, handler };
