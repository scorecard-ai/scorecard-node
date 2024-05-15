## Testset

<details><summary> <code>scorecard.testset.<a href="./src/api/resources/testset/client/Client.ts">get</a>(testsetId) -> Scorecard.Testset</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Retrieve Testset metadata without Testcase data

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.testset.get(1);
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

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testset.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testset.<a href="./src/api/resources/testset/client/Client.ts">delete</a>(testsetId) -> Scorecard.Testset</code> </summary>

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

```ts
await scorecard.testset.delete(1);
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

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testset.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testset.<a href="./src/api/resources/testset/client/Client.ts">create</a>({ ...params }) -> Scorecard.Testset</code> </summary>

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

```ts
await scorecard.testset.create({
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

**request: `Scorecard.TestsetCreateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testset.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testset.<a href="./src/api/resources/testset/client/Client.ts">readSchema</a>(testsetId) -> Scorecard.CustomSchema</code> </summary>

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

```ts
await scorecard.testset.readSchema(1);
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

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testset.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testset.<a href="./src/api/resources/testset/client/Client.ts">getTestcases</a>(testsetId, { ...params }) -> Scorecard.PaginatedTestcaseResponse</code> </summary>

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

```ts
await scorecard.testset.getTestcases(1);
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

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.TestsetGetTestcasesRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testset.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## Testcase

<details><summary> <code>scorecard.testcase.<a href="./src/api/resources/testcase/client/Client.ts">create</a>(testsetId, { ...params }) -> Scorecard.TestCase</code> </summary>

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

```ts
await scorecard.testcase.create(1, {
    userQuery: "user_query",
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

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.TestcaseCreateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testcase.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testcase.<a href="./src/api/resources/testcase/client/Client.ts">get</a>(testcaseId, testsetId) -> Scorecard.TestCase</code> </summary>

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

```ts
await scorecard.testcase.get(1, 1);
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

**testcaseId: `number`**

</dd>

</dl>

<dl>

<dd>

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testcase.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testcase.<a href="./src/api/resources/testcase/client/Client.ts">delete</a>(testcaseId, testsetId) -> unknown</code> </summary>

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

```ts
await scorecard.testcase.delete(1, 1);
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

**testcaseId: `number`**

</dd>

</dl>

<dl>

<dd>

**testsetId: `number`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testcase.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## Testrecord

<details><summary> <code>scorecard.testrecord.<a href="./src/api/resources/testrecord/client/Client.ts">get</a>(testrecordId, runId) -> Scorecard.Testrecord</code> </summary>

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

```ts
await scorecard.testrecord.get(1, 1);
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

**testrecordId: `number`**

</dd>

</dl>

<dl>

<dd>

**runId: `number`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testrecord.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.testrecord.<a href="./src/api/resources/testrecord/client/Client.ts">create</a>(runId, { ...params }) -> Scorecard.Testrecord</code> </summary>

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

```ts
await scorecard.testrecord.create(1);
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

**runId: `number`**

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.TestrecordCreateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Testrecord.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## Run

<details><summary> <code>scorecard.run.<a href="./src/api/resources/run/client/Client.ts">create</a>({ ...params }) -> Scorecard.Run</code> </summary>

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

```ts
await scorecard.run.create({
    testsetId: 1,
    status: "RUNNING_EXECUTION",
    modelParams: {
        param1: "value1",
        param2: "value2",
    },
    metrics: [1, 2],
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

**request: `Scorecard.RunCreateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Run.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.run.<a href="./src/api/resources/run/client/Client.ts">get</a>(runId) -> Scorecard.Run</code> </summary>

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

```ts
await scorecard.run.get(1);
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

**runId: `number`** — The id of the run to retrieve.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Run.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.run.<a href="./src/api/resources/run/client/Client.ts">updateStatus</a>(runId, { ...params }) -> Scorecard.Run</code> </summary>

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

```ts
await scorecard.run.updateStatus(1, {
    status: Scorecard.RunStatus.Pending,
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

**runId: `number`** — The id of the run to update.

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.UpdateStatusParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Run.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## Score

<details><summary> <code>scorecard.score.<a href="./src/api/resources/score/client/Client.ts">create</a>(runId, testrecordId, { ...params }) -> Scorecard.Grade</code> </summary>

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

```ts
await scorecard.score.create(1, 1, {
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

**runId: `number`**

</dd>

</dl>

<dl>

<dd>

**testrecordId: `number`**

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.ScoreCreateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Score.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.score.<a href="./src/api/resources/score/client/Client.ts">update</a>(runId, testrecordId, scoreId, { ...params }) -> Scorecard.Grade</code> </summary>

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

```ts
await scorecard.score.update(1, 1, 1);
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

**runId: `number`**

</dd>

</dl>

<dl>

<dd>

**testrecordId: `number`**

</dd>

</dl>

<dl>

<dd>

**scoreId: `number`**

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.ScoreUpdateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Score.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## RunMetric

<details><summary> <code>scorecard.runMetric.<a href="./src/api/resources/runMetric/client/Client.ts">get</a>(runId) -> Scorecard.RunMetric[]</code> </summary>

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

```ts
await scorecard.runMetric.get(1);
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

**runId: `number`** — The id of the run to retrieve.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `RunMetric.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## Traces

<details><summary> <code>scorecard.traces.<a href="./src/api/resources/traces/client/Client.ts">get</a>(traceId) -> Scorecard.Span[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Retrieve trace spans

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.traces.get("trace_id");
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

**traceId: `string`** — The ID of the trace to retrieve spans from.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Traces.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## Prompt

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">create</a>({ ...params }) -> Scorecard.Prompt</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Create a new prompt

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.prompt.create({
    promptTemplate: "You are a virtual assistant",
    name: "Prompt Name",
    description: "Description of the prompt",
    modelParams: {
        param1: "value1",
        param2: 0.1,
        param3: 100,
        param4: true,
    },
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

**request: `Scorecard.PromptCreateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">getRoots</a>() -> Scorecard.Prompt[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Retrieve active root prompts for the org

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.prompt.getRoots();
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

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">getProds</a>() -> Scorecard.Prompt[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Retrieve prod prompts for the org

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.prompt.getProds();
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

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">get</a>(id) -> Scorecard.Prompt</code> </summary>

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

```ts
await scorecard.prompt.get("id");
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

**id: `string`** — The id of the prompt to get.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">update</a>(id, { ...params }) -> Scorecard.Prompt</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Update a prompt

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.prompt.update("id", {
    isArchived: true,
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

**id: `string`** — The id of the prompt to update.

</dd>

</dl>

<dl>

<dd>

**request: `Scorecard.PromptUpdateParams`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">getByName</a>(name) -> Scorecard.Prompt</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Retrieve a prod prompt by name

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.prompt.getByName("name");
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

**name: `string`** — Name of the prompt.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>scorecard.prompt.<a href="./src/api/resources/prompt/client/Client.ts">getGraph</a>(id) -> Scorecard.Prompt[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Retrieve all nodes within the same graph as the prompt, sorted by created_at desc

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await scorecard.prompt.getGraph("id");
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

**id: `string`** — The id of the prompt.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompt.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>
