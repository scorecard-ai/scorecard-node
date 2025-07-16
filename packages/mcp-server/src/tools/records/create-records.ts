// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'scorecard-ai-mcp/filtering';
import { Metadata, asTextContentResult } from 'scorecard-ai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'records',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/runs/{runId}/records',
  operationId: 'createRecord',
};

export const tool: Tool = {
  name: 'create_records',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new Record in a Run.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/record',\n  $defs: {\n    record: {\n      type: 'object',\n      description: 'A record of a system execution in the Scorecard system.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the Record.'\n        },\n        expected: {\n          type: 'object',\n          description: 'The expected outputs for the Testcase.'\n        },\n        inputs: {\n          type: 'object',\n          description: 'The actual inputs sent to the system, which should match the system\\'s input schema.'\n        },\n        outputs: {\n          type: 'object',\n          description: 'The actual outputs from the system.'\n        },\n        runId: {\n          type: 'string',\n          description: 'The ID of the Run containing this Record.'\n        },\n        testcaseId: {\n          type: 'string',\n          description: 'The ID of the Testcase.'\n        }\n      },\n      required: [        'id',\n        'expected',\n        'inputs',\n        'outputs',\n        'runId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      runId: {
        type: 'string',
      },
      expected: {
        type: 'object',
        description: 'The expected outputs for the Testcase.',
      },
      inputs: {
        type: 'object',
        description: "The actual inputs sent to the system, which should match the system's input schema.",
      },
      outputs: {
        type: 'object',
        description: 'The actual outputs from the system.',
      },
      testcaseId: {
        type: 'string',
        description: 'The ID of the Testcase.',
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
  const { runId, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.records.create(runId, body)));
};

export default { metadata, tool, handler };
