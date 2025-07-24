// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'runs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects/{projectId}/runs',
  operationId: 'createRun',
};

export const tool: Tool = {
  name: 'create_runs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new Run.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/run',\n  $defs: {\n    run: {\n      type: 'object',\n      description: 'A Run in the Scorecard system.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Run.'\n        },\n        metricIds: {\n          type: 'array',\n          description: 'The IDs of the metrics this Run is using.',\n          items: {\n            type: 'string'\n          }\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the Run.',\n          enum: [            'pending',\n            'awaiting_execution',\n            'running_execution',\n            'awaiting_scoring',\n            'running_scoring',\n            'awaiting_human_scoring',\n            'completed'\n          ]\n        },\n        testsetId: {\n          type: 'string',\n          description: 'The ID of the Testset this Run is testing.'\n        },\n        systemVersionId: {\n          type: 'string',\n          description: 'The ID of the system version this Run is using.'\n        }\n      },\n      required: [        'id',\n        'metricIds',\n        'status',\n        'testsetId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      metricIds: {
        type: 'array',
        description: 'The IDs of the metrics this Run is using.',
        items: {
          type: 'string',
        },
      },
      systemVersionId: {
        type: 'string',
        description: 'The ID of the system version this Run is using.',
      },
      testsetId: {
        type: 'string',
        description: 'The ID of the Testset this Run is testing.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['projectId', 'metricIds'],
  },
  annotations: {},
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.runs.create(projectId, body)));
};

export default { metadata, tool, handler };
