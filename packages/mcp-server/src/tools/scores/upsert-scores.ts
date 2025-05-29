// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
    'Create or update a Score for a given Record and MetricConfig. If a Score with the specified Record ID and MetricConfig ID already exists, it will be updated. Otherwise, a new Score will be created. The score provided should conform to the schema defined by the MetricConfig; otherwise, validation errors will be reported.',
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
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { metricConfigId, ...body } = args as any;
  return client.scores.upsert(metricConfigId, body);
};

export default { metadata, tool, handler };
