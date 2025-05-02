// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'runs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_runs',
  description: 'Update the status of a Run.',
  inputSchema: {
    type: 'object',
    properties: {
      runId: {
        type: 'string',
      },
      status: {
        type: 'string',
        description: 'The status of the Run.',
        enum: [
          'pending',
          'awaiting_execution',
          'running_execution',
          'awaiting_scoring',
          'running_scoring',
          'awaiting_human_scoring',
          'completed',
        ],
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { runId, ...body } = args as any;
  return client.runs.update(runId, body);
};

export default { metadata, tool, handler };
