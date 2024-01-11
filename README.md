# Scorecard AI Node Library

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-SDK%20generated%20by%20Fern-brightgreen)](https://github.com/fern-api/fern)

## Installation

```bash
npm install scorecard-ai
# or
yarn add scorecard-ai
```

## Usage
Instantiate our client and start making calls to the API. 
The SDK uses fetch and is compatible in multiple environments
such as Node, Vercel, Cloudflare Workers. 

```typescript
import { ScorecardClient } from "scorecard";

const scorecard = new ScorecardClient(
  api_key="YOUR_API_KEY" // Defaults to SCORECARD_API_KEY
)

const testset = await scorecard.testset.create({
  testsetId=1234, 
  userQuery="Your prompt...", 
  modelParams: {
    "param": "value"
  }
})

console.log("Created testset", testset)
```

## Running Tests
The `runTests` method will load your test cases, 
invoke your models with saved prompts, 
and record success and failure. This is 
available on both the sync and async client.  

```typescript
import { callModel } from "../app.ts";
import { ScorecardClient } from "scorecard";

const scorecard = new ScorecardClient(
  apiKey="YOUR_API_KEY"
)

client.runTests({
  inputTestsetId: 123,
  scoringConfigId: 456,
  // The model invocation that you would like to test
  model_invocation: () => callModel(prompt),
})
```

## Timeouts
By default, the client is configured to have 
a timeout of 60 seconds. You can customize 
this value by passing in request options. 

```typescript
await scorecard.testset.create({
    testsetId=1234, 
    ...
  }, 
  {
    timeoutInSeconds: 30, // override timeout to 30s
  });
```

## Handling Exceptions
All exceptions thrown by the SDK will 
sublcass [ScorecardError](./src/errors/ScorecardError.ts). 

```typescript
import { Scorecard, ScorecardError } from "scorecard";

try {
  await client.testset.get({...});
} catch(err) {
  if (err instanceof Scorecard.UnprocessableEntityError) {
    // handle unprocessable entity error
  } else if (err instanceof ScorecardError) {
    // handle any sdk related error
  }
}
```

## Beta status

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning the package version to a specific version in your pyproject.toml file. This way, you can install the same version each time without breaking changes unless you are intentionally looking for the latest version.

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically. Additions made directly to this library would have to be moved over to our generation code, otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!
