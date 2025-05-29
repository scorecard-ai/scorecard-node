// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Scorecard from 'scorecard-ai';

export const metadata: Metadata = {
  resource: 'systems',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/projects/{projectId}/systems',
  operationId: 'createSystem',
};

export const tool: Tool = {
  name: 'create_systems',
  description:
    'Create a new system definition that specifies the interface contracts for a component you want to evaluate.\n\nA system acts as a template that defines three key contracts through JSON Schemas:\n1. Input Schema: What data your system accepts (e.g., user queries, context documents)\n2. Output Schema: What data your system produces (e.g., responses, confidence scores)\n3. Config Schema: What parameters can be adjusted (e.g., model selection, temperature)\n\nThis separation lets you evaluate any system as a black box, focusing on its interface rather than implementation details.',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
      },
      configSchema: {
        type: 'object',
        description: "The schema of the system's configuration.",
      },
      description: {
        type: 'string',
        description: 'The description of the system.',
      },
      inputSchema: {
        type: 'object',
        description: "The schema of the system's inputs.",
      },
      name: {
        type: 'string',
        description: 'The name of the system.',
      },
      outputSchema: {
        type: 'object',
        description: "The schema of the system's outputs.",
      },
    },
  },
};

export const handler = (client: Scorecard, args: Record<string, unknown> | undefined) => {
  const { projectId, ...body } = args as any;
  return client.systems.create(projectId, body);
};

export default { metadata, tool, handler };
