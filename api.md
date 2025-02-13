# Welcome

Types:

- <code><a href="./src/resources/welcome.ts">WelcomeRetrieveResponse</a></code>

Methods:

- <code title="get /v1/">client.welcome.<a href="./src/resources/welcome.ts">retrieve</a>() -> unknown</code>

# RunMetric

Types:

- <code><a href="./src/resources/run-metric.ts">RunMetricRetrieveResponse</a></code>

Methods:

- <code title="get /v1/run_metric/{run_id}">client.runMetric.<a href="./src/resources/run-metric.ts">retrieve</a>(runID) -> RunMetricRetrieveResponse</code>

# Testset

Types:

- <code><a href="./src/resources/testset/testset.ts">Testset</a></code>
- <code><a href="./src/resources/testset/testset.ts">TestsetListResponse</a></code>
- <code><a href="./src/resources/testset/testset.ts">TestsetGetSchemaResponse</a></code>

Methods:

- <code title="post /v1/testset">client.testset.<a href="./src/resources/testset/testset.ts">create</a>({ ...params }) -> Testset</code>
- <code title="get /v1/testset/{testset_id}">client.testset.<a href="./src/resources/testset/testset.ts">retrieve</a>(testsetID) -> Testset</code>
- <code title="patch /v1/testset/{testset_id}">client.testset.<a href="./src/resources/testset/testset.ts">update</a>(testsetID, { ...params }) -> Testset</code>
- <code title="get /v1/testset">client.testset.<a href="./src/resources/testset/testset.ts">list</a>({ ...params }) -> TestsetListResponse</code>
- <code title="delete /v1/testset/{testset_id}">client.testset.<a href="./src/resources/testset/testset.ts">delete</a>(testsetID) -> Testset</code>
- <code title="get /v1/testset/{testset_id}/schema">client.testset.<a href="./src/resources/testset/testset.ts">getSchema</a>(testsetID) -> TestsetGetSchemaResponse</code>

## Testcase

Types:

- <code><a href="./src/resources/testset/testcase.ts">TestCase</a></code>
- <code><a href="./src/resources/testset/testcase.ts">TestcaseListResponse</a></code>
- <code><a href="./src/resources/testset/testcase.ts">TestcaseDeleteResponse</a></code>
- <code><a href="./src/resources/testset/testcase.ts">TestcaseBatchCopyResponse</a></code>
- <code><a href="./src/resources/testset/testcase.ts">TestcaseBatchDeleteResponse</a></code>

Methods:

- <code title="post /v1/testset/{testset_id}/testcase">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">create</a>(testsetID, { ...params }) -> TestCase</code>
- <code title="get /v1/testset/{testset_id}/testcase/{testcase_id}">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">retrieve</a>(testcaseID, { ...params }) -> TestCase</code>
- <code title="patch /v1/testset/{testset_id}/testcase/{testcase_id}">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">update</a>(testcaseID, { ...params }) -> TestCase</code>
- <code title="get /v1/testset/{testset_id}/testcase">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">list</a>(testsetID, { ...params }) -> TestcaseListResponse</code>
- <code title="delete /v1/testset/{testset_id}/testcase/{testcase_id}">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">delete</a>(testcaseID, { ...params }) -> TestcaseDeleteResponse</code>
- <code title="post /v1/testset/{testset_id}/testcase/batch_copy">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">batchCopy</a>(testsetID, { ...params }) -> TestcaseBatchCopyResponse</code>
- <code title="patch /v1/testset/{testset_id}/testcase/batch_delete">client.testset.testcase.<a href="./src/resources/testset/testcase.ts">batchDelete</a>(testsetID, { ...params }) -> TestcaseBatchDeleteResponse</code>

# Run

Types:

- <code><a href="./src/resources/run/run.ts">Run</a></code>

Methods:

- <code title="post /v1/run">client.run.<a href="./src/resources/run/run.ts">create</a>({ ...params }) -> Run</code>
- <code title="get /v1/run/{run_id}">client.run.<a href="./src/resources/run/run.ts">retrieve</a>(runID) -> Run</code>
- <code title="patch /v1/run/{run_id}/status">client.run.<a href="./src/resources/run/run.ts">updateStatus</a>(runID, { ...params }) -> Run</code>

