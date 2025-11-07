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

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=scorecard-ai-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInNjb3JlY2FyZC1haS1tY3AiXSwiZW52Ijp7IlNDT1JFQ0FSRF9BUElfS0VZIjoiU2V0IHlvdXIgU0NPUkVDQVJEX0FQSV9LRVkgaGVyZS4ifX0)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22scorecard-ai-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22scorecard-ai-mcp%22%5D%2C%22env%22%3A%7B%22SCORECARD_API_KEY%22%3A%22Set%20your%20SCORECARD_API_KEY%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio scorecard_ai_api --env SCORECARD_API_KEY="Your SCORECARD_API_KEY here." -- npx -y scorecard-ai-mcp
```

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

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

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

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

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| --------------------- | ------------------------ | --------------- |
| `x-scorecard-api-key` | `apiKey` | ApiKeyAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "scorecard_ai_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
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
- `list_runs` (`read`): Retrieve a paginated list of all Runs for a Project. Runs are ordered by creation date, most recent first.
- `get_runs` (`read`): Retrieve a specific Run by ID.

### Resource `metrics`:

- `create_metrics` (`write`): Create a new Metric for evaluating system outputs. The structure of a metric depends on the evalType and outputType of the metric.
- `update_metrics` (`write`): Update an existing Metric. You must specify the evalType and outputType of the metric. The structure of a metric depends on the evalType and outputType of the metric.
- `list_metrics` (`read`): List Metrics configured for the specified Project. Metrics are returned in reverse chronological order.
- `get_metrics` (`read`): Retrieve a specific Metric by ID.

### Resource `records`:

- `create_records` (`write`): Create a new Record in a Run.
- `list_records` (`read`): Retrieve a paginated list of Records for a Run, including all scores for each record.
- `delete_records` (`write`): Delete a specific Record by ID.

### Resource `scores`:

- `upsert_scores` (`write`): Create or update a Score for a given Record and MetricConfig. If a Score with the specified Record ID and MetricConfig ID already exists, it will be updated. Otherwise, a new Score will be created. The score provided should conform to the schema defined by the MetricConfig; otherwise, validation errors will be reported.

### Resource `systems`:

- `update_systems` (`write`): Update an existing system. Only the fields provided in the request body will be updated.
  If a field is provided, the new content will replace the existing content.
  If a field is not provided, the existing content will remain unchanged.
- `list_systems` (`read`): Retrieve a paginated list of all systems. Systems are ordered by creation date.
- `delete_systems` (`write`): Delete a system definition by ID. This will not delete associated system versions.
- `get_systems` (`read`): Retrieve a specific system by ID.
- `upsert_systems` (`write`): Create a new system. If one with the same name in the project exists, it updates it instead.

### Resource `systems.versions`:

- `get_systems_versions` (`read`): Retrieve a specific system version by ID.
- `upsert_systems_versions` (`write`): Create a new system version if it does not already exist. Does **not** set the created version to be the system's production version.

  If there is already a system version with the same config, its name will be updated.
