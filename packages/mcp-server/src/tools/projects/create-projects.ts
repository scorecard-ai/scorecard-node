// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'projects',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects',
  operationId: 'createProject',
};

export const tool: Tool = {
  name: 'create_projects',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new Project.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/project',\n  $defs: {\n    project: {\n      type: 'object',\n      description: 'A Project in the Scorecard system.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Project.'\n        },\n        description: {\n          type: 'string',\n          description: 'The description of the Project.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the Project.'\n        }\n      },\n      required: [        'id',\n        'description',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the Project.',
      },
      name: {
        type: 'string',
        description: 'The name of the Project.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['description', 'name'],
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.projects.create(body)));
};

export default { metadata, tool, handler };
