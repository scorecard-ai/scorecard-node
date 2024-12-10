# Reference

## Testset

<details><summary><code>client.testset.<a href="/src/api/resources/testset/client/Client.ts">get</a>({ ...params }) -> Scorecard.TestsetCursorPage</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all Testsets with cursor-based pagination

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testset.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.TestsetGetRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testset.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testset.<a href="/src/api/resources/testset/client/Client.ts">delete</a>(testsetId) -> Scorecard.Testset</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a Testset

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testset.delete(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testset.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testset.<a href="/src/api/resources/testset/client/Client.ts">update</a>(testsetId, { ...params }) -> Scorecard.Testset</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a Testset.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testset.update(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestsetUpdateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testset.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testset.<a href="/src/api/resources/testset/client/Client.ts">create</a>({ ...params }) -> Scorecard.Testset</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new Testset

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testset.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.TestsetCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testset.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testset.<a href="/src/api/resources/testset/client/Client.ts">readSchema</a>(testsetId) -> Scorecard.CustomSchema</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Read the schema of a Testset

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testset.readSchema(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to retrieve the schema from.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testset.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testset.<a href="/src/api/resources/testset/client/Client.ts">getTestcases</a>(testsetId, { ...params }) -> Scorecard.PaginatedTestcaseResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all Testcases from a Testset

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testset.getTestcases(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The Testset ID to retrieve testcases from.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestsetGetTestcasesRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testset.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Testcase

<details><summary><code>client.testcase.<a href="/src/api/resources/testcase/client/Client.ts">create</a>(testsetId, { ...params }) -> Scorecard.TestCase</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new Testcase

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testcase.create(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to create the Testcase in.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestcaseCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testcase.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testcase.<a href="/src/api/resources/testcase/client/Client.ts">get</a>(testcaseId, testsetId) -> Scorecard.TestCase</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve Testcase data

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testcase.get(1, 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testcaseId:** `number` — The ID of the Testcase to retrieve.

</dd>
</dl>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to retrieve the Testcase from.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testcase.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testcase.<a href="/src/api/resources/testcase/client/Client.ts">delete</a>(testcaseId, testsetId) -> Scorecard.TestcaseDeletionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a Testcase

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testcase.delete(1, 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testcaseId:** `number` — The ID of the Testcase to delete.

</dd>
</dl>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to delete the Testcase from.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testcase.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testcase.<a href="/src/api/resources/testcase/client/Client.ts">update</a>(testcaseId, testsetId, { ...params }) -> Scorecard.TestCase</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a Testcase.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testcase.update(1, 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testcaseId:** `number` — The ID of the Testcase to update.

</dd>
</dl>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to retrieve the Testcase from.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestcaseUpdateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testcase.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testcase.<a href="/src/api/resources/testcase/client/Client.ts">batchCopy</a>(testsetId, { ...params }) -> Scorecard.TestCase[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Batch copy Testcases

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testcase.batchCopy(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset to create the Testcase in.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestcaseBatchCopyParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testcase.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testcase.<a href="/src/api/resources/testcase/client/Client.ts">batchDelete</a>(testsetId, { ...params }) -> Scorecard.TestcaseBatchDeletionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Batch delete Testcases

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testcase.batchDelete(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testsetId:** `number` — The ID of the Testset from which the Testcases will be deleted.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestcaseBatchDeleteParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testcase.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Testrecord

<details><summary><code>client.testrecord.<a href="/src/api/resources/testrecord/client/Client.ts">get</a>(testrecordId, runId) -> Scorecard.Testrecord</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve Testrecord metadata

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testrecord.get(1, 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**testrecordId:** `number`

</dd>
</dl>

<dl>
<dd>

**runId:** `number`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testrecord.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.testrecord.<a href="/src/api/resources/testrecord/client/Client.ts">create</a>(runId, { ...params }) -> Scorecard.Testrecord</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new Testrecord

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.testrecord.create(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**runId:** `number` — The ID of the Run to create the Testrecord in.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.TestrecordCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Testrecord.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Run

<details><summary><code>client.run.<a href="/src/api/resources/run/client/Client.ts">create</a>({ ...params }) -> Scorecard.Run</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new Run

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.run.create();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.RunCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Run.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.run.<a href="/src/api/resources/run/client/Client.ts">get</a>(runId) -> Scorecard.Run</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a Run metadata

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.run.get(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**runId:** `number` — The id of the run to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Run.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.run.<a href="/src/api/resources/run/client/Client.ts">updateStatus</a>(runId, { ...params }) -> Scorecard.Run</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the status of a run.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.run.updateStatus(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**runId:** `number` — The id of the run to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.UpdateStatusParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Run.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Score

<details><summary><code>client.score.<a href="/src/api/resources/score/client/Client.ts">create</a>(runId, testrecordId, { ...params }) -> Scorecard.Grade</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a score

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.score.create(1, 1, {
    metricId: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**runId:** `number` — The ID of the run that created the testrecord to be scored.

</dd>
</dl>

<dl>
<dd>

**testrecordId:** `number` — The ID of the testrecord to be scored.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.ScoreCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Score.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.score.<a href="/src/api/resources/score/client/Client.ts">update</a>(runId, testrecordId, scoreId, { ...params }) -> Scorecard.Grade</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a score

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.score.update(1, 1, 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**runId:** `number` — The run ID that created the test record to be scored.

</dd>
</dl>

<dl>
<dd>

**testrecordId:** `number` — The ID of the testrecord whose score will be updated.

</dd>
</dl>

<dl>
<dd>

**scoreId:** `number` — The ID of the score to be updated.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.ScoreUpdateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Score.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## RunMetric

<details><summary><code>client.runMetric.<a href="/src/api/resources/runMetric/client/Client.ts">get</a>(runId) -> Scorecard.RunMetric[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve metrics associated with a run

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.runMetric.get(1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**runId:** `number` — The id of the run to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RunMetric.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Tracing

<details><summary><code>client.tracing.<a href="/src/api/resources/tracing/client/Client.ts">traces</a>() -> Scorecard.Trace[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve traces

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tracing.traces();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Tracing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tracing.<a href="/src/api/resources/tracing/client/Client.ts">trace</a>(traceId) -> Scorecard.Trace</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve specified trace

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tracing.trace("trace_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**traceId:** `string` — The ID of the trace to retrieve spans from.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tracing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tracing.<a href="/src/api/resources/tracing/client/Client.ts">span</a>(traceId, spanId) -> Scorecard.Span</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve specified span

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tracing.span("trace_id", "span_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**traceId:** `string` — The ID of the trace which the span is a part of.

</dd>
</dl>

<dl>
<dd>

**spanId:** `string` — The ID of the span to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tracing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Prompt

<details><summary><code>client.prompt.<a href="/src/api/resources/prompt/client/Client.ts">getByName</a>({ ...params }) -> Scorecard.Prompt</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a prompt by name, defaulting to the production prompt, unless a tag to select the prompt by is specified

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompt.getByName({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.PromptGetByNameRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompt.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompt.<a href="/src/api/resources/prompt/client/Client.ts">create</a>({ ...params }) -> Scorecard.Prompt</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Two types of prompts can be created - a root prompt or a child prompt (aka Prompt Version in the app).

        A root prompt can be created by providing the `name` param, and it will always be tagged as production.

        A child prompt can be created by providing the `parent_id` param. Note that the `name` param in this case will be ignored as all descendants from a root prompt would share the root's name. `is_prod` can also be provided to configure whether a child should be tagged as production.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompt.create({
    promptTemplate:
        "<system>\nYou are a helpful assistant. Use the provided context to answer the user's query.\n\nContext: {context}\n</system>\n\n<user>\n{user_query}\n</user>",
    name: "Prompt Name",
    description: "Description of the prompt",
    modelParams: {
        param1: "value1",
        param2: 0.1,
        param3: 100,
        param4: true,
    },
    tag: "1.0",
    projectId: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.PromptCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompt.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompt.<a href="/src/api/resources/prompt/client/Client.ts">listPrompts</a>({ ...params }) -> Scorecard.PromptCursorPage</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all prompts with cursor-based pagination

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompt.listPrompts();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.PromptListPromptsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompt.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompt.<a href="/src/api/resources/prompt/client/Client.ts">get</a>(id) -> Scorecard.Prompt</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a prompt by id

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompt.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the prompt to get.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompt.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompt.<a href="/src/api/resources/prompt/client/Client.ts">delete</a>(id) -> unknown</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a root prompt and all of its children.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompt.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the root prompt to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompt.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompt.<a href="/src/api/resources/prompt/client/Client.ts">update</a>(id, { ...params }) -> Scorecard.Prompt</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a prompt.

        `is_prod` tags the provided prompt as the production prompt within the prompt graph.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompt.update("id", {
    isProd: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the prompt to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Scorecard.PromptUpdateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompt.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ScoringConfig

<details><summary><code>client.scoringConfig.<a href="/src/api/resources/scoringConfig/client/Client.ts">create</a>({ ...params }) -> Scorecard.ScoringConfig</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new scoring config.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scoringConfig.create({
    name: "Scoring Config Name",
    description: "Description of the scoring config",
    metrics: [1, 2, 3],
    projectId: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Scorecard.ScoringConfigCreateParams`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScoringConfig.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.scoringConfig.<a href="/src/api/resources/scoringConfig/client/Client.ts">get</a>(id) -> Scorecard.ScoringConfig</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a scoring config by id

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scoringConfig.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the scoring config to get.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScoringConfig.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.scoringConfig.<a href="/src/api/resources/scoringConfig/client/Client.ts">delete</a>(id) -> unknown</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a scoring config.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scoringConfig.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the scoring config to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScoringConfig.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
