// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'runs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/projects/{projectId}/runs',
  operationId: 'listRuns',
};

export const tool: Tool = {
  name: 'list_runs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of all Runs for a Project. Runs are ordered by creation date, most recent first.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/run'\n      }\n    },\n    hasMore: {\n      type: 'boolean'\n    },\n    nextCursor: {\n      type: 'string'\n    },\n    total: {\n      type: 'integer'\n    }\n  },\n  required: [    'data',\n    'hasMore',\n    'nextCursor'\n  ],\n  $defs: {\n    run: {\n      type: 'object',\n      description: 'A Run in the Scorecard system.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Run.'\n        },\n        metricIds: {\n          type: 'array',\n          description: 'The IDs of the metrics this Run is using.',\n          items: {\n            type: 'string'\n          }\n        },\n        metricVersionIds: {\n          type: 'array',\n          description: 'The IDs of the metric versions this Run is using.',\n          items: {\n            type: 'string'\n          }\n        },\n        numExpectedRecords: {\n          type: 'number',\n          description: 'The number of expected records in the Run. Determined by the number of testcases in the Run\\'s Testset at the time of Run creation.'\n        },\n        numRecords: {\n          type: 'number',\n          description: 'The number of records in the Run.'\n        },\n        numScores: {\n          type: 'number',\n          description: 'The number of completed scores in the Run so far.'\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the Run.',\n          enum: [            'pending',\n            'awaiting_execution',\n            'running_execution',\n            'awaiting_scoring',\n            'running_scoring',\n            'awaiting_human_scoring',\n            'completed'\n          ]\n        },\n        systemId: {\n          type: 'string',\n          description: 'The ID of the system this Run is using.'\n        },\n        systemVersionId: {\n          type: 'string',\n          description: 'The ID of the system version this Run is using.'\n        },\n        testsetId: {\n          type: 'string',\n          description: 'The ID of the Testset this Run is testing.'\n        }\n      },\n      required: [        'id',\n        'metricIds',\n        'metricVersionIds',\n        'numExpectedRecords',\n        'numRecords',\n        'numScores',\n        'status',\n        'systemId',\n        'systemVersionId',\n        'testsetId'\n      ]\n    }\n  }\n}\n```",
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
    required: ['projectId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, jq_filter, ...body } = args as any;
  const response = await client.runs.list(projectId, body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (error instanceof Scorecard.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
