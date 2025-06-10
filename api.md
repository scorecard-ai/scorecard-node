# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIError</a></code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">Project</a></code>

Methods:

- <code title="post /projects">client.projects.<a href="./src/resources/projects.ts">create</a>({ ...params }) -> Project</code>
- <code title="get /projects">client.projects.<a href="./src/resources/projects.ts">list</a>({ ...params }) -> ProjectsPaginatedResponse</code>

# Testsets

Types:

- <code><a href="./src/resources/testsets.ts">Testset</a></code>
- <code><a href="./src/resources/testsets.ts">TestsetDeleteResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/testsets">client.testsets.<a href="./src/resources/testsets.ts">create</a>(projectID, { ...params }) -> Testset</code>
- <code title="patch /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets.ts">update</a>(testsetID, { ...params }) -> Testset</code>
- <code title="get /projects/{projectId}/testsets">client.testsets.<a href="./src/resources/testsets.ts">list</a>(projectID, { ...params }) -> TestsetsPaginatedResponse</code>
- <code title="delete /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets.ts">delete</a>(testsetID) -> TestsetDeleteResponse</code>
- <code title="get /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets.ts">get</a>(testsetID) -> Testset</code>

# Testcases

Types:

- <code><a href="./src/resources/testcases.ts">Testcase</a></code>
- <code><a href="./src/resources/testcases.ts">TestcaseCreateResponse</a></code>
- <code><a href="./src/resources/testcases.ts">TestcaseDeleteResponse</a></code>

Methods:

- <code title="post /testsets/{testsetId}/testcases">client.testcases.<a href="./src/resources/testcases.ts">create</a>(testsetID, { ...params }) -> TestcaseCreateResponse</code>
- <code title="put /testcases/{testcaseId}">client.testcases.<a href="./src/resources/testcases.ts">update</a>(testcaseID, { ...params }) -> Testcase</code>
- <code title="get /testsets/{testsetId}/testcases">client.testcases.<a href="./src/resources/testcases.ts">list</a>(testsetID, { ...params }) -> TestcasesPaginatedResponse</code>
- <code title="post /testcases/bulk-delete">client.testcases.<a href="./src/resources/testcases.ts">delete</a>({ ...params }) -> TestcaseDeleteResponse</code>
- <code title="get /testcases/{testcaseId}">client.testcases.<a href="./src/resources/testcases.ts">get</a>(testcaseID) -> Testcase</code>

# Runs

Types:

- <code><a href="./src/resources/runs.ts">Run</a></code>

Methods:

- <code title="post /projects/{projectId}/runs">client.runs.<a href="./src/resources/runs.ts">create</a>(projectID, { ...params }) -> Run</code>

# Records

Types:

- <code><a href="./src/resources/records.ts">Record</a></code>

Methods:

- <code title="post /runs/{runId}/records">client.records.<a href="./src/resources/records.ts">create</a>(runID, { ...params }) -> Record</code>

# Scores

Types:

- <code><a href="./src/resources/scores.ts">Score</a></code>

Methods:

- <code title="put /records/{recordId}/scores/{metricConfigId}">client.scores.<a href="./src/resources/scores.ts">upsert</a>(metricConfigID, { ...params }) -> Score</code>

# Systems

Types:

- <code><a href="./src/resources/systems/systems.ts">System</a></code>
- <code><a href="./src/resources/systems/systems.ts">SystemDeleteResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/systems">client.systems.<a href="./src/resources/systems/systems.ts">create</a>(projectID, { ...params }) -> System</code>
- <code title="patch /systems/{systemId}">client.systems.<a href="./src/resources/systems/systems.ts">update</a>(systemID, { ...params }) -> System</code>
- <code title="get /projects/{projectId}/systems">client.systems.<a href="./src/resources/systems/systems.ts">list</a>(projectID, { ...params }) -> SystemsPaginatedResponse</code>
- <code title="delete /systems/{systemId}">client.systems.<a href="./src/resources/systems/systems.ts">delete</a>(systemID) -> SystemDeleteResponse</code>
- <code title="get /systems/{systemId}">client.systems.<a href="./src/resources/systems/systems.ts">get</a>(systemID) -> System</code>

## Versions

Types:

- <code><a href="./src/resources/systems/versions.ts">SystemVersion</a></code>

Methods:

- <code title="post /systems/{systemId}/configs">client.systems.versions.<a href="./src/resources/systems/versions.ts">create</a>(systemID, { ...params }) -> SystemVersion</code>
- <code title="get /systems/{systemId}/configs">client.systems.versions.<a href="./src/resources/systems/versions.ts">list</a>(systemID, { ...params }) -> SystemVersionsPaginatedResponse</code>
- <code title="get /systems/configs/{systemVersionId}">client.systems.versions.<a href="./src/resources/systems/versions.ts">get</a>(systemVersionID) -> SystemVersion</code>
