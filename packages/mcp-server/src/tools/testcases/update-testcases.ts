// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testcases',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/testcases/{testcaseId}',
  operationId: 'updateTestcase',
};

export const tool: Tool = {
  name: 'update_testcases',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReplace the data of an existing Testcase while keeping its ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/testcase',\n  $defs: {\n    testcase: {\n      type: 'object',\n      description: 'A test case in the Scorecard system. Contains JSON data that is validated against the schema defined by its Testset.\\nThe `inputs` and `expected` fields are derived from the `data` field based on the Testset\\'s `fieldMapping`, and include all mapped fields, including those with validation errors.\\nTestcases are stored regardless of validation results, with any validation errors included in the `validationErrors` field.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Testcase.'\n        },\n        expected: {\n          type: 'object',\n          description: 'Derived from data based on the Testset\\'s fieldMapping. Contains all fields marked as expected outputs, including those with validation errors.'\n        },\n        inputs: {\n          type: 'object',\n          description: 'Derived from data based on the Testset\\'s fieldMapping. Contains all fields marked as inputs, including those with validation errors.'\n        },\n        jsonData: {\n          type: 'object',\n          description: 'The JSON data of the Testcase, which is validated against the Testset\\'s schema.'\n        },\n        testsetId: {\n          type: 'string',\n          description: 'The ID of the Testset this Testcase belongs to.'\n        },\n        validationErrors: {\n          type: 'array',\n          description: 'Validation errors found in the Testcase data. If present, the Testcase doesn\\'t fully conform to its Testset\\'s schema.',\n          items: {\n            type: 'object',\n            properties: {\n              message: {\n                type: 'string',\n                description: 'Human-readable error description.'\n              },\n              path: {\n                type: 'string',\n                description: 'JSON Pointer to the field with the validation error.'\n              }\n            },\n            required: [              'message',\n              'path'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'expected',\n        'inputs',\n        'jsonData',\n        'testsetId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      testcaseId: {
        type: 'string',
      },
      jsonData: {
        type: 'object',
        description: "The JSON data of the Testcase, which is validated against the Testset's schema.",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['testcaseId', 'jsonData'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testcaseId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.testcases.update(testcaseId, body)));
};

export default { metadata, tool, handler };
