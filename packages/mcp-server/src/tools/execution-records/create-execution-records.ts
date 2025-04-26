// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'execution_records',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_execution_records',
  description: 'Create a new execution record.',
  inputSchema: {
    type: 'object',
    properties: {
      runId: {
        type: 'string',
      },
      inputs: {
        type: 'object',
        description: "The actual inputs sent to the system, which should match the system's input schema",
      },
      labels: {
        type: 'object',
        description: 'The expected outputs for the testcase',
      },
      outputs: {
        type: 'object',
        description: 'The actual outputs from the system',
      },
      testcaseId: {
        type: 'string',
        description: 'The ID of the testcase',
      },
    },
  },
};

export const handler = (client: Scorecard, args: any) => {
  const { runId, ...body } = args;
  return client.executionRecords.create(runId, body);
};

export default { metadata, tool, handler };
