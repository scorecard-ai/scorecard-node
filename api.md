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

- <code><a href="./src/resources/testsets/testsets.ts">TestsetCreateResponse</a></code>
- <code><a href="./src/resources/testsets/testsets.ts">TestsetRetrieveResponse</a></code>
- <code><a href="./src/resources/testsets/testsets.ts">TestsetUpdateResponse</a></code>
- <code><a href="./src/resources/testsets/testsets.ts">TestsetListResponse</a></code>
- <code><a href="./src/resources/testsets/testsets.ts">TestsetDeleteResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/testsets">client.testsets.<a href="./src/resources/testsets/testsets.ts">create</a>(projectID, { ...params }) -> TestsetCreateResponse</code>
- <code title="get /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets/testsets.ts">retrieve</a>(testsetID) -> TestsetRetrieveResponse</code>
- <code title="patch /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets/testsets.ts">update</a>(testsetID, { ...params }) -> TestsetUpdateResponse</code>
- <code title="get /projects/{projectId}/testsets">client.testsets.<a href="./src/resources/testsets/testsets.ts">list</a>(projectID, { ...params }) -> TestsetListResponsesPaginatedResponse</code>
- <code title="delete /testsets/{testsetId}">client.testsets.<a href="./src/resources/testsets/testsets.ts">delete</a>(testsetID) -> TestsetDeleteResponse</code>

## Testcases

Types:

- <code><a href="./src/resources/testsets/testcases.ts">TestcaseCreateResponse</a></code>
- <code><a href="./src/resources/testsets/testcases.ts">TestcaseListResponse</a></code>
- <code><a href="./src/resources/testsets/testcases.ts">TestcaseDeleteResponse</a></code>

Methods:

- <code title="post /testsets/{testsetId}/testcases">client.testsets.testcases.<a href="./src/resources/testsets/testcases.ts">create</a>(testsetID, { ...params }) -> TestcaseCreateResponse</code>
- <code title="get /testsets/{testsetId}/testcases">client.testsets.testcases.<a href="./src/resources/testsets/testcases.ts">list</a>(testsetID, { ...params }) -> TestcaseListResponsesPaginatedResponse</code>
- <code title="delete /testsets/{testsetId}/testcases">client.testsets.testcases.<a href="./src/resources/testsets/testcases.ts">delete</a>(testsetID, { ...params }) -> TestcaseDeleteResponse</code>

# Testcases

Types:

- <code><a href="./src/resources/testcases.ts">TestcaseRetrieveResponse</a></code>
- <code><a href="./src/resources/testcases.ts">TestcaseUpdateResponse</a></code>

Methods:

- <code title="get /testcases/{testcaseId}">client.testcases.<a href="./src/resources/testcases.ts">retrieve</a>(testcaseID) -> TestcaseRetrieveResponse</code>
- <code title="put /testcases/{testcaseId}">client.testcases.<a href="./src/resources/testcases.ts">update</a>(testcaseID, { ...params }) -> TestcaseUpdateResponse</code>
