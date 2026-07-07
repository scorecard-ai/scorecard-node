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
    perLanguage: {
      typescript: {
        method: 'client.projects.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst project = await client.projects.create({\n  description: 'This is a test project',\n  name: 'My Project',\n});\n\nconsole.log(project.id);",
      },
      python: {
        method: 'projects.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nproject = client.projects.create(\n    description="This is a test project",\n    name="My Project",\n)\nprint(project.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "description": "This is a test project",\n          "name": "My Project"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.projects.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const project of client.projects.list()) {\n  console.log(project.id);\n}",
      },
      python: {
        method: 'projects.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.projects.list()\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testsets.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const testset of client.testsets.list('314')) {\n  console.log(testset.id);\n}",
      },
      python: {
        method: 'testsets.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.testsets.list(\n    project_id="314",\n)\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/testsets \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testsets.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testset = await client.testsets.create('314', {\n  description: 'Testset for long context Q&A chatbot.',\n  fieldMapping: {\n    inputs: ['question'],\n    expected: ['idealAnswer'],\n    metadata: [],\n  },\n  jsonSchema: {\n    type: 'object',\n    properties: {\n      question: { type: 'string' },\n      idealAnswer: { type: 'string' },\n      provenance: { type: 'string' },\n      geo: { type: 'string' },\n    },\n  },\n  name: 'Long Context Q&A',\n});\n\nconsole.log(testset.id);",
      },
      python: {
        method: 'testsets.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestset = client.testsets.create(\n    project_id="314",\n    description="Testset for long context Q&A chatbot.",\n    field_mapping={\n        "inputs": ["question"],\n        "expected": ["idealAnswer"],\n        "metadata": [],\n    },\n    json_schema={\n        "type": "object",\n        "properties": {\n            "question": {\n                "type": "string"\n            },\n            "idealAnswer": {\n                "type": "string"\n            },\n            "provenance": {\n                "type": "string"\n            },\n            "geo": {\n                "type": "string"\n            },\n        },\n    },\n    name="Long Context Q&A",\n)\nprint(testset.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/testsets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "description": "Testset for long context Q&A chatbot.",\n          "fieldMapping": {\n            "expected": [\n              "idealAnswer"\n            ],\n            "inputs": [\n              "question"\n            ],\n            "metadata": [\n              "string"\n            ]\n          },\n          "jsonSchema": {\n            "type": "bar",\n            "properties": "bar"\n          },\n          "name": "Long Context Q&A"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testsets.get',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testset = await client.testsets.get('246');\n\nconsole.log(testset.id);",
      },
      python: {
        method: 'testsets.get',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestset = client.testsets.get(\n    "246",\n)\nprint(testset.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testsets/$TESTSET_ID \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testsets.update',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testset = await client.testsets.update('246', {\n  description: 'Updated description for the Q&A Testset.',\n  name: 'Updated Q&A Testset',\n});\n\nconsole.log(testset.id);",
      },
      python: {
        method: 'testsets.update',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestset = client.testsets.update(\n    testset_id="246",\n    description="Updated description for the Q&A Testset.",\n    name="Updated Q&A Testset",\n)\nprint(testset.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testsets/$TESTSET_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testsets.delete',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testset = await client.testsets.delete('246');\n\nconsole.log(testset.success);",
      },
      python: {
        method: 'testsets.delete',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestset = client.testsets.delete(\n    "246",\n)\nprint(testset.success)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testsets/$TESTSET_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testcases.get',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testcase = await client.testcases.get('248');\n\nconsole.log(testcase.id);",
      },
      python: {
        method: 'testcases.get',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestcase = client.testcases.get(\n    "248",\n)\nprint(testcase.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testcases/$TESTCASE_ID \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testcases.update',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testcase = await client.testcases.update('248', {\n  jsonData: {\n    question: 'What is the capital of France?',\n    idealAnswer: 'Paris is the capital of France',\n    provenance: 'hand_curated',\n  },\n});\n\nconsole.log(testcase.id);",
      },
      python: {
        method: 'testcases.update',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestcase = client.testcases.update(\n    testcase_id="248",\n    json_data={\n        "question": "What is the capital of France?",\n        "idealAnswer": "Paris is the capital of France",\n        "provenance": "hand_curated",\n    },\n)\nprint(testcase.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testcases/$TESTCASE_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "jsonData": {\n            "question": "bar",\n            "idealAnswer": "bar",\n            "provenance": "bar"\n          }\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testcases.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const testcase of client.testcases.list('246')) {\n  console.log(testcase.id);\n}",
      },
      python: {
        method: 'testcases.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.testcases.list(\n    testset_id="246",\n)\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testsets/$TESTSET_ID/testcases \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testcases.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testcase = await client.testcases.create('246', {\n  items: [\n    {\n      jsonData: {\n        question: 'What is the capital of France?',\n        idealAnswer: 'Paris',\n        provenance: 'hand_curated',\n      },\n    },\n    {\n      jsonData: {\n        question: 'What is the largest planet in our solar system?',\n        idealAnswer: 'Jupiter',\n        provenance: 'synthetic',\n      },\n    },\n    {\n      jsonData: {\n        question: 'How many planets are in our solar system?',\n        idealAnswer: 8,\n        provenance: 'user_feedback',\n      },\n    },\n  ],\n});\n\nconsole.log(testcase.items);",
      },
      python: {
        method: 'testcases.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestcase = client.testcases.create(\n    testset_id="246",\n    items=[{\n        "json_data": {\n            "question": "What is the capital of France?",\n            "idealAnswer": "Paris",\n            "provenance": "hand_curated",\n        }\n    }, {\n        "json_data": {\n            "question": "What is the largest planet in our solar system?",\n            "idealAnswer": "Jupiter",\n            "provenance": "synthetic",\n        }\n    }, {\n        "json_data": {\n            "question": "How many planets are in our solar system?",\n            "idealAnswer": 8,\n            "provenance": "user_feedback",\n        }\n    }],\n)\nprint(testcase.items)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testsets/$TESTSET_ID/testcases \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "jsonData": {\n                "question": "bar",\n                "idealAnswer": "bar",\n                "provenance": "bar"\n              }\n            },\n            {\n              "jsonData": {\n                "question": "bar",\n                "idealAnswer": "bar",\n                "provenance": "bar"\n              }\n            },\n            {\n              "jsonData": {\n                "question": "bar",\n                "idealAnswer": "bar",\n                "provenance": "bar"\n              }\n            }\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.testcases.delete',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst testcase = await client.testcases.delete({ ids: ['123', '124', '125'] });\n\nconsole.log(testcase.success);",
      },
      python: {
        method: 'testcases.delete',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntestcase = client.testcases.delete(\n    ids=["123", "124", "125"],\n)\nprint(testcase.success)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/testcases/bulk-delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "ids": [\n            "123",\n            "124",\n            "125"\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.runs.get',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.runs.get('135');\n\nconsole.log(run.id);",
      },
      python: {
        method: 'runs.get',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nrun = client.runs.get(\n    "135",\n)\nprint(run.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/runs/$RUN_ID \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.runs.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const run of client.runs.list('314')) {\n  console.log(run.id);\n}",
      },
      python: {
        method: 'runs.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.runs.list(\n    project_id="314",\n)\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/runs \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.runs.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.runs.create('314', {\n  metricIds: ['789', '101'],\n  systemVersionId: '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0',\n  testsetId: '246',\n});\n\nconsole.log(run.id);",
      },
      python: {
        method: 'runs.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nrun = client.runs.create(\n    project_id="314",\n    metric_ids=["789", "101"],\n    system_version_id="87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0",\n    testset_id="246",\n)\nprint(run.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/runs \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "metricIds": [\n            "789",\n            "101"\n          ],\n          "systemVersionId": "87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0",\n          "testsetId": "246"\n        }\'',
      },
    },
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
      "## get\n\n`client.metrics.get(metricId: string): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**get** `/metrics/{metricId}`\n\nRetrieve a specific Metric by ID.\n\n### Parameters\n\n- `metricId: string`\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.get('321');\n\nconsole.log(metric);\n```",
    perLanguage: {
      typescript: {
        method: 'client.metrics.get',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst metric = await client.metrics.get('321');\n\nconsole.log(metric);",
      },
      python: {
        method: 'metrics.get',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nmetric = client.metrics.get(\n    "321",\n)\nprint(metric)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/metrics/$METRIC_ID \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
      "## list\n\n`client.metrics.list(projectId: string, cursor?: string, limit?: number): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**get** `/projects/{projectId}/metrics`\n\nList Metrics configured for the specified Project. Metrics are returned in reverse chronological order.\n\n### Parameters\n\n- `projectId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const metric of client.metrics.list('314')) {\n  console.log(metric);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.metrics.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const metric of client.metrics.list('314')) {\n  console.log(metric);\n}",
      },
      python: {
        method: 'metrics.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.metrics.list(\n    project_id="314",\n)\npage = page.data[0]\nprint(page)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/metrics \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
      "## create\n\n`client.metrics.create(projectId: string, body?: { evalType: 'ai'; name: string; outputType: 'int'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'float'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'boolean'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; } | { evalType: 'heuristic'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; }): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**post** `/projects/{projectId}/metrics`\n\nCreate a new Metric for evaluating system outputs. The structure of a metric depends on the evalType and outputType of the metric.\n\n### Parameters\n\n- `projectId: string`\n\n- `body?: { evalType: 'ai'; name: string; outputType: 'int'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'int'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'float'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; passingThreshold?: number; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'heuristic'; name: string; outputType: 'float'; description?: string; guidelines?: string; passingThreshold?: number; } | { evalType: 'ai'; name: string; outputType: 'boolean'; promptTemplate: string; description?: string; evalModelName?: string; guidelines?: string; temperature?: number; } | { evalType: 'human'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; } | { evalType: 'heuristic'; name: string; outputType: 'boolean'; description?: string; guidelines?: string; }`\n  A Metric with AI evaluation and integer output.\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.create('314');\n\nconsole.log(metric);\n```",
    perLanguage: {
      typescript: {
        method: 'client.metrics.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst metric = await client.metrics.create('314', {\n  evalType: 'ai',\n  name: 'Response Accuracy',\n  outputType: 'boolean',\n  promptTemplate:\n    'Please evaluate if the following response is factually accurate: {{outputs.response}}',\n  description: 'Evaluates if the response is factually accurate',\n  evalModelName: 'gpt-4o',\n  guidelines: 'Check if the response contains factually correct information',\n  temperature: 0.1,\n});\n\nconsole.log(metric);",
      },
      python: {
        method: 'metrics.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nmetric = client.metrics.create(\n    project_id="314",\n    eval_type="ai",\n    name="Response Accuracy",\n    output_type="boolean",\n    prompt_template="Please evaluate if the following response is factually accurate: {{outputs.response}}",\n    description="Evaluates if the response is factually accurate",\n    eval_model_name="gpt-4o",\n    guidelines="Check if the response contains factually correct information",\n    temperature=0.1,\n)\nprint(metric)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/metrics \\\n    -X POST \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
      "## update\n\n`client.metrics.update(metricId: string, body?: { evalType: 'ai'; outputType: 'int'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'float'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'boolean'; description?: string; evalModelName?: string; guidelines?: string; name?: string; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; } | { evalType: 'heuristic'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; }): { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n\n**patch** `/metrics/{metricId}`\n\nUpdate an existing Metric. You must specify the evalType and outputType of the metric. The structure of a metric depends on the evalType and outputType of the metric.\n\n### Parameters\n\n- `metricId: string`\n\n- `body?: { evalType: 'ai'; outputType: 'int'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'int'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'float'; description?: string; evalModelName?: string; guidelines?: string; name?: string; passingThreshold?: number; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'heuristic'; outputType: 'float'; description?: string; guidelines?: string; name?: string; passingThreshold?: number; } | { evalType: 'ai'; outputType: 'boolean'; description?: string; evalModelName?: string; guidelines?: string; name?: string; promptTemplate?: string; temperature?: number; } | { evalType: 'human'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; } | { evalType: 'heuristic'; outputType: 'boolean'; description?: string; guidelines?: string; name?: string; }`\n  A Metric with AI evaluation and integer output.\n\n### Returns\n\n- `{ id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'int'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'float'; passingThreshold: number; } | { id: string; description: string; evalModelName: string; evalType: 'ai'; guidelines: string; name: string; outputType: 'boolean'; promptTemplate: string; temperature?: number; } | { id: string; description: string; evalType: 'human'; guidelines: string; name: string; outputType: 'boolean'; } | { id: string; description: string; evalType: 'heuristic'; guidelines: string; name: string; outputType: 'boolean'; }`\n  A Metric defines how to evaluate system outputs against expected results.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst metric = await client.metrics.update('321');\n\nconsole.log(metric);\n```",
    perLanguage: {
      typescript: {
        method: 'client.metrics.update',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst metric = await client.metrics.update('321', {\n  evalType: 'ai',\n  outputType: 'boolean',\n  promptTemplate:\n    'Using the following guidelines, evaluate the response: {{ guidelines }}\\n\\nResponse: {{ outputs.response }}\\n\\nIdeal answer: {{ expected.idealResponse }}',\n});\n\nconsole.log(metric);",
      },
      python: {
        method: 'metrics.update',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nmetric = client.metrics.update(\n    metric_id="321",\n    eval_type="ai",\n    output_type="boolean",\n    prompt_template="Using the following guidelines, evaluate the response: {{ guidelines }}\\n\\nResponse: {{ outputs.response }}\\n\\nIdeal answer: {{ expected.idealResponse }}",\n)\nprint(metric)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/metrics/$METRIC_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.metrics.delete',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst metric = await client.metrics.delete('321');\n\nconsole.log(metric.success);",
      },
      python: {
        method: 'metrics.delete',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nmetric = client.metrics.delete(\n    "321",\n)\nprint(metric.success)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/metrics/$METRIC_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.records.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst record = await client.records.create('135', {\n  expected: { idealAnswer: 'Paris is the capital of France' },\n  inputs: { question: 'What is the capital of France?' },\n  outputs: { response: 'The capital of France is Paris.' },\n  testcaseId: '248',\n});\n\nconsole.log(record.id);",
      },
      python: {
        method: 'records.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nrecord = client.records.create(\n    run_id="135",\n    expected={\n        "idealAnswer": "Paris is the capital of France"\n    },\n    inputs={\n        "question": "What is the capital of France?"\n    },\n    outputs={\n        "response": "The capital of France is Paris."\n    },\n    testcase_id="248",\n)\nprint(record.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/runs/$RUN_ID/records \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "expected": {\n            "idealAnswer": "bar"\n          },\n          "inputs": {\n            "question": "bar"\n          },\n          "outputs": {\n            "response": "bar"\n          },\n          "testcaseId": "248"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/runs/{runId}/records',
    httpMethod: 'get',
    summary: 'List Records',
    description: 'Retrieve a paginated list of Records for a Run, including all scores for each record.',
    stainlessPath: '(resource) records > (method) list',
    qualified: 'client.records.list',
    params: ['runId: string;', 'cursor?: string;', 'limit?: number;', 'tags?: string[];'],
    response:
      '{ id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }',
    markdown:
      "## list\n\n`client.records.list(runId: string, cursor?: string, limit?: number, tags?: string[]): object`\n\n**get** `/runs/{runId}/records`\n\nRetrieve a paginated list of Records for a Run, including all scores for each record.\n\n### Parameters\n\n- `runId: string`\n\n- `cursor?: string`\n  Cursor for pagination. Pass the `nextCursor` from the previous response to get the next page of results.\n\n- `limit?: number`\n  Maximum number of items to return (1-100). Use with `cursor` for pagination through large sets.\n\n- `tags?: string[]`\n  Filter to records carrying every listed tag (repeatable, AND semantics). E.g. `?tags=urgent&tags=regression`.\n\n### Returns\n\n- `{ id: string; expected: object; inputs: object; outputs: object; runId: string; testcaseId?: string; }`\n  A record with all its associated scores.\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\n// Automatically fetches more pages as needed.\nfor await (const recordListResponse of client.records.list('135')) {\n  console.log(recordListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.records.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const recordListResponse of client.records.list('135')) {\n  console.log(recordListResponse);\n}",
      },
      python: {
        method: 'records.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.records.list(\n    run_id="135",\n)\npage = page.data[0]\nprint(page)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/runs/$RUN_ID/records \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.records.delete',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst record = await client.records.delete('777');\n\nconsole.log(record.success);",
      },
      python: {
        method: 'records.delete',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nrecord = client.records.delete(\n    "777",\n)\nprint(record.success)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/records/$RECORD_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.records.annotations.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst annotations = await client.records.annotations.list('777');\n\nconsole.log(annotations.data);",
      },
      python: {
        method: 'records.annotations.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nannotations = client.records.annotations.list(\n    "777",\n)\nprint(annotations.data)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/records/$RECORD_ID/annotations \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/records/{recordId}/tags',
    httpMethod: 'get',
    summary: 'List Record Tags',
    description: 'List all tags applied to a specific Record.',
    stainlessPath: '(resource) records.tags > (method) list',
    qualified: 'client.records.tags.list',
    params: ['recordId: string;'],
    response:
      "{ data: { id: string; createdAt: string; recordId: string; source: 'user' | 'otel'; text: string; userId: string; }[]; }",
    markdown:
      "## list\n\n`client.records.tags.list(recordId: string): { data: record_tag[]; }`\n\n**get** `/records/{recordId}/tags`\n\nList all tags applied to a specific Record.\n\n### Parameters\n\n- `recordId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; recordId: string; source: 'user' | 'otel'; text: string; userId: string; }[]; }`\n\n  - `data: { id: string; createdAt: string; recordId: string; source: 'user' | 'otel'; text: string; userId: string; }[]`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst tags = await client.records.tags.list('777');\n\nconsole.log(tags);\n```",
    perLanguage: {
      typescript: {
        method: 'client.records.tags.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst tags = await client.records.tags.list('777');\n\nconsole.log(tags.data);",
      },
      python: {
        method: 'records.tags.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntags = client.records.tags.list(\n    "777",\n)\nprint(tags.data)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/records/$RECORD_ID/tags \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/records/{recordId}/tags',
    httpMethod: 'post',
    summary: 'Create Record Tag',
    description: 'Apply a tag to a Record. Idempotent: re-applying an existing tag returns the existing tag.',
    stainlessPath: '(resource) records.tags > (method) create',
    qualified: 'client.records.tags.create',
    params: ['recordId: string;', 'text: string;'],
    response:
      "{ id: string; createdAt: string; recordId: string; source: 'user' | 'otel'; text: string; userId: string; }",
    markdown:
      "## create\n\n`client.records.tags.create(recordId: string, text: string): { id: string; createdAt: string; recordId: string; source: 'user' | 'otel'; text: string; userId: string; }`\n\n**post** `/records/{recordId}/tags`\n\nApply a tag to a Record. Idempotent: re-applying an existing tag returns the existing tag.\n\n### Parameters\n\n- `recordId: string`\n\n- `text: string`\n  The tag text to apply. Idempotent: re-applying an existing tag is a no-op.\n\n### Returns\n\n- `{ id: string; createdAt: string; recordId: string; source: 'user' | 'otel'; text: string; userId: string; }`\n  An arbitrary tag applied to a Record (e.g. `urgent`, `regression`, `env:prod`), either by a user or lifted from OTel span attributes at ingest.\n\n  - `id: string`\n  - `createdAt: string`\n  - `recordId: string`\n  - `source: 'user' | 'otel'`\n  - `text: string`\n  - `userId: string`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst recordTag = await client.records.tags.create('777', { text: 'urgent' });\n\nconsole.log(recordTag);\n```",
    perLanguage: {
      typescript: {
        method: 'client.records.tags.create',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst recordTag = await client.records.tags.create('777', { text: 'urgent' });\n\nconsole.log(recordTag.id);",
      },
      python: {
        method: 'records.tags.create',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nrecord_tag = client.records.tags.create(\n    record_id="777",\n    text="urgent",\n)\nprint(record_tag.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/records/$RECORD_ID/tags \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "text": "urgent"\n        }\'',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/records/{recordId}/tags/{text}',
    httpMethod: 'delete',
    summary: 'Delete Record Tag',
    description: 'Remove a tag from a Record by its text.',
    stainlessPath: '(resource) records.tags > (method) delete',
    qualified: 'client.records.tags.delete',
    params: ['recordId: string;', 'text: string;'],
    response: '{ deleted: number; }',
    markdown:
      "## delete\n\n`client.records.tags.delete(recordId: string, text: string): { deleted: number; }`\n\n**delete** `/records/{recordId}/tags/{text}`\n\nRemove a tag from a Record by its text.\n\n### Parameters\n\n- `recordId: string`\n\n- `text: string`\n\n### Returns\n\n- `{ deleted: number; }`\n\n  - `deleted: number`\n\n### Example\n\n```typescript\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard();\n\nconst tag = await client.records.tags.delete('urgent', { recordId: '777' });\n\nconsole.log(tag);\n```",
    perLanguage: {
      typescript: {
        method: 'client.records.tags.delete',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst tag = await client.records.tags.delete('urgent', { recordId: '777' });\n\nconsole.log(tag.deleted);",
      },
      python: {
        method: 'records.tags.delete',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\ntag = client.records.tags.delete(\n    text="urgent",\n    record_id="777",\n)\nprint(tag.deleted)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/records/$RECORD_ID/tags/$TEXT \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.scores.upsert',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst score = await client.scores.upsert('a1b2c3d4-e5f6-7890-1234-567890abcdef', {\n  recordId: '777',\n  score: { value: true, reasoning: 'The response is correct' },\n});\n\nconsole.log(score.validationErrors);",
      },
      python: {
        method: 'scores.upsert',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nscore = client.scores.upsert(\n    metric_config_id="a1b2c3d4-e5f6-7890-1234-567890abcdef",\n    record_id="777",\n    score={\n        "value": True,\n        "reasoning": "The response is correct",\n    },\n)\nprint(score.validation_errors)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/records/$RECORD_ID/scores/$METRIC_CONFIG_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "score": {\n            "value": "bar",\n            "reasoning": "bar"\n          }\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.list',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const system of client.systems.list('314')) {\n  console.log(system.id);\n}",
      },
      python: {
        method: 'systems.list',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\npage = client.systems.list(\n    project_id="314",\n)\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/systems \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.get',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst system = await client.systems.get('12345678-0a8b-4f66-b6f3-2ddcfa097257');\n\nconsole.log(system.id);",
      },
      python: {
        method: 'systems.get',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nsystem = client.systems.get(\n    "12345678-0a8b-4f66-b6f3-2ddcfa097257",\n)\nprint(system.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/systems/$SYSTEM_ID \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.upsert',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst system = await client.systems.upsert('314', {\n  config: { temperature: 0.1, maxTokens: 1024 },\n  description: 'Production chatbot powered by GPT-4',\n  name: 'GPT-4 Chatbot',\n});\n\nconsole.log(system.id);",
      },
      python: {
        method: 'systems.upsert',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nsystem = client.systems.upsert(\n    project_id="314",\n    config={\n        "temperature": 0.1,\n        "maxTokens": 1024,\n    },\n    description="Production chatbot powered by GPT-4",\n    name="GPT-4 Chatbot",\n)\nprint(system.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/projects/$PROJECT_ID/systems \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "config": {\n            "temperature": "bar",\n            "maxTokens": "bar"\n          },\n          "description": "Production chatbot powered by GPT-4",\n          "name": "GPT-4 Chatbot"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.update',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst system = await client.systems.update('12345678-0a8b-4f66-b6f3-2ddcfa097257', {\n  productionVersionId: '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf3',\n});\n\nconsole.log(system.id);",
      },
      python: {
        method: 'systems.update',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nsystem = client.systems.update(\n    system_id="12345678-0a8b-4f66-b6f3-2ddcfa097257",\n    production_version_id="87654321-4d3b-4ae4-8c7a-4b6e2a19ccf3",\n)\nprint(system.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/systems/$SYSTEM_ID \\\n    -X PATCH \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.delete',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst system = await client.systems.delete('12345678-0a8b-4f66-b6f3-2ddcfa097257');\n\nconsole.log(system.success);",
      },
      python: {
        method: 'systems.delete',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nsystem = client.systems.delete(\n    "12345678-0a8b-4f66-b6f3-2ddcfa097257",\n)\nprint(system.success)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/systems/$SYSTEM_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.versions.get',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst systemVersion = await client.systems.versions.get('87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0');\n\nconsole.log(systemVersion.id);",
      },
      python: {
        method: 'systems.versions.get',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nsystem_version = client.systems.versions.get(\n    "87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0",\n)\nprint(system_version.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/systems/versions/$SYSTEM_VERSION_ID \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.systems.versions.upsert',
        example:
          "import Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n});\n\nconst systemVersion = await client.systems.versions.upsert('12345678-0a8b-4f66-b6f3-2ddcfa097257', {\n  config: {\n    temperature: 0.5,\n    maxTokens: 1024,\n    model: 'gemini-2.0-flash',\n  },\n  name: 'Test model: Gemini',\n});\n\nconsole.log(systemVersion.id);",
      },
      python: {
        method: 'systems.versions.upsert',
        example:
          'import os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n)\nsystem_version = client.systems.versions.upsert(\n    system_id="12345678-0a8b-4f66-b6f3-2ddcfa097257",\n    config={\n        "temperature": 0.5,\n        "maxTokens": 1024,\n        "model": "gemini-2.0-flash",\n    },\n    name="Test model: Gemini",\n)\nprint(system_version.id)',
      },
      http: {
        example:
          'curl https://api2.scorecard.io/api/v2/systems/$SYSTEM_ID/versions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SCORECARD_API_KEY" \\\n    -d \'{\n          "config": {\n            "temperature": "bar",\n            "maxTokens": "bar",\n            "model": "bar"\n          },\n          "name": "Test model: Gemini"\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Scorecard Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/scorecard-ai.svg?label=pypi%20(stable))](https://pypi.org/project/scorecard-ai/)\n\nThe Scorecard Python library provides convenient access to the Scorecard REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Scorecard MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=scorecard-ai-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInNjb3JlY2FyZC1haS1tY3AiXSwiZW52Ijp7IlNDT1JFQ0FSRF9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22scorecard-ai-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22scorecard-ai-mcp%22%5D%2C%22env%22%3A%7B%22SCORECARD_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.scorecard.io](https://docs.scorecard.io/api-reference/overview). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install scorecard-ai\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n    # or \'production\' | \'local\'; defaults to "production".\n    environment="staging",\n)\n\nrun = client.runs.create(\n    project_id="314",\n    metric_ids=["789", "101"],\n    testset_id="246",\n)\nprint(run.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `SCORECARD_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncScorecard` instead of `Scorecard` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom scorecard_ai import AsyncScorecard\n\nclient = AsyncScorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n    # or \'production\' | \'local\'; defaults to "production".\n    environment="staging",\n)\n\nasync def main() -> None:\n  run = await client.runs.create(\n      project_id="314",\n      metric_ids=["789", "101"],\n      testset_id="246",\n  )\n  print(run.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install scorecard-ai[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom scorecard_ai import DefaultAioHttpClient\nfrom scorecard_ai import AsyncScorecard\n\nasync def main() -> None:\n  async with AsyncScorecard(\n    api_key=os.environ.get("SCORECARD_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    run = await client.runs.create(\n        project_id="314",\n        metric_ids=["789", "101"],\n        testset_id="246",\n    )\n    print(run.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Scorecard API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard()\n\nall_testcases = []\n# Automatically fetches more pages as needed.\nfor testcase in client.testcases.list(\n    testset_id="246",\n    limit=30,\n):\n    # Do something with testcase here\n    all_testcases.append(testcase)\nprint(all_testcases)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom scorecard_ai import AsyncScorecard\n\nclient = AsyncScorecard()\n\nasync def main() -> None:\n    all_testcases = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for testcase in client.testcases.list(\n    testset_id="246",\n    limit=30,\n):\n        all_testcases.append(testcase)\n    print(all_testcases)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.testcases.list(\n    testset_id="246",\n    limit=30,\n)\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.data)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.testcases.list(\n    testset_id="246",\n    limit=30,\n)\n\nprint(f"next page cursor: {first_page.next_cursor}") # => "next page cursor: ..."\nfor testcase in first_page.data:\n    print(testcase.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard()\n\ntestset = client.testsets.create(\n    project_id="314",\n    description="Testset for long context Q&A chatbot.",\n    field_mapping={\n        "expected": ["idealAnswer"],\n        "inputs": ["question"],\n        "metadata": ["string"],\n    },\n    json_schema={\n        "type": "bar",\n        "properties": "bar",\n    },\n    name="Long Context Q&A",\n)\nprint(testset.field_mapping)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `scorecard_ai.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `scorecard_ai.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `scorecard_ai.APIError`.\n\n```python\nimport scorecard_ai\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard()\n\ntry:\n    client.testsets.get(\n        "246",\n    )\nexcept scorecard_ai.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept scorecard_ai.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept scorecard_ai.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom scorecard_ai import Scorecard\n\n# Configure the default for all requests:\nclient = Scorecard(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).testsets.get(\n    "246",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom scorecard_ai import Scorecard\n\n# Configure the default for all requests:\nclient = Scorecard(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Scorecard(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).testsets.get(\n    "246",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `SCORECARD_LOG` to `info`.\n\n```shell\n$ export SCORECARD_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom scorecard_ai import Scorecard\n\nclient = Scorecard()\nresponse = client.testsets.with_raw_response.get(\n    "246",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ntestset = response.parse()  # get the object that `testsets.get()` would have returned\nprint(testset.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/scorecard-ai/scorecard-python/tree/main/src/scorecard_ai/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/scorecard-ai/scorecard-python/tree/main/src/scorecard_ai/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.testsets.with_streaming_response.get(\n    "246",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom scorecard_ai import Scorecard, DefaultHttpxClient\n\nclient = Scorecard(\n    # Or use the `SCORECARD_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom scorecard_ai import Scorecard\n\nwith Scorecard() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/scorecard-ai/scorecard-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport scorecard_ai\nprint(scorecard_ai.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Scorecard TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/scorecard-ai.svg?label=npm%20(stable))](https://npmjs.org/package/scorecard-ai) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/scorecard-ai)\n\nThis library provides convenient access to the Scorecard REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.scorecard.io](https://docs.scorecard.io/api-reference/overview). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Scorecard MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=scorecard-ai-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInNjb3JlY2FyZC1haS1tY3AiXSwiZW52Ijp7IlNDT1JFQ0FSRF9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22scorecard-ai-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22scorecard-ai-mcp%22%5D%2C%22env%22%3A%7B%22SCORECARD_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install scorecard-ai\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n  environment: 'staging', // or 'production' | 'local'; defaults to 'production'\n});\n\nconst run = await client.runs.create('314', { metricIds: ['789', '101'], testsetId: '246' });\n\nconsole.log(run.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  apiKey: process.env['SCORECARD_API_KEY'], // This is the default and can be omitted\n  environment: 'staging', // or 'production' | 'local'; defaults to 'production'\n});\n\nconst testset: Scorecard.Testset = await client.testsets.get('246');\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst testset = await client.testsets.get('246').catch(async (err) => {\n  if (err instanceof Scorecard.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Scorecard({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.testsets.get('246', {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Scorecard({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.testsets.get('246', {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Scorecard API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllTestcases(params) {\n  const allTestcases = [];\n  // Automatically fetches more pages as needed.\n  for await (const testcase of client.testcases.list('246', { limit: 30 })) {\n    allTestcases.push(testcase);\n  }\n  return allTestcases;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.testcases.list('246', { limit: 30 });\nfor (const testcase of page.data) {\n  console.log(testcase);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Scorecard();\n\nconst response = await client.testsets.get('246').asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: testset, response: raw } = await client.testsets.get('246').withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(testset.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `SCORECARD_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Scorecard from 'scorecard-ai';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Scorecard({\n  logger: logger.child({ name: 'Scorecard' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.runs.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Scorecard from 'scorecard-ai';\nimport fetch from 'my-fetch';\n\nconst client = new Scorecard({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Scorecard from 'scorecard-ai';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Scorecard({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Scorecard from 'scorecard-ai';\n\nconst client = new Scorecard({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Scorecard from 'npm:scorecard-ai';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Scorecard({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/scorecard-ai/scorecard-node/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

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
