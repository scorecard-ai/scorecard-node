// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'scores',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/records/{recordId}/scores/{metricConfigId}',
  operationId: 'upsertScore',
};

export const tool: Tool = {
  name: 'upsert_scores',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate or update a Score for a given Record and MetricConfig. If a Score with the specified Record ID and MetricConfig ID already exists, it will be updated. Otherwise, a new Score will be created. The score provided should conform to the schema defined by the MetricConfig; otherwise, validation errors will be reported.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/score',\n  $defs: {\n    score: {\n      type: 'object',\n      description: 'A Score represents the evaluation of a Record against a specific MetricConfig. The actual `score` is stored as flexible JSON. While any JSON is accepted, it is expected to conform to the output schema defined by the MetricConfig. Any discrepancies will be noted in the `validationErrors` field, but the Score will still be stored.',\n      properties: {\n        metricConfigId: {\n          type: 'string',\n          description: 'The ID of the MetricConfig this Score is for.'\n        },\n        recordId: {\n          type: 'string',\n          description: 'The ID of the Record this Score is for.'\n        },\n        score: {\n          type: 'object',\n          description: 'The score of the Record, as arbitrary JSON. This data should ideally conform to the output schema defined by the associated MetricConfig. If it doesn\\'t, validation errors will be captured in the `validationErrors` field.'\n        },\n        validationErrors: {\n          type: 'array',\n          description: 'Validation errors found in the Score data. If present, the Score doesn\\'t fully conform to its MetricConfig\\'s schema.',\n          items: {\n            type: 'object',\n            properties: {\n              message: {\n                type: 'string',\n                description: 'Human-readable error description.'\n              },\n              path: {\n                type: 'string',\n                description: 'JSON Pointer to the field with the validation error.'\n              }\n            },\n            required: [              'message',\n              'path'\n            ]\n          }\n        }\n      },\n      required: [        'metricConfigId',\n        'recordId',\n        'score'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      recordId: {
        type: 'string',
      },
      metricConfigId: {
        type: 'string',
      },
      score: {
        type: 'object',
        description:
          "The score of the Record, as arbitrary JSON. This data should ideally conform to the output schema defined by the associated MetricConfig. If it doesn't, validation errors will be captured in the `validationErrors` field.",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['recordId', 'metricConfigId', 'score'],
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { metricConfigId, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.scores.upsert(metricConfigId, body)));
};

export default { metadata, tool, handler };