## Testrecord

Types:

- <code><a href="./src/resources/run/testrecord/testrecord.ts">Testrecord</a></code>

Methods:

- <code title="post /v1/run/{run_id}/testrecord">client.run.testrecord.<a href="./src/resources/run/testrecord/testrecord.ts">create</a>(runID, { ...params }) -> Testrecord</code>
- <code title="get /v1/run/{run_id}/testrecord/{testrecord_id}">client.run.testrecord.<a href="./src/resources/run/testrecord/testrecord.ts">retrieve</a>(testrecordID, { ...params }) -> Testrecord</code>

### Score

Types:

- <code><a href="./src/resources/run/testrecord/score.ts">Grade</a></code>

Methods:

- <code title="post /v1/run/{run_id}/testrecord/{testrecord_id}/score">client.run.testrecord.score.<a href="./src/resources/run/testrecord/score.ts">create</a>(testrecordID, { ...params }) -> Grade</code>
- <code title="patch /v1/run/{run_id}/testrecord/{testrecord_id}/score/{score_id}">client.run.testrecord.score.<a href="./src/resources/run/testrecord/score.ts">update</a>(scoreID, { ...params }) -> Grade</code>

# Traces

Types:

- <code><a href="./src/resources/traces.ts">Trace</a></code>
- <code><a href="./src/resources/traces.ts">TraceListResponse</a></code>
- <code><a href="./src/resources/traces.ts">TraceRetrieveSpanResponse</a></code>

Methods:

- <code title="get /v1/traces/{trace_id}">client.traces.<a href="./src/resources/traces.ts">retrieve</a>(traceID) -> Trace</code>
- <code title="get /v1/traces">client.traces.<a href="./src/resources/traces.ts">list</a>() -> TraceListResponse</code>
- <code title="get /v1/traces/{trace_id}/spans/{span_id}">client.traces.<a href="./src/resources/traces.ts">retrieveSpan</a>(spanID, { ...params }) -> TraceRetrieveSpanResponse</code>

# Prompt

Types:

- <code><a href="./src/resources/prompt.ts">Prompt</a></code>
- <code><a href="./src/resources/prompt.ts">PromptListResponse</a></code>
- <code><a href="./src/resources/prompt.ts">PromptDeleteRootResponse</a></code>

Methods:

- <code title="post /v1/prompt">client.prompt.<a href="./src/resources/prompt.ts">create</a>({ ...params }) -> Prompt</code>
- <code title="patch /v1/prompt/{id}">client.prompt.<a href="./src/resources/prompt.ts">update</a>(id, { ...params }) -> Prompt</code>
- <code title="get /v1/prompt/list">client.prompt.<a href="./src/resources/prompt.ts">list</a>({ ...params }) -> PromptListResponse</code>
- <code title="delete /v1/prompt/{id}">client.prompt.<a href="./src/resources/prompt.ts">deleteRoot</a>(id) -> unknown</code>
- <code title="get /v1/prompt/{id}">client.prompt.<a href="./src/resources/prompt.ts">retrieveByID</a>(id) -> Prompt</code>
- <code title="get /v1/prompt">client.prompt.<a href="./src/resources/prompt.ts">retrieveByName</a>({ ...params }) -> Prompt</code>

# ScoringConfig

Types:

- <code><a href="./src/resources/scoring-config.ts">ScoringConfig</a></code>
- <code><a href="./src/resources/scoring-config.ts">ScoringConfigDeleteResponse</a></code>

Methods:

- <code title="post /v1/scoring_config">client.scoringConfig.<a href="./src/resources/scoring-config.ts">create</a>({ ...params }) -> ScoringConfig</code>
- <code title="get /v1/scoring_config/{id}">client.scoringConfig.<a href="./src/resources/scoring-config.ts">retrieve</a>(id) -> ScoringConfig</code>
- <code title="delete /v1/scoring_config/{id}">client.scoringConfig.<a href="./src/resources/scoring-config.ts">delete</a>(id) -> unknown</code>
