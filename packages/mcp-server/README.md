# Scorecard TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export SCORECARD_API_KEY="My Bearer Token"
npx -y scorecard-ai-mcp
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "scorecard_ai_api": {
      "command": "npx",
      "args": ["-y", "scorecard-ai-mcp"],
      "env": {
        "SCORECARD_API_KEY": "My Bearer Token"
      }
    }
  }
}
```

## Filtering tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "scorecard-ai-mcp/server";

// import a specific tool
import listProjects from "scorecard-ai-mcp/tools/projects/list-projects";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [listProjects, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `projects`:

- `list_projects` (`read`): Retrieve a paginated list of all projects. Projects are ordered by creation date, with oldest projects first.

### Resource `testsets`:

- `create_testsets` (`write`): Create a new testset for a project. The testset will be created in the project specified in the path.
- `update_testsets` (`write`): Update a testset. Only the fields provided in the request body will be updated.
  If a field is provided, the new content will replace the existing content.
  If a field is not provided, the existing content will remain unchanged.

When updating the schema:

- If field mappings are not provided and existing mappings reference fields that no longer exist, those mappings will be automatically removed
- To preserve all existing mappings, ensure all referenced fields remain in the updated schema
- For complete control, provide both schema and fieldMapping when updating the schema

* `list_testsets` (`read`): Retrieve a paginated list of testsets belonging to a project.
* `delete_testsets` (`write`): Delete testset
* `get_testsets` (`read`): Get testset by ID

### Resource `testcases`:

- `create_testcases` (`write`): Create multiple testcases in the specified testset.
- `update_testcases` (`write`): Replace the data of an existing testcase while keeping its ID.
- `list_testcases` (`read`): Retrieve a paginated list of testcases belonging to a testset.
- `delete_testcases` (`write`): Delete multiple testcases by their IDs.
- `get_testcases` (`read`): Retrieve a specific testcase by ID.

### Resource `runs`:

- `create_runs` (`write`): Create a new run.

### Resource `execution_records`:

- `create_execution_records` (`write`): Create a new execution record.

### Resource `systems`:

- `create_systems` (`write`): Create a new system definition that specifies the interface contracts for a component you want to evaluate.

A system acts as a template that defines three key contracts through JSON Schemas:

1. Input Schema: What data your system accepts (e.g., user queries, context documents)
2. Output Schema: What data your system produces (e.g., responses, confidence scores)
3. Config Schema: What parameters can be adjusted (e.g., model selection, temperature)

This separation lets you evaluate any system as a black box, focusing on its interface rather than implementation details.

- `update_systems` (`write`): Update an existing system definition. Only the fields provided in the request body will be updated.
  If a field is provided, the new content will replace the existing content.
  If a field is not provided, the existing content will remain unchanged.

When updating schemas:

- The system will accept your changes regardless of compatibility with existing configurations
- Schema updates won't invalidate existing evaluations or configurations
- For significant redesigns, creating a new system definition provides a cleaner separation

* `list_systems` (`read`): Retrieve a paginated list of all systems. Systems are ordered by creation date.
* `delete_systems` (`write`): Delete a system definition by ID. This will not delete associated system configurations.
* `get_systems` (`read`): Retrieve a specific system by ID.

### Resource `system_configs`:

- `create_system_configs` (`write`): Create a new configuration for a system.

Each configuration contains specific parameter values that match the system's configSchema - things like model parameters, thresholds, or processing options.
Once created, configurations cannot be modified, ensuring stable reference points for evaluations.

When creating a configuration:

- The 'config' object is validated against the parent system's configSchema
- Configurations with validation errors are still stored, with errors included in the response
- Validation errors indicate fields that don't match the schema but don't prevent creation
- Having validation errors may affect how some evaluation metrics are calculated

* `list_system_configs` (`read`): Retrieve a paginated list of configurations for a specific system.

System configurations provide concrete parameter values for a System Under Test, defining exactly how the system should be configured during an evaluation run.

- `get_system_configs` (`read`): Retrieve a specific system configuration by ID.
