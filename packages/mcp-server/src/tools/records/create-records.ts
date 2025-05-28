// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'records',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_records',
  description: 'Create a new Record in a Run.',
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
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { runId, ...body } = args as any;
  return client.records.create(runId, body);
};

export default { metadata, tool, handler };
