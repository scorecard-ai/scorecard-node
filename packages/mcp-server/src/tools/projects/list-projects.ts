// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'projects',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_projects',
  description:
    'Retrieve a paginated list of all Projects. Projects are ordered by creation date, with oldest Projects first.',
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
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.projects.list(body);
};

export default { metadata, tool, handler };
