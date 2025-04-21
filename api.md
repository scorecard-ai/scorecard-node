# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIError</a></code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="get /projects">client.projects.<a href="./src/resources/projects.ts">list</a>({ ...params }) -> ProjectListResponsesPaginatedResponse</code>

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
