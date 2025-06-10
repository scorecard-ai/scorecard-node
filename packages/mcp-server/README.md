# Scorecard TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export SCORECARD_API_KEY="My API Key"
export SCORECARD_ENVIRONMENT="production"
npx -y scorecard-ai-mcp@latest
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
      "args": ["-y", "scorecard-ai-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "SCORECARD_API_KEY": "My API Key",
        "SCORECARD_ENVIRONMENT": "production"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "scorecard-ai-mcp/server";

// import a specific tool
import createProjects from "scorecard-ai-mcp/tools/projects/create-projects";

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
init({ server: myServer, endpoints: [createProjects, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `projects`:

- `create_projects` (`write`): Create a new Project.
- `list_projects` (`read`): Retrieve a paginated list of all Projects. Projects are ordered by creation date, with oldest Projects first.

### Resource `testsets`:

- `create_testsets` (`write`): Create a new Testset for a Project. The Testset will be created in the Project specified in the path.
- `update_testsets` (`write`): Update a Testset. Only the fields provided in the request body will be updated.
  If a field is provided, the new content will replace the existing content.
  If a field is not provided, the existing content will remain unchanged.

  When updating the schema:

  - If field mappings are not provided and existing mappings reference fields that no longer exist, those mappings will be automatically removed
  - To preserve all existing mappings, ensure all referenced fields remain in the updated schema
  - For complete control, provide both schema and fieldMapping when updating the schema

- `list_testsets` (`read`): Retrieve a paginated list of Testsets belonging to a Project.
- `delete_testsets` (`write`): Delete Testset
- `get_testsets` (`read`): Get Testset

### Resource `testcases`:

- `create_testcases` (`write`): Create multiple Testcases in the specified Testset.
- `update_testcases` (`write`): Replace the data of an existing Testcase while keeping its ID.
- `list_testcases` (`read`): Retrieve a paginated list of Testcases belonging to a Testset.
- `delete_testcases` (`write`): Delete multiple Testcases by their IDs.
- `get_testcases` (`read`): Retrieve a specific Testcase by ID.

### Resource `runs`:

- `create_runs` (`write`): Create a new Run.

### Resource `metrics`:

- `create_metrics` (`write`): Create a new Metric for evaluating system outputs.

### Resource `records`:

- `create_records` (`write`): Create a new Record in a Run.

### Resource `scores`:

- `upsert_scores` (`write`): Create or update a Score for a given Record and MetricConfig. If a Score with the specified Record ID and MetricConfig ID already exists, it will be updated. Otherwise, a new Score will be created. The score provided should conform to the schema defined by the MetricConfig; otherwise, validation errors will be reported.

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

- `list_systems` (`read`): Retrieve a paginated list of all systems. Systems are ordered by creation date.
- `delete_systems` (`write`): Delete a system definition by ID. This will not delete associated system versions.
- `get_systems` (`read`): Retrieve a specific system by ID.

### Resource `systems.versions`:

- `create_systems_versions` (`write`): Create a new version for a system.

  Each version contains specific parameter values that match the system's `configSchema` - things like model parameters, thresholds, or processing options.
  Once created, versions cannot be modified, ensuring stable reference points for evaluations.

  When creating a system version:

  - The `config` object is validated against the parent system's `configSchema`.
  - System versions with validation errors are still stored, with errors included in the response.
  - Validation errors indicate fields that don't match the schema but don't prevent creation.
  - Having validation errors may affect how some evaluation metrics are calculated.

- `list_systems_versions` (`read`): Retrieve a paginated list of system versions for a specific system.

  System versions provide concrete parameter values for a System Under Test, defining exactly how the system should be configured during an evaluation run.

- `get_systems_versions` (`read`): Retrieve a specific system version by ID.
