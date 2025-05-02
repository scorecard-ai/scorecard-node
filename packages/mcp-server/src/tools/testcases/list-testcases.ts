// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'testcases',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_testcases',
  description: 'Retrieve a paginated list of Testcases belonging to a Testset.',
  inputSchema: {
    type: 'object',
    properties: {
      testsetId: {
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
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { testsetId, ...body } = args as any;
  return client.testcases.list(testsetId, body);
};

export default { metadata, tool, handler };
