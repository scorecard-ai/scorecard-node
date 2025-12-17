# Scorecard Node.js SDK Examples

## Setup

1. **Install dependencies** (if not already done):

```bash
cd /path/to/scorecard-node

# Build the SDK first
yarn install
yarn build

# Install example dependencies
cd examples
yarn install
```

2. **Set environment variables**:

```bash
# Required
export SCORECARD_API_KEY="ak_..."

# For OpenAI examples
export OPENAI_API_KEY="sk-..."

# For Anthropic examples
export ANTHROPIC_API_KEY="sk-ant-..."

# Optional: Project ID (or pass in code)
export SCORECARD_PROJECT_ID="your-project-id"
```

## Running Examples

Use `yarn tsx` to run any TypeScript file:

### LLM Wrapper Examples

```bash
# Simple OpenAI example
yarn tsx openai-simple.ts

# Simple Anthropic example
yarn tsx anthropic-simple.ts

# OpenAI streaming example
yarn tsx openai-streaming.ts

# Anthropic streaming example
yarn tsx anthropic-streaming.ts

# Simple nesting example (custom span + OpenAI)
yarn tsx nested-simple.ts

# Advanced nested workflow (multiple LLMs)
yarn tsx nested-advanced.ts
```

### AI SDK Examples

```bash
# Simple AI SDK example
yarn tsx ai-sdk-simple.ts

# AI SDK with metrics
yarn tsx ai-sdk-with-metrics.ts

# AI SDK with embeddings
yarn tsx ai-sdk-embed.ts
```

### Other Examples

```bash
# Create a run
yarn tsx create-run-simple.ts

# List projects and testsets
yarn tsx list-projects-and-testsets.ts

# Populate a testset
yarn tsx populate-testset.ts
```

## Quick Test

To quickly test the new LLM wrapper:

```bash
cd /path/to/scorecard-node

# Build the SDK
yarn build

# Go to examples
cd examples

# Install dependencies
yarn install

# Set env vars
export SCORECARD_API_KEY="your-key"
export OPENAI_API_KEY="your-key"

# Run OpenAI example
yarn tsx openai-simple.ts
```

## Troubleshooting

**Error: Cannot find module 'scorecard-ai'**

- Make sure you ran `yarn build` in the parent directory first
- The examples reference `"scorecard-ai": "file:.."` in package.json

**Error: Missing API keys**

- Set `SCORECARD_API_KEY` and either `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`

**Error: tsx not found**

- Run `yarn install` in the examples directory
- Or install globally: `npm install -g tsx`
