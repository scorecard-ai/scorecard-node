// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'records',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/runs/{runId}/records',
  operationId: 'listRecords',
};

export const tool: Tool = {
  name: 'list_records',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of Records for a Run, including all scores for each record.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/record_list_response'\n      }\n    },\n    hasMore: {\n      type: 'boolean'\n    },\n    nextCursor: {\n      type: 'string'\n    },\n    total: {\n      type: 'integer'\n    }\n  },\n  required: [    'data',\n    'hasMore',\n    'nextCursor'\n  ],\n  $defs: {\n    record_list_response: {\n      allOf: [        {\n          $ref: '#/$defs/record'\n        }\n      ],\n      description: 'A record with all its associated scores.'\n    },\n    record: {\n      type: 'object',\n      description: 'A record of a system execution in the Scorecard system.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Record.'\n        },\n        expected: {\n          type: 'object',\n          description: 'The expected outputs for the Testcase.',\n          additionalProperties: true\n        },\n        inputs: {\n          type: 'object',\n          description: 'The actual inputs sent to the system, which should match the system\\'s input schema.',\n          additionalProperties: true\n        },\n        outputs: {\n          type: 'object',\n          description: 'The actual outputs from the system.',\n          additionalProperties: true\n        },\n        runId: {\n          type: 'string',\n          description: 'The ID of the Run containing this Record.'\n        },\n        testcaseId: {\n          type: 'string',\n          description: 'The ID of the Testcase.'\n        }\n      },\n      required: [        'id',\n        'expected',\n        'inputs',\n        'outputs',\n        'runId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      runId: {
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
    required: ['runId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { runId, jq_filter, ...body } = args as any;
  const response = await client.records.list(runId, body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
