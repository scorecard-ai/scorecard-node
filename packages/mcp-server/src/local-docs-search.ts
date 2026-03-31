// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/projects',
    httpMethod: 'post',
    summary: 'Create Project',
    description: 'Create a new Project.',
    stainlessPath: '(resource) projects > (method) create',
    qualified: 'client.projects.create',
    params: ['description: string;', 'name: string;'],
    response: '{ id: string; description: string; name: string; }',
    markdown:
      "## create\n\n`client.projects.create(description: string, name: string): { id: string; description: string; name: string; }`\n\n**post** `/projects`\n\nCreate a new Project.\n\n### Parameters\n\n- `description: string`\n  The description of the Project.\n\n- `name: string`\n  The name of the Project.\n\n### Returns\n\n- `{ id: string; description: string; name: string; }`\n  A Project in the Scorecard system.\n\n  - `id: string`\n  - `description: string`\n  - `name: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst project = await client.projects.create({ description: 'This is a test project', name: 'My Project' });\n\nconsole.log(project);\n```",
  },
  {
    name: 'list',
    endpoint: '/projects',
    httpMethod: 'get',
    summary: 'List Projects',
    description:
      'Retrieve a paginated list of all Projects. Projects are ordered by creation date, with oldest Projects first.',
    stainlessPath: '(resource) projects > (method) list',
    qualified: 'client.projects.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response: '{ id: string; description: string; name: string; }',
    markdown:
      "## list\n\n`client.projects.list(cursor?: string, limit?: number): { id: string; description: string; name: string; }`\n\n**get** `/projects`\n\nRetrieve a paginated list of all Projects. Projects are ordered by creation date, with oldest Projects first.\n\n### Parameters\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; description: string; name: string; }`\n  A Project in the Scorecard system.\n\n  - `id: string`\n  - `description: string`\n  - `name: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const project of client.projects.list()) {\n  console.log(project);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/projects/{projectId}/testsets',
    httpMethod: 'post',
    summary: 'Create Testset',
    description:
      'Create a new Testset for a Project. The Testset will be created in the Project specified in the path.',
    stainlessPath: '(resource) testsets > (method) create',
    qualified: 'client.testsets.create',
    params: [
      'projectId: string;',
      'description: string;',
      'fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; };',
      'jsonSchema: object;',
      'name: string;',
    ],
    response:
      '{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }',
    markdown:
      "## create\n\n`client.testsets.create(projectId: string, description: string, fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }, jsonSchema: object, name: string): { id: string; description: string; fieldMapping: object; jsonSchema: object; name: string; }`\n\n**post** `/projects/{projectId}/testsets`\n\nCreate a new Testset for a Project. The Testset will be created in the Project specified in the path.\n\n### Parameters\n\n- `projectId: string`\n\n- `description: string`\n  The description of the Testset.\n\n- `fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }`\n  Maps top-level keys of the Testcase schema to their roles (input/expected output). Unmapped fields are treated as metadata.\n  - `expected: string[]`\n    Fields that represent expected outputs.\n  - `inputs: string[]`\n    Fields that represent inputs to the AI system.\n  - `metadata: string[]`\n    Fields that are not inputs or expected outputs.\n\n- `jsonSchema: object`\n  The JSON schema for each Testcase in the Testset.\n\n- `name: string`\n  The name of the Testset.\n\n### Returns\n\n- `{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }`\n  A collection of Testcases that share the same schema.\nEach Testset defines the structure of its Testcases through a JSON schema.\nThe `fieldMapping` object maps top-level keys of the Testcase schema to their roles (input/expected output).\nFields not mentioned in the `fieldMapping` during creation or update are treated as metadata.\n\n## JSON Schema validation constraints supported:\n\n- **Required fields** - Fields listed in the schema's `required` array must be present in Testcases.\n- **Type validation** - Values must match the specified type (string, number, boolean, null, integer, object, array).\n- **Enum validation** - Values must be one of the options specified in the `enum` array.\n- **Object property validation** - Properties of objects must conform to their defined schemas.\n- **Array item validation** - Items in arrays must conform to the `items` schema.\n- **Logical composition** - Values must conform to at least one schema in the `anyOf` array.\n\nTestcases that fail validation will still be stored, but will include `validationErrors` detailing the issues.\nExtra fields in the Testcase data that are not in the schema will be stored but are ignored during validation.\n\n  - `id: string`\n  - `description: string`\n  - `fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }`\n  - `jsonSchema: object`\n  - `name: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testset = await client.testsets.create('314', {\n  description: 'Testset for long context Q&A chatbot.',\n  fieldMapping: {\n  expected: ['idealAnswer'],\n  inputs: ['question'],\n  metadata: ['string'],\n},\n  jsonSchema: { type: 'bar', properties: 'bar' },\n  name: 'Long Context Q&A',\n});\n\nconsole.log(testset);\n```",
  },
  {
    name: 'update',
    endpoint: '/testsets/{testsetId}',
    httpMethod: 'patch',
    summary: 'Update Testset',
    description:
      'Update a Testset. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.\n\nWhen updating the schema:\n- If field mappings are not provided and existing mappings reference fields that no longer exist, those mappings will be automatically removed\n- To preserve all existing mappings, ensure all referenced fields remain in the updated schema\n- For complete control, provide both schema and fieldMapping when updating the schema',
    stainlessPath: '(resource) testsets > (method) update',
    qualified: 'client.testsets.update',
    params: [
      'testsetId: string;',
      'description?: string;',
      'fieldMapping?: { expected: string[]; inputs: string[]; metadata: string[]; };',
      'jsonSchema?: object;',
      'name?: string;',
    ],
    response:
      '{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }',
    markdown:
      "## update\n\n`client.testsets.update(testsetId: string, description?: string, fieldMapping?: { expected: string[]; inputs: string[]; metadata: string[]; }, jsonSchema?: object, name?: string): { id: string; description: string; fieldMapping: object; jsonSchema: object; name: string; }`\n\n**patch** `/testsets/{testsetId}`\n\nUpdate a Testset. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.\n\nWhen updating the schema:\n- If field mappings are not provided and existing mappings reference fields that no longer exist, those mappings will be automatically removed\n- To preserve all existing mappings, ensure all referenced fields remain in the updated schema\n- For complete control, provide both schema and fieldMapping when updating the schema\n\n### Parameters\n\n- `testsetId: string`\n\n- `description?: string`\n  The description of the Testset.\n\n- `fieldMapping?: { expected: string[]; inputs: string[]; metadata: string[]; }`\n  Maps top-level keys of the Testcase schema to their roles (input/expected output). Unmapped fields are treated as metadata.\n  - `expected: string[]`\n    Fields that represent expected outputs.\n  - `inputs: string[]`\n    Fields that represent inputs to the AI system.\n  - `metadata: string[]`\n    Fields that are not inputs or expected outputs.\n\n- `jsonSchema?: object`\n  The JSON schema for each Testcase in the Testset.\n\n- `name?: string`\n  The name of the Testset.\n\n### Returns\n\n- `{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }`\n  A collection of Testcases that share the same schema.\nEach Testset defines the structure of its Testcases through a JSON schema.\nThe `fieldMapping` object maps top-level keys of the Testcase schema to their roles (input/expected output).\nFields not mentioned in the `fieldMapping` during creation or update are treated as metadata.\n\n## JSON Schema validation constraints supported:\n\n- **Required fields** - Fields listed in the schema's `required` array must be present in Testcases.\n- **Type validation** - Values must match the specified type (string, number, boolean, null, integer, object, array).\n- **Enum validation** - Values must be one of the options specified in the `enum` array.\n- **Object property validation** - Properties of objects must conform to their defined schemas.\n- **Array item validation** - Items in arrays must conform to the `items` schema.\n- **Logical composition** - Values must conform to at least one schema in the `anyOf` array.\n\nTestcases that fail validation will still be stored, but will include `validationErrors` detailing the issues.\nExtra fields in the Testcase data that are not in the schema will be stored but are ignored during validation.\n\n  - `id: string`\n  - `description: string`\n  - `fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }`\n  - `jsonSchema: object`\n  - `name: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testset = await client.testsets.update('246');\n\nconsole.log(testset);\n```",
  },
  {
    name: 'list',
    endpoint: '/projects/{projectId}/testsets',
    httpMethod: 'get',
    summary: 'List Testsets in Project',
    description: 'Retrieve a paginated list of Testsets belonging to a Project.',
    stainlessPath: '(resource) testsets > (method) list',
    qualified: 'client.testsets.list',
    params: ['projectId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }',
    markdown:
      "## list\n\n`client.testsets.list(projectId: string, cursor?: string, limit?: number): { id: string; description: string; fieldMapping: object; jsonSchema: object; name: string; }`\n\n**get** `/projects/{projectId}/testsets`\n\nRetrieve a paginated list of Testsets belonging to a Project.\n\n### Parameters\n\n- `projectId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }`\n  A collection of Testcases that share the same schema.\nEach Testset defines the structure of its Testcases through a JSON schema.\nThe `fieldMapping` object maps top-level keys of the Testcase schema to their roles (input/expected output).\nFields not mentioned in the `fieldMapping` during creation or update are treated as metadata.\n\n## JSON Schema validation constraints supported:\n\n- **Required fields** - Fields listed in the schema's `required` array must be present in Testcases.\n- **Type validation** - Values must match the specified type (string, number, boolean, null, integer, object, array).\n- **Enum validation** - Values must be one of the options specified in the `enum` array.\n- **Object property validation** - Properties of objects must conform to their defined schemas.\n- **Array item validation** - Items in arrays must conform to the `items` schema.\n- **Logical composition** - Values must conform to at least one schema in the `anyOf` array.\n\nTestcases that fail validation will still be stored, but will include `validationErrors` detailing the issues.\nExtra fields in the Testcase data that are not in the schema will be stored but are ignored during validation.\n\n  - `id: string`\n  - `description: string`\n  - `fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }`\n  - `jsonSchema: object`\n  - `name: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const testset of client.testsets.list('314')) {\n  console.log(testset);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/testsets/{testsetId}',
    httpMethod: 'delete',
    summary: 'Delete Testset',
    description: 'Delete Testset',
    stainlessPath: '(resource) testsets > (method) delete',
    qualified: 'client.testsets.delete',
    params: ['testsetId: string;'],
    response: '{ success: boolean; }',
    markdown:
      "## delete\n\n`client.testsets.delete(testsetId: string): { success: boolean; }`\n\n**delete** `/testsets/{testsetId}`\n\nDelete Testset\n\n### Parameters\n\n- `testsetId: string`\n\n### Returns\n\n- `{ success: boolean; }`\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testset = await client.testsets.delete('246');\n\nconsole.log(testset);\n```",
  },
  {
    name: 'get',
    endpoint: '/testsets/{testsetId}',
    httpMethod: 'get',
    summary: 'Get Testset',
    description: 'Get Testset',
    stainlessPath: '(resource) testsets > (method) get',
    qualified: 'client.testsets.get',
    params: ['testsetId: string;'],
    response:
      '{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }',
    markdown:
      "## get\n\n`client.testsets.get(testsetId: string): { id: string; description: string; fieldMapping: object; jsonSchema: object; name: string; }`\n\n**get** `/testsets/{testsetId}`\n\nGet Testset\n\n### Parameters\n\n- `testsetId: string`\n\n### Returns\n\n- `{ id: string; description: string; fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }; jsonSchema: object; name: string; }`\n  A collection of Testcases that share the same schema.\nEach Testset defines the structure of its Testcases through a JSON schema.\nThe `fieldMapping` object maps top-level keys of the Testcase schema to their roles (input/expected output).\nFields not mentioned in the `fieldMapping` during creation or update are treated as metadata.\n\n## JSON Schema validation constraints supported:\n\n- **Required fields** - Fields listed in the schema's `required` array must be present in Testcases.\n- **Type validation** - Values must match the specified type (string, number, boolean, null, integer, object, array).\n- **Enum validation** - Values must be one of the options specified in the `enum` array.\n- **Object property validation** - Properties of objects must conform to their defined schemas.\n- **Array item validation** - Items in arrays must conform to the `items` schema.\n- **Logical composition** - Values must conform to at least one schema in the `anyOf` array.\n\nTestcases that fail validation will still be stored, but will include `validationErrors` detailing the issues.\nExtra fields in the Testcase data that are not in the schema will be stored but are ignored during validation.\n\n  - `id: string`\n  - `description: string`\n  - `fieldMapping: { expected: string[]; inputs: string[]; metadata: string[]; }`\n  - `jsonSchema: object`\n  - `name: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testset = await client.testsets.get('246');\n\nconsole.log(testset);\n```",
  },
  {
    name: 'create',
    endpoint: '/testsets/{testsetId}/testcases',
    httpMethod: 'post',
    summary: 'Create multiple Testcases',
    description: 'Create multiple Testcases in the specified Testset.',
    stainlessPath: '(resource) testcases > (method) create',
    qualified: 'client.testcases.create',
    params: ['testsetId: string;', 'items: { jsonData: object; }[];'],
    response:
      '{ items: { id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: object[]; }[]; }',
    markdown:
      "## create\n\n`client.testcases.create(testsetId: string, items: { jsonData: object; }[]): { items: testcase[]; }`\n\n**post** `/testsets/{testsetId}/testcases`\n\nCreate multiple Testcases in the specified Testset.\n\n### Parameters\n\n- `testsetId: string`\n\n- `items: { jsonData: object; }[]`\n  Testcases to create (max 100).\n\n### Returns\n\n- `{ items: { id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: object[]; }[]; }`\n\n  - `items: { id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testcase = await client.testcases.create('246', { items: [{ jsonData: {\n  question: 'bar',\n  idealAnswer: 'bar',\n  provenance: 'bar',\n} }, { jsonData: {\n  question: 'bar',\n  idealAnswer: 'bar',\n  provenance: 'bar',\n} }, { jsonData: {\n  question: 'bar',\n  idealAnswer: 'bar',\n  provenance: 'bar',\n} }] });\n\nconsole.log(testcase);\n```",
  },
  {
    name: 'update',
    endpoint: '/testcases/{testcaseId}',
    httpMethod: 'put',
    summary: 'Update Testcase',
    description: 'Replace the data of an existing Testcase while keeping its ID.',
    stainlessPath: '(resource) testcases > (method) update',
    qualified: 'client.testcases.update',
    params: ['testcaseId: string;', 'jsonData: object;'],
    response:
      '{ id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }',
    markdown:
      "## update\n\n`client.testcases.update(testcaseId: string, jsonData: object): { id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: object[]; }`\n\n**put** `/testcases/{testcaseId}`\n\nReplace the data of an existing Testcase while keeping its ID.\n\n### Parameters\n\n- `testcaseId: string`\n\n- `jsonData: object`\n  The JSON data of the Testcase, which is validated against the Testset's schema.\n\n### Returns\n\n- `{ id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }`\n  A test case in the Scorecard system. Contains JSON data that is validated against the schema defined by its Testset.\nThe `inputs` and `expected` fields are derived from the `data` field based on the Testset's `fieldMapping`, and include all mapped fields, including those with validation errors.\nTestcases are stored regardless of validation results, with any validation errors included in the `validationErrors` field.\n\n  - `id: string`\n  - `expected: object`\n  - `inputs: object`\n  - `jsonData: object`\n  - `testsetId: string`\n  - `validationErrors?: { message: string; path: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testcase = await client.testcases.update('248', { jsonData: {\n  question: 'bar',\n  idealAnswer: 'bar',\n  provenance: 'bar',\n} });\n\nconsole.log(testcase);\n```",
  },
  {
    name: 'list',
    endpoint: '/testsets/{testsetId}/testcases',
    httpMethod: 'get',
    summary: 'List Testcases in Testset',
    description: 'Retrieve a paginated list of Testcases belonging to a Testset.',
    stainlessPath: '(resource) testcases > (method) list',
    qualified: 'client.testcases.list',
    params: ['testsetId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }',
    markdown:
      "## list\n\n`client.testcases.list(testsetId: string, cursor?: string, limit?: number): { id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: object[]; }`\n\n**get** `/testsets/{testsetId}/testcases`\n\nRetrieve a paginated list of Testcases belonging to a Testset.\n\n### Parameters\n\n- `testsetId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }`\n  A test case in the Scorecard system. Contains JSON data that is validated against the schema defined by its Testset.\nThe `inputs` and `expected` fields are derived from the `data` field based on the Testset's `fieldMapping`, and include all mapped fields, including those with validation errors.\nTestcases are stored regardless of validation results, with any validation errors included in the `validationErrors` field.\n\n  - `id: string`\n  - `expected: object`\n  - `inputs: object`\n  - `jsonData: object`\n  - `testsetId: string`\n  - `validationErrors?: { message: string; path: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const testcase of client.testcases.list('246')) {\n  console.log(testcase);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/testcases/bulk-delete',
    httpMethod: 'post',
    summary: 'Delete multiple Testcases',
    description: 'Delete multiple Testcases by their IDs.',
    stainlessPath: '(resource) testcases > (method) delete',
    qualified: 'client.testcases.delete',
    params: ['ids: string[];'],
    response: '{ success: boolean; }',
    markdown:
      "## delete\n\n`client.testcases.delete(ids: string[]): { success: boolean; }`\n\n**post** `/testcases/bulk-delete`\n\nDelete multiple Testcases by their IDs.\n\n### Parameters\n\n- `ids: string[]`\n  IDs of Testcases to delete.\n\n### Returns\n\n- `{ success: boolean; }`\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testcase = await client.testcases.delete({ ids: ['123', '124', '125'] });\n\nconsole.log(testcase);\n```",
  },
  {
    name: 'get',
    endpoint: '/testcases/{testcaseId}',
    httpMethod: 'get',
    summary: 'Get Testcase',
    description: 'Retrieve a specific Testcase by ID.',
    stainlessPath: '(resource) testcases > (method) get',
    qualified: 'client.testcases.get',
    params: ['testcaseId: string;'],
    response:
      '{ id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }',
    markdown:
      "## get\n\n`client.testcases.get(testcaseId: string): { id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: object[]; }`\n\n**get** `/testcases/{testcaseId}`\n\nRetrieve a specific Testcase by ID.\n\n### Parameters\n\n- `testcaseId: string`\n\n### Returns\n\n- `{ id: string; expected: object; inputs: object; jsonData: object; testsetId: string; validationErrors?: { message: string; path: string; }[]; }`\n  A test case in the Scorecard system. Contains JSON data that is validated against the schema defined by its Testset.\nThe `inputs` and `expected` fields are derived from the `data` field based on the Testset's `fieldMapping`, and include all mapped fields, including those with validation errors.\nTestcases are stored regardless of validation results, with any validation errors included in the `validationErrors` field.\n\n  - `id: string`\n  - `expected: object`\n  - `inputs: object`\n  - `jsonData: object`\n  - `testsetId: string`\n  - `validationErrors?: { message: string; path: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst testcase = await client.testcases.get('248');\n\nconsole.log(testcase);\n```",
  },
  {
    name: 'create',
    endpoint: '/projects/{projectId}/runs',
    httpMethod: 'post',
    summary: 'Create Run',
    description: 'Create a new Run.',
    stainlessPath: '(resource) runs > (method) create',
    qualified: 'client.runs.create',
    params: [
      'projectId: string;',
      'metricIds: string[];',
      'systemVersionId?: string;',
      'testsetId?: string;',
    ],
    response:
      '{ id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }',
    markdown:
      "## create\n\n`client.runs.create(projectId: string, metricIds: string[], systemVersionId?: string, testsetId?: string): { id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }`\n\n**post** `/projects/{projectId}/runs`\n\nCreate a new Run.\n\n### Parameters\n\n- `projectId: string`\n\n- `metricIds: string[]`\n  The IDs of the metrics this Run is using.\n\n- `systemVersionId?: string`\n  The ID of the system version this Run is using.\n\n- `testsetId?: string`\n  The ID of the Testset this Run is testing.\n\n### Returns\n\n- `{ id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }`\n  A Run in the Scorecard system.\n\n  - `id: string`\n  - `metricIds: string[]`\n  - `metricVersionIds: string[]`\n  - `numExpectedRecords: number`\n  - `numRecords: number`\n  - `numScores: number`\n  - `status: string`\n  - `systemId: string`\n  - `systemVersionId: string`\n  - `testsetId: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst run = await client.runs.create('314', { metricIds: ['789', '101'] });\n\nconsole.log(run);\n```",
  },
  {
    name: 'list',
    endpoint: '/projects/{projectId}/runs',
    httpMethod: 'get',
    summary: 'List Runs',
    description:
      'Retrieve a paginated list of all Runs for a Project. Runs are ordered by creation date, most recent first.',
    stainlessPath: '(resource) runs > (method) list',
    qualified: 'client.runs.list',
    params: ['projectId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }',
    markdown:
      "## list\n\n`client.runs.list(projectId: string, cursor?: string, limit?: number): { id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }`\n\n**get** `/projects/{projectId}/runs`\n\nRetrieve a paginated list of all Runs for a Project. Runs are ordered by creation date, most recent first.\n\n### Parameters\n\n- `projectId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }`\n  A Run in the Scorecard system.\n\n  - `id: string`\n  - `metricIds: string[]`\n  - `metricVersionIds: string[]`\n  - `numExpectedRecords: number`\n  - `numRecords: number`\n  - `numScores: number`\n  - `status: string`\n  - `systemId: string`\n  - `systemVersionId: string`\n  - `testsetId: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const run of client.runs.list('314')) {\n  console.log(run);\n}\n```",
  },
  {
    name: 'get',
    endpoint: '/runs/{runId}',
    httpMethod: 'get',
    summary: 'Get Run',
    description: 'Retrieve a specific Run by ID.',
    stainlessPath: '(resource) runs > (method) get',
    qualified: 'client.runs.get',
    params: ['runId: string;'],
    response:
      '{ id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }',
    markdown:
      "## get\n\n`client.runs.get(runId: string): { id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }`\n\n**get** `/runs/{runId}`\n\nRetrieve a specific Run by ID.\n\n### Parameters\n\n- `runId: string`\n\n### Returns\n\n- `{ id: string; metricIds: string[]; metricVersionIds: string[]; numExpectedRecords: number; numRecords: number; numScores: number; status: string; systemId: string; systemVersionId: string; testsetId: string; }`\n  A Run in the Scorecard system.\n\n  - `id: string`\n  - `metricIds: string[]`\n  - `metricVersionIds: string[]`\n  - `numExpectedRecords: number`\n  - `numRecords: number`\n  - `numScores: number`\n  - `status: string`\n  - `systemId: string`\n  - `systemVersionId: string`\n  - `testsetId: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst run = await client.runs.get('135');\n\nconsole.log(run);\n```",
  },
  {
    name: 'create',
    endpoint: '/projects/{projectId}/metrics',
    httpMethod: 'post',
    summary: 'Create Metric',
    description:
      'Create a new Metric for evaluating system outputs. The structure of a metric depends on the evalType and outputType of the metric.',
    stainlessPath: '(resource) metrics > (method) create',
    qualified: 'client.metrics.create',
    params: [
      'projectId: string;',
      "body?: { evalType: 'ai'; name: string; outputType: 'int'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'float'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'boolean'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; } | { evalType: 'heuristic'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; };",
    ],
    response: 'object | object | object | object | object | object | object | object | object',
    markdown:
      "## create\n\n`client.metrics.create(projectId: string, body?: { evalType: 'ai'; name: string; outputType: 'int'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'float'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'boolean'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; } | { evalType: 'heuristic'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; }): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**post** `/projects/{projectId}/metrics`\n\nCreate a new Metric for evaluating system outputs. The structure of a metric depends on the evalType and outputType of the metric.\n\n### Parameters\n\n- `projectId: string`\n\n- `body?: { evalType: 'ai'; name: string; outputType: 'int'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'float'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'boolean'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; } | { evalType: 'heuristic'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; }`\n  A Metric with AI evaluation and integer output.\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.create('314');\n\nconsole.log(metric);\n```",
  },
  {
    name: 'update',
    endpoint: '/metrics/{metricId}',
    httpMethod: 'patch',
    summary: 'Update Metric',
    description:
      'Update an existing Metric. You must specify the evalType and outputType of the metric. The structure of a metric depends on the evalType and outputType of the metric.',
    stainlessPath: '(resource) metrics > (method) update',
    qualified: 'client.metrics.update',
    params: [
      'metricId: string;',
      "body?: { evalType: 'ai'; outputType: 'int'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'float'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'boolean'; description?: string; evalModelName?: string; guidelines?: string; name?: string; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; } | { evalType: 'heuristic'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; };",
    ],
    response: 'object | object | object | object | object | object | object | object | object',
    markdown:
      "## update\n\n`client.metrics.update(metricId: string, body?: { evalType: 'ai'; outputType: 'int'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'float'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'boolean'; description?: string; evalModelName?: string; guidelines?: string; name?: string; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; } | { evalType: 'heuristic'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; }): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**patch** `/metrics/{metricId}`\n\nUpdate an existing Metric. You must specify the evalType and outputType of the metric. The structure of a metric depends on the evalType and outputType of the metric.\n\n### Parameters\n\n- `metricId: string`\n\n- `body?: { evalType: 'ai'; outputType: 'int'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'float'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'boolean'; description?: string; evalModelName?: string; guidelines?: string; name?: string; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; } | { evalType: 'heuristic'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; }`\n  A Metric with AI evaluation and integer output.\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.update('321');\n\nconsole.log(metric);\n```",
  },
  {
    name: 'list',
    endpoint: '/projects/{projectId}/metrics',
    httpMethod: 'get',
    summary: 'List Metrics',
    description:
      'List Metrics configured for the specified Project. Metrics are returned in reverse chronological order.',
    stainlessPath: '(resource) metrics > (method) list',
    qualified: 'client.metrics.list',
    params: ['projectId: string;', 'cursor?: string;', 'limit?: number;'],
    response: 'object | object | object | object | object | object | object | object | object',
    markdown:
      "## list\n\n`client.metrics.list(projectId: string, cursor?: string, limit?: number): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**get** `/projects/{projectId}/metrics`\n\nList Metrics configured for the specified Project. Metrics are returned in reverse chronological order.\n\n### Parameters\n\n- `projectId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const metric of client.metrics.list('314')) {\n  console.log(metric);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/metrics/{metricId}',
    httpMethod: 'delete',
    summary: 'Delete Metric',
    description:
      'Delete a specific Metric by ID. The metric will be removed from metric groups and monitors.',
    stainlessPath: '(resource) metrics > (method) delete',
    qualified: 'client.metrics.delete',
    params: ['metricId: string;'],
    response: '{ success: boolean; }',
    markdown:
      "## delete\n\n`client.metrics.delete(metricId: string): { success: boolean; }`\n\n**delete** `/metrics/{metricId}`\n\nDelete a specific Metric by ID. The metric will be removed from metric groups and monitors.\n\n### Parameters\n\n- `metricId: string`\n\n### Returns\n\n- `{ success: boolean; }`\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.delete('321');\n\nconsole.log(metric);\n```",
  },
  {
    name: 'get',
    endpoint: '/metrics/{metricId}',
    httpMethod: 'get',
    summary: 'Get Metric',
    description: 'Retrieve a specific Metric by ID.',
    stainlessPath: '(resource) metrics > (method) get',
    qualified: 'client.metrics.get',
    params: ['metricId: string;'],
    response: 'object | object | object | object | object | object | object | object | object',
    markdown:
      "## get\n\n`client.metrics.get(metricId: string): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**get** `/metrics/{metricId}`\n\nRetrieve a specific Metric by ID.\n\n### Parameters\n\n- `metricId: string`\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.get('321');\n\nconsole.log(metric);\n```",
  },
  {
    name: 'create',
    endpoint: '/runs/{runId}/records',
    httpMethod: 'post',
    summary: 'Create Record',
    description: 'Create a new Record in a Run.',
    stainlessPath: '(resource) records > (method) create',
    qualified: 'client.records.create',
    params: [
      'runId: string;',
      'expected: object;',
      'inputs: object;',
      'outputs: object;',
      'otelLinkId?: string;',
      'testcaseId?: string;',
    ],
    response:
      '{ id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }',
    markdown:
      "## create\n\n`client.records.create(runId: string, expected: object, inputs: object, outputs: object, otelLinkId?: string, testcaseId?: string): { id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }`\n\n**post** `/runs/{runId}/records`\n\nCreate a new Record in a Run.\n\n### Parameters\n\n- `runId: string`\n\n- `expected: object`\n  The expected outputs for the Testcase.\n\n- `inputs: object`\n  The actual inputs sent to the system, which should match the system's input schema.\n\n- `outputs: object`\n  The actual outputs from the system.\n\n- `otelLinkId?: string`\n  Optional ID for linking this record with an OpenTelemetry trace. Used for deduplication.\n\n- `testcaseId?: string`\n  The ID of the Testcase.\n\n### Returns\n\n- `{ id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }`\n  A record of a system execution in the Scorecard system.\n\n  - `id: string`\n  - `expected: object`\n  - `inputs: object`\n  - `outputs: object`\n  - `runId: string`\n  - `testcaseId?: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst record = await client.records.create('135', {\n  expected: { idealAnswer: 'bar' },\n  inputs: { question: 'bar' },\n  outputs: { response: 'bar' },\n});\n\nconsole.log(record);\n```",
  },
  {
    name: 'list',
    endpoint: '/runs/{runId}/records',
    httpMethod: 'get',
    summary: 'List Records',
    description: 'Retrieve a paginated list of Records for a Run, including all scores for each record.',
    stainlessPath: '(resource) records > (method) list',
    qualified: 'client.records.list',
    params: ['runId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }',
    markdown:
      "## list\n\n`client.records.list(runId: string, cursor?: string, limit?: number): object`\n\n**get** `/runs/{runId}/records`\n\nRetrieve a paginated list of Records for a Run, including all scores for each record.\n\n### Parameters\n\n- `runId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }`\n  A record with all its associated scores.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const recordListResponse of client.records.list('135')) {\n  console.log(recordListResponse);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/records/{recordId}',
    httpMethod: 'delete',
    summary: 'Delete Record',
    description: 'Delete a specific Record by ID.',
    stainlessPath: '(resource) records > (method) delete',
    qualified: 'client.records.delete',
    params: ['recordId: string;'],
    response: '{ success: boolean; }',
    markdown:
      "## delete\n\n`client.records.delete(recordId: string): { success: boolean; }`\n\n**delete** `/records/{recordId}`\n\nDelete a specific Record by ID.\n\n### Parameters\n\n- `recordId: string`\n\n### Returns\n\n- `{ success: boolean; }`\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst record = await client.records.delete('777');\n\nconsole.log(record);\n```",
  },
  {
    name: 'list',
    endpoint: '/records/{recordId}/annotations',
    httpMethod: 'get',
    summary: 'List Annotations',
    description: 'List all annotations (ratings and comments) for a specific Record.',
    stainlessPath: '(resource) records.annotations > (method) list',
    qualified: 'client.records.annotations.list',
    params: ['recordId: string;'],
    response:
      '{ data: { id: string; comment: string; createdAt: string; rating: boolean; recordId: string; spanId: string; userId: string; }[]; }',
    markdown:
      "## list\n\n`client.records.annotations.list(recordId: string): { data: annotation[]; }`\n\n**get** `/records/{recordId}/annotations`\n\nList all annotations (ratings and comments) for a specific Record.\n\n### Parameters\n\n- `recordId: string`\n\n### Returns\n\n- `{ data: { id: string; comment: string; createdAt: string; rating: boolean; recordId: string; spanId: string; userId: string; }[]; }`\n\n  - `data: { id: string; comment: string; createdAt: string; rating: boolean; recordId: string; spanId: string; userId: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst annotations = await client.records.annotations.list('777');\n\nconsole.log(annotations);\n```",
  },
  {
    name: 'upsert',
    endpoint: '/records/{recordId}/scores/{metricConfigId}',
    httpMethod: 'put',
    summary: 'Upsert Score',
    description:
      'Create or update a Score for a given Record and MetricConfig. If a Score with the specified Record ID and MetricConfig ID already exists, it will be updated. Otherwise, a new Score will be created. The score provided should conform to the schema defined by the MetricConfig; otherwise, validation errors will be reported.',
    stainlessPath: '(resource) scores > (method) upsert',
    qualified: 'client.scores.upsert',
    params: ['recordId: string;', 'metricConfigId: string;', 'score: object;'],
    response:
      '{ metricConfigId: string; recordId: string; score: object; validationErrors?: { message: string; path: string; }[]; }',
    markdown:
      "## upsert\n\n`client.scores.upsert(recordId: string, metricConfigId: string, score: object): { metricConfigId: string; recordId: string; score: object; validationErrors?: object[]; }`\n\n**put** `/records/{recordId}/scores/{metricConfigId}`\n\nCreate or update a Score for a given Record and MetricConfig. If a Score with the specified Record ID and MetricConfig ID already exists, it will be updated. Otherwise, a new Score will be created. The score provided should conform to the schema defined by the MetricConfig; otherwise, validation errors will be reported.\n\n### Parameters\n\n- `recordId: string`\n\n- `metricConfigId: string`\n\n- `score: object`\n  The score of the Record, as arbitrary JSON. This data should ideally conform to the output schema defined by the associated MetricConfig. If it doesn't, validation errors will be captured in the `validationErrors` field.\n\n### Returns\n\n- `{ metricConfigId: string; recordId: string; score: object; validationErrors?: { message: string; path: string; }[]; }`\n  A Score represents the evaluation of a Record against a specific MetricConfig. The actual `score` is stored as flexible JSON. While any JSON is accepted, it is expected to conform to the output schema defined by the MetricConfig. Any discrepancies will be noted in the `validationErrors` field, but the Score will still be stored.\n\n  - `metricConfigId: string`\n  - `recordId: string`\n  - `score: object`\n  - `validationErrors?: { message: string; path: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst score = await client.scores.upsert('a1b2c3d4-e5f6-7890-1234-567890abcdef', {\n  recordId: '777',\n  score: { value: 'bar', reasoning: 'bar' },\n});\n\nconsole.log(score);\n```",
  },
  {
    name: 'update',
    endpoint: '/systems/{systemId}',
    httpMethod: 'patch',
    summary: 'Update system',
    description:
      'Update an existing system. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.',
    stainlessPath: '(resource) systems > (method) update',
    qualified: 'client.systems.update',
    params: ['systemId: string;', 'description?: string;', 'name?: string;', 'productionVersionId?: string;'],
    response:
      '{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }',
    markdown:
      "## update\n\n`client.systems.update(systemId: string, description?: string, name?: string, productionVersionId?: string): { id: string; description: string; name: string; productionVersion: system_version; versions: object[]; }`\n\n**patch** `/systems/{systemId}`\n\nUpdate an existing system. Only the fields provided in the request body will be updated.\nIf a field is provided, the new content will replace the existing content.\nIf a field is not provided, the existing content will remain unchanged.\n\n### Parameters\n\n- `systemId: string`\n\n- `description?: string`\n  The description of the system.\n\n- `name?: string`\n  The name of the system. Unique within the project.\n\n- `productionVersionId?: string`\n  The ID of the production version of the system.\n\n### Returns\n\n- `{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }`\n  A System Under Test (SUT).\n\nSystems are templates - to run evaluations, pair them with a SystemVersion that provides specific\nparameter values.\n\n  - `id: string`\n  - `description: string`\n  - `name: string`\n  - `productionVersion: { id: string; config: object; name: string; systemId: string; }`\n  - `versions: { id: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst system = await client.systems.update('12345678-0a8b-4f66-b6f3-2ddcfa097257');\n\nconsole.log(system);\n```",
  },
  {
    name: 'list',
    endpoint: '/projects/{projectId}/systems',
    httpMethod: 'get',
    summary: 'List systems',
    description: 'Retrieve a paginated list of all systems. Systems are ordered by creation date.',
    stainlessPath: '(resource) systems > (method) list',
    qualified: 'client.systems.list',
    params: ['projectId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }',
    markdown:
      "## list\n\n`client.systems.list(projectId: string, cursor?: string, limit?: number): { id: string; description: string; name: string; productionVersion: system_version; versions: object[]; }`\n\n**get** `/projects/{projectId}/systems`\n\nRetrieve a paginated list of all systems. Systems are ordered by creation date.\n\n### Parameters\n\n- `projectId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }`\n  A System Under Test (SUT).\n\nSystems are templates - to run evaluations, pair them with a SystemVersion that provides specific\nparameter values.\n\n  - `id: string`\n  - `description: string`\n  - `name: string`\n  - `productionVersion: { id: string; config: object; name: string; systemId: string; }`\n  - `versions: { id: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const system of client.systems.list('314')) {\n  console.log(system);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/systems/{systemId}',
    httpMethod: 'delete',
    summary: 'Delete system',
    description: 'Delete a system definition by ID. This will not delete associated system versions.',
    stainlessPath: '(resource) systems > (method) delete',
    qualified: 'client.systems.delete',
    params: ['systemId: string;'],
    response: '{ success: boolean; }',
    markdown:
      "## delete\n\n`client.systems.delete(systemId: string): { success: boolean; }`\n\n**delete** `/systems/{systemId}`\n\nDelete a system definition by ID. This will not delete associated system versions.\n\n### Parameters\n\n- `systemId: string`\n\n### Returns\n\n- `{ success: boolean; }`\n\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst system = await client.systems.delete('12345678-0a8b-4f66-b6f3-2ddcfa097257');\n\nconsole.log(system);\n```",
  },
  {
    name: 'get',
    endpoint: '/systems/{systemId}',
    httpMethod: 'get',
    summary: 'Get system',
    description: 'Retrieve a specific system by ID.',
    stainlessPath: '(resource) systems > (method) get',
    qualified: 'client.systems.get',
    params: ['systemId: string;'],
    response:
      '{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }',
    markdown:
      "## get\n\n`client.systems.get(systemId: string): { id: string; description: string; name: string; productionVersion: system_version; versions: object[]; }`\n\n**get** `/systems/{systemId}`\n\nRetrieve a specific system by ID.\n\n### Parameters\n\n- `systemId: string`\n\n### Returns\n\n- `{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }`\n  A System Under Test (SUT).\n\nSystems are templates - to run evaluations, pair them with a SystemVersion that provides specific\nparameter values.\n\n  - `id: string`\n  - `description: string`\n  - `name: string`\n  - `productionVersion: { id: string; config: object; name: string; systemId: string; }`\n  - `versions: { id: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst system = await client.systems.get('12345678-0a8b-4f66-b6f3-2ddcfa097257');\n\nconsole.log(system);\n```",
  },
  {
    name: 'upsert',
    endpoint: '/projects/{projectId}/systems',
    httpMethod: 'post',
    summary: 'Create (upsert) system',
    description:
      'Create a new system. If one with the same name in the project exists, it updates it instead.',
    stainlessPath: '(resource) systems > (method) upsert',
    qualified: 'client.systems.upsert',
    params: ['projectId: string;', 'config: object;', 'description?: string;', 'name?: string;'],
    response:
      '{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }',
    markdown:
      "## upsert\n\n`client.systems.upsert(projectId: string, config: object, description?: string, name?: string): { id: string; description: string; name: string; productionVersion: system_version; versions: object[]; }`\n\n**post** `/projects/{projectId}/systems`\n\nCreate a new system. If one with the same name in the project exists, it updates it instead.\n\n### Parameters\n\n- `projectId: string`\n\n- `config: object`\n  The configuration of the system.\n\n- `description?: string`\n  The description of the system.\n\n- `name?: string`\n  The name of the system. Should be unique within the project. Default is \"Default system\"\n\n### Returns\n\n- `{ id: string; description: string; name: string; productionVersion: { id: string; config: object; name: string; systemId: string; }; versions: { id: string; name: string; }[]; }`\n  A System Under Test (SUT).\n\nSystems are templates - to run evaluations, pair them with a SystemVersion that provides specific\nparameter values.\n\n  - `id: string`\n  - `description: string`\n  - `name: string`\n  - `productionVersion: { id: string; config: object; name: string; systemId: string; }`\n  - `versions: { id: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst system = await client.systems.upsert('314', { config: { temperature: 'bar', maxTokens: 'bar' } });\n\nconsole.log(system);\n```",
  },
  {
    name: 'get',
    endpoint: '/systems/versions/{systemVersionId}',
    httpMethod: 'get',
    summary: 'Get system version',
    description: 'Retrieve a specific system version by ID.',
    stainlessPath: '(resource) systems.versions > (method) get',
    qualified: 'client.systems.versions.get',
    params: ['systemVersionId: string;'],
    response: '{ id: string; config: object; name: string; systemId: string; }',
    markdown:
      "## get\n\n`client.systems.versions.get(systemVersionId: string): { id: string; config: object; name: string; systemId: string; }`\n\n**get** `/systems/versions/{systemVersionId}`\n\nRetrieve a specific system version by ID.\n\n### Parameters\n\n- `systemVersionId: string`\n\n### Returns\n\n- `{ id: string; config: object; name: string; systemId: string; }`\n  A SystemVersion defines the specific settings for a System Under Test.\n\nSystem versions contain parameter values that determine system behavior during evaluation.\nThey are immutable snapshots - once created, they never change.\n\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.\n\n  - `id: string`\n  - `config: object`\n  - `name: string`\n  - `systemId: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst systemVersion = await client.systems.versions.get('87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0');\n\nconsole.log(systemVersion);\n```",
  },
  {
    name: 'upsert',
    endpoint: '/systems/{systemId}/versions',
    httpMethod: 'post',
    summary: 'Upsert system version',
    description:
      "Create a new system version if it does not already exist. Does **not** set the created version to be the system's production version.\n\nIf there is already a system version with the same config, its name will be updated.",
    stainlessPath: '(resource) systems.versions > (method) upsert',
    qualified: 'client.systems.versions.upsert',
    params: ['systemId: string;', 'config: object;', 'name?: string;'],
    response: '{ id: string; config: object; name: string; systemId: string; }',
    markdown:
      "## upsert\n\n`client.systems.versions.upsert(systemId: string, config: object, name?: string): { id: string; config: object; name: string; systemId: string; }`\n\n**post** `/systems/{systemId}/versions`\n\nCreate a new system version if it does not already exist. Does **not** set the created version to be the system's production version.\n\nIf there is already a system version with the same config, its name will be updated.\n\n### Parameters\n\n- `systemId: string`\n\n- `config: object`\n  The configuration of the system version.\n\n- `name?: string`\n  The name of the system version. If creating a new system version and the name isn't provided, it will be autogenerated.\n\n### Returns\n\n- `{ id: string; config: object; name: string; systemId: string; }`\n  A SystemVersion defines the specific settings for a System Under Test.\n\nSystem versions contain parameter values that determine system behavior during evaluation.\nThey are immutable snapshots - once created, they never change.\n\nWhen running evaluations, you reference a specific systemVersionId to establish which system version to test.\n\n  - `id: string`\n  - `config: object`\n  - `name: string`\n  - `systemId: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst systemVersion = await client.systems.versions.upsert('12345678-0a8b-4f66-b6f3-2ddcfa097257', { config: {\n  temperature: 'bar',\n  maxTokens: 'bar',\n  model: 'bar',\n} });\n\nconsole.log(systemVersion);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
