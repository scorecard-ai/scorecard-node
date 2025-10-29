// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'records',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/records/{recordId}',
  operationId: 'deleteRecord',
};

export const tool: Tool = {
  name: 'delete_records',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete a specific Record by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/record_delete_response',\n  $defs: {\n    record_delete_response: {\n      type: 'object',\n      properties: {\n        success: {\n          type: 'boolean',\n          description: 'Whether the deletion was successful.'\n        }\n      },\n      required: [        'success'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      recordId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['recordId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { recordId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.records.delete(recordId)));
};

export default { metadata, tool, handler };
