// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Testcase extends APIResource {
  /**
   * Create a new Testcase
   */
  create(testsetID: number, body: TestcaseCreateParams, options?: RequestOptions): APIPromise<TestCase> {
    return this._client.post(path`/v1/testset/${testsetID}/testcase`, { body, ...options });
  }

  /**
   * Retrieve Testcase data
   */
  retrieve(
    testcaseID: number,
    params: TestcaseRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TestCase> {
    const { testset_id } = params;
    return this._client.get(path`/v1/testset/${testset_id}/testcase/${testcaseID}`, options);
  }

  /**
   * Update a Testcase.
   */
  update(testcaseID: number, params: TestcaseUpdateParams, options?: RequestOptions): APIPromise<TestCase> {
    const { testset_id, ...body } = params;
    return this._client.patch(path`/v1/testset/${testset_id}/testcase/${testcaseID}`, { body, ...options });
  }

  /**
   * Retrieve all Testcases from a Testset
   */
  list(
    testsetID: number,
    query: TestcaseListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TestcaseListResponse> {
    return this._client.get(path`/v1/testset/${testsetID}/testcase`, { query, ...options });
  }

  /**
   * Delete a Testcase
   */
  delete(
    testcaseID: number,
    params: TestcaseDeleteParams,
    options?: RequestOptions,
  ): APIPromise<TestcaseDeleteResponse> {
    const { testset_id } = params;
    return this._client.delete(path`/v1/testset/${testset_id}/testcase/${testcaseID}`, options);
  }

  /**
   * Batch copy Testcases
   */
  batchCopy(
    testsetID: number,
    body: TestcaseBatchCopyParams,
    options?: RequestOptions,
  ): APIPromise<TestcaseBatchCopyResponse> {
    return this._client.post(path`/v1/testset/${testsetID}/testcase/batch_copy`, { body, ...options });
  }

  /**
   * Batch delete Testcases
   */
  batchDelete(
    testsetID: number,
    body: TestcaseBatchDeleteParams,
    options?: RequestOptions,
  ): APIPromise<TestcaseBatchDeleteResponse> {
    return this._client.patch(path`/v1/testset/${testsetID}/testcase/batch_delete`, { body, ...options });
  }
}

export interface TestCase {
  /**
   * The ID of the testset the testcase belongs to.
   */
  testset_id: number;

  /**
   * The user query for the testcase.
   */
  user_query: string;

  /**
   * The ID of the testcase.
   */
  id?: number | null;

  /**
   * The context for the testcase.
   */
  context?: string | null;

  /**
   * The creation date and time of the testcase.
   */
  created_at?: string | null;

  custom_inputs?: Record<
    string,
    string | TestCase.FileURL | TestCase.JsonObjectOutput | number | boolean | null
  > | null;

  custom_labels?: Record<
    string,
    string | TestCase.FileURL | TestCase.JsonObjectOutput | number | boolean | null
  > | null;

  /**
   * The ideal response for the testcase.
   */
  ideal?: string | null;
}

export namespace TestCase {
  /**
   * File model with url and name.
   */
  export interface FileURL {
    url: string;

    name?: string | null;
  }

  export interface JsonObjectOutput {
    /**
     * The value of the JSON object, which can be a dictionary, list, string, integer,
     * float, boolean, or None.
     */
    value: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  }

  /**
   * File model with url and name.
   */
  export interface FileURL {
    url: string;

    name?: string | null;
  }

  export interface JsonObjectOutput {
    /**
     * The value of the JSON object, which can be a dictionary, list, string, integer,
     * float, boolean, or None.
     */
    value: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  }
}

export interface TestcaseListResponse {
  count: number;

  /**
   * The URL to fetch the next page of testcases.
   */
  next: string | null;

  /**
   * The URL to fetch the previous page of testcases.
   */
  previous: string | null;

  /**
   * The list of Testcases retrieved in this page.
   */
  results: Array<TestCase>;
}

export interface TestcaseDeleteResponse {
  /**
   * The ID of the testcase that was deleted.
   */
  id: number;

  /**
   * The message indicating the testcase was deleted.
   */
  detail: string;
}

export type TestcaseBatchCopyResponse = Array<TestCase>;

export interface TestcaseBatchDeleteResponse {
  /**
   * The message indicating the testcases were deleted.
   */
  detail: string;

  /**
   * The IDs of the testcases that were deleted.
   */
  ids: Array<number>;
}

export interface TestcaseCreateParams {
  /**
   * The context to be used while generating the testcase.
   */
  context?: string | null;

  custom_inputs?: Record<
    string,
    string | TestcaseCreateParams.FileURL | TestcaseCreateParams.JsonObjectInput | number | boolean | null
  > | null;

  custom_labels?: Record<
    string,
    string | TestcaseCreateParams.FileURL | TestcaseCreateParams.JsonObjectInput | number | boolean | null
  > | null;

  /**
   * The ideal response to the user query.
   */
  ideal?: string | null;

  /**
   * The user query to be executed.
   */
  user_query?: string;
}

export namespace TestcaseCreateParams {
  /**
   * File model with url and name.
   */
  export interface FileURL {
    url: string;

    name?: string | null;
  }

  export interface JsonObjectInput {
    /**
     * The value of the JSON object, which can be a dictionary, list, string, integer,
     * float, boolean, or None.
     */
    value: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  }

  /**
   * File model with url and name.
   */
  export interface FileURL {
    url: string;

    name?: string | null;
  }

  export interface JsonObjectInput {
    /**
     * The value of the JSON object, which can be a dictionary, list, string, integer,
     * float, boolean, or None.
     */
    value: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  }
}

export interface TestcaseRetrieveParams {
  /**
   * The ID of the Testset to retrieve the Testcase from.
   */
  testset_id: number;
}

export interface TestcaseUpdateParams {
  /**
   * Path param: The ID of the Testset to retrieve the Testcase from.
   */
  testset_id: number;

  /**
   * Body param: The context to be used while generating the testcase.
   */
  context?: string | null;

  /**
   * Body param:
   */
  custom_inputs?: Record<
    string,
    string | TestcaseUpdateParams.FileURL | TestcaseUpdateParams.JsonObjectInput | number | boolean | null
  > | null;

  /**
   * Body param:
   */
  custom_labels?: Record<
    string,
    string | TestcaseUpdateParams.FileURL | TestcaseUpdateParams.JsonObjectInput | number | boolean | null
  > | null;

  /**
   * Body param: The ideal response to the user query.
   */
  ideal?: string | null;

  /**
   * Body param: The user query to be executed.
   */
  user_query?: string | null;
}

export namespace TestcaseUpdateParams {
  /**
   * File model with url and name.
   */
  export interface FileURL {
    url: string;

    name?: string | null;
  }

  export interface JsonObjectInput {
    /**
     * The value of the JSON object, which can be a dictionary, list, string, integer,
     * float, boolean, or None.
     */
    value: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  }

  /**
   * File model with url and name.
   */
  export interface FileURL {
    url: string;

    name?: string | null;
  }

  export interface JsonObjectInput {
    /**
     * The value of the JSON object, which can be a dictionary, list, string, integer,
     * float, boolean, or None.
     */
    value: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  }
}

export interface TestcaseListParams {
  /**
   * The number of testcases to return.
   */
  limit?: number;

  /**
   * The offset to start from.
   */
  offset?: number;
}

export interface TestcaseDeleteParams {
  /**
   * The ID of the Testset to delete the Testcase from.
   */
  testset_id: number;
}

export interface TestcaseBatchCopyParams {
  /**
   * List of Testcase IDs to copy.
   */
  ids?: Array<number>;
}

export interface TestcaseBatchDeleteParams {
  /**
   * List of Testcase IDs to delete.
   */
  ids?: Array<number>;
}

export declare namespace Testcase {
  export {
    type TestCase as TestCase,
    type TestcaseListResponse as TestcaseListResponse,
    type TestcaseDeleteResponse as TestcaseDeleteResponse,
    type TestcaseBatchCopyResponse as TestcaseBatchCopyResponse,
    type TestcaseBatchDeleteResponse as TestcaseBatchDeleteResponse,
    type TestcaseCreateParams as TestcaseCreateParams,
    type TestcaseRetrieveParams as TestcaseRetrieveParams,
    type TestcaseUpdateParams as TestcaseUpdateParams,
    type TestcaseListParams as TestcaseListParams,
    type TestcaseDeleteParams as TestcaseDeleteParams,
    type TestcaseBatchCopyParams as TestcaseBatchCopyParams,
    type TestcaseBatchDeleteParams as TestcaseBatchDeleteParams,
  };
}
