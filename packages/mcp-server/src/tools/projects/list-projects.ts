// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'projects',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/projects',
  operationId: 'listProjects',
};

export const tool: Tool = {
  name: 'list_projects',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of all Projects. Projects are ordered by creation date, with oldest Projects first.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/project'\n      }\n    },\n    hasMore: {\n      type: 'boolean'\n    },\n    nextCursor: {\n      type: 'string'\n    },\n    total: {\n      type: 'integer'\n    }\n  },\n  required: [    'data',\n    'hasMore',\n    'nextCursor'\n  ],\n  $defs: {\n    project: {\n      type: 'object',\n      description: 'A Project in the Scorecard system.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Project.'\n        },\n        description: {\n          type: 'string',\n          description: 'The description of the Project.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the Project.'\n        }\n      },\n      required: [        'id',\n        'description',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.projects.list(body).asResponse();
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
