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
      "args": ["-y", "scorecard-ai-mcp"],
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
claude mcp add scorecard_ai_mcp_api --env SCORECARD_API_KEY="Your SCORECARD_API_KEY here." -- npx -y scorecard-ai-mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

## Usage Examples

Below are examples of prompts you can give to an AI assistant with this MCP server configured.

### Example 1: Search Documentation

**Prompt:**
> "How do I create a testset using the Scorecard TypeScript SDK?"

**Tool Called:** `search_docs`
```json
{
  "query": "create testset",
  "language": "typescript"
}
```

The assistant searches SDK documentation and returns relevant code examples and API references.

---

### Example 2: List Projects and Testsets

**Prompt:**
> "List all my Scorecard projects and their testsets."

**Tool Called:** `execute`
```javascript
async function run(client) {
  for await (const project of client.projects.list()) {
    console.log(`Project: ${project.id} - ${project.name}`);
    for await (const testset of client.testsets.list(project.id)) {
      console.log(`  Testset: ${testset.id} - ${testset.name}`);
    }
  }
}
```

---

### Example 3: Create an Evaluation Run

**Prompt:**
> "Create a new evaluation run for project '314' with testset '246' and metrics '789' and '101'."

**Tool Called:** `execute`
```javascript
async function run(client) {
  const run = await client.runs.create('314', {
    testsetId: '246',
    metricIds: ['789', '101']
  });
  console.log('Run created:', run.id);
  console.log('View at:', run.url);
  return run;
}
```

---

For more SDK code examples, see the [examples directory](https://github.com/scorecard-ai/scorecard-node/tree/main/examples).

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

## Privacy & Data Handling

This MCP server transmits data to external services to provide its functionality. By using this server, you acknowledge the following:

### Data Transmitted

- **Code Execution (`execute` tool):** When you use the `execute` tool, the code you provide is sent to the Stainless API (`api.stainless.com`) for execution in a sandboxed environment. Your Scorecard API key is also transmitted to authenticate requests made by the executed code.

- **Documentation Search (`search_docs` tool):** Search queries are sent to the Stainless API to retrieve relevant SDK documentation.

### API Credentials

- Your `SCORECARD_API_KEY` is transmitted to the Stainless code execution sandbox to allow the executed code to make authenticated requests to the Scorecard API.
- API keys are sent over HTTPS and are not logged by this MCP server.

### Data Retention

- This MCP server does not store or log any user data, code, or API responses locally.
- Data retention on Stainless infrastructure is governed by [Stainless's privacy policy](https://www.stainless.com/privacy).
- Data retention for Scorecard API requests is governed by [Scorecard's privacy policy](https://www.scorecard.io/privacy).

### Security Recommendations

- Use environment variables to provide API keys rather than hardcoding them.
- When running the server remotely, ensure TLS is enabled and use OAuth 2.0 or secure token-based authentication.
- Rotate API keys periodically and revoke unused keys.

### Contact

For security concerns, contact [security@stainless.com](mailto:security@stainless.com) or [team@scorecard.io](mailto:team@scorecard.io).
