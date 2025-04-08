# Shared

Types:

- <code><a href="./src/resources/shared.ts">APIError</a></code>
- <code><a href="./src/resources/shared.ts">Testcase</a></code>
- <code><a href="./src/resources/shared.ts">Testset</a></code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="get /projects">client.projects.<a href="./src/resources/projects.ts">list</a>({ ...params }) -> ProjectListResponsesPaginatedResponse</code>

# Testsets

Types:

- <code><a href="./src/resources/testsets.ts">TestsetDeleteResponse</a></code>
- <code><a href="./src/resources/testsets.ts">TestsetCreateTestcasesResponse</a></code>
- <code><a href="./src/resources/testsets.ts">TestsetDeleteTestcasesResponse</a></code>
- <code><a href="./src/resources/testsets.ts">TestsetListTestcasesResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/testsets">client.testsets.<a href="./src/resources/testsets.ts">create</a>(projectID, { ...params }) -> Testset</code>
- <code title="patch /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets.ts">update</a>(testsetID, { ...params }) -> Testset</code>
- <code title="get /projects/{projectId}/testsets">client.testsets.<a href="./src/resources/testsets.ts">list</a>(projectID, { ...params }) -> TestsetsPaginatedResponse</code>
- <code title="delete /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets.ts">delete</a>(testsetID) -> TestsetDeleteResponse</code>
- <code title="post /testsets/{testsetId}/testcases">client.testsets.<a href="./src/resources/testsets.ts">createTestcases</a>(testsetID, { ...params }) -> TestsetCreateTestcasesResponse</code>
- <code title="delete /testsets/{testsetId}/testcases">client.testsets.<a href="./src/resources/testsets.ts">deleteTestcases</a>(testsetID, { ...params }) -> TestsetDeleteTestcasesResponse</code>
- <code title="get /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets.ts">get</a>(testsetID) -> Testset</code>
- <code title="get /testsets/{testsetId}/testcases">client.testsets.<a href="./src/resources/testsets.ts">listTestcases</a>(testsetID, { ...params }) -> TestsetListTestcasesResponse</code>

# Testcases

Methods:

- <code title="put /testcases/{testcaseId}">client.testcases.<a href="./src/resources/testcases.ts">update</a>(testcaseID, { ...params }) -> Testcase</code>
- <code title="get /testcases/{testcaseId}">client.testcases.<a href="./src/resources/testcases.ts">get</a>(testcaseID) -> Testcase</code>
