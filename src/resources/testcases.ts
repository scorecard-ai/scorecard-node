// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Testcases extends APIResource {
  /**
   * Create multiple testcases in the specified testset.
   */
  create(
    testsetID: string,
    body: TestcaseCreateParams,
    options?: RequestOptions,
  ): APIPromise<TestcaseCreateResponse> {
    return this._client.post(path`/testsets/${testsetID}/testcases`, { body, ...options });
  }

  /**
   * Replace the data of an existing testcase while keeping its ID.
   */
  update(testcaseID: string, body: TestcaseUpdateParams, options?: RequestOptions): APIPromise<Testcase> {
    return this._client.put(path`/testcases/${testcaseID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of testcases belonging to a testset.
   */
  list(
    testsetID: string,
    query: TestcaseListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TestcasesPaginatedResponse, Testcase> {
    return this._client.getAPIList(path`/testsets/${testsetID}/testcases`, PaginatedResponse<Testcase>, {
      query,
      ...options,
    });
  }

  /**
   * Delete multiple testcases from the specified testset.
   */
  delete(
    testsetID: string,
    body: TestcaseDeleteParams,
    options?: RequestOptions,
  ): APIPromise<TestcaseDeleteResponse> {
    return this._client.delete(path`/testsets/${testsetID}/testcases`, { body, ...options });
  }

  /**
   * Retrieve a specific testcase by ID.
   */
  get(testcaseID: string, options?: RequestOptions): APIPromise<Testcase> {
    return this._client.get(path`/testcases/${testcaseID}`, options);
  }
}

export type TestcasesPaginatedResponse = PaginatedResponse<Testcase>;

/**
 * A test case in the Scorecard system. Contains JSON data that is validated
 * against the schema defined by its testset. The `inputs` and `labels` fields are
 * derived from the `data` field based on the testset's `fieldMapping`, and include
 * all mapped fields, including those with validation errors. Testcases are stored
 * regardless of validation results, with any validation errors included in the
 * `validationErrors` field.
 */
export interface Testcase {
  /**
   * The ID of the testcase
   */
  id: string;

  /**
   * The JSON data of the testcase, which is validated against the testset's schema.
   */
  data: Record<string, unknown>;

  /**
   * Derived from data based on the testset's fieldMapping. Contains all fields
   * marked as inputs, including those with validation errors.
   */
  inputs: Record<string, unknown>;

  /**
   * Derived from data based on the testset's fieldMapping. Contains all fields
   * marked as labels, including those with validation errors.
   */
  labels: Record<string, unknown>;

  /**
   * The ID of the testset this testcase belongs to
   */
  testsetId: string;

  /**
   * Validation errors found in the testcase data. If present, the testcase doesn't
   * fully conform to its testset's schema.
   */
  validationErrors?: Array<Testcase.ValidationError>;
}

export namespace Testcase {
  export interface ValidationError {
    /**
     * Human-readable error description
     */
    message: string;

    /**
     * JSON Pointer to the field with the validation error
     */
    path: string;
  }
}

export interface TestcaseCreateResponse {
  items: Array<Testcase>;
}

export interface TestcaseDeleteResponse {
  /**
   * Number of testcases successfully deleted
   */
  deletedCount: number;

  /**
   * List of errors encountered during deletion, if any
   */
  errors: Array<TestcaseDeleteResponse.Error>;
}

export namespace TestcaseDeleteResponse {
  export interface Error {
    /**
     * ID of the testcase that failed to be deleted
     */
    id: string;

    /**
     * Error message explaining why the deletion failed
     */
    message: string;
  }
}

export interface TestcaseCreateParams {
  /**
   * Testcases to create (max 100)
   */
  items: Array<TestcaseCreateParams.Item>;
}

export namespace TestcaseCreateParams {
  /**
   * A test case in the Scorecard system. Contains JSON data that is validated
   * against the schema defined by its testset. The `inputs` and `labels` fields are
   * derived from the `data` field based on the testset's `fieldMapping`, and include
   * all mapped fields, including those with validation errors. Testcases are stored
   * regardless of validation results, with any validation errors included in the
   * `validationErrors` field.
   */
  export interface Item {
    /**
     * The JSON data of the testcase, which is validated against the testset's schema.
     */
    data: Record<string, unknown>;
  }
}

export interface TestcaseUpdateParams {
  /**
   * The JSON data of the testcase, which is validated against the testset's schema.
   */
  data: Record<string, unknown>;
}

export interface TestcaseListParams extends PaginatedResponseParams {}

export interface TestcaseDeleteParams {
  /**
   * IDs of testcases to delete (max 100)
   */
  ids: Array<string>;
}

export declare namespace Testcases {
  export {
    type Testcase as Testcase,
    type TestcaseCreateResponse as TestcaseCreateResponse,
    type TestcaseDeleteResponse as TestcaseDeleteResponse,
    type TestcasesPaginatedResponse as TestcasesPaginatedResponse,
    type TestcaseCreateParams as TestcaseCreateParams,
    type TestcaseUpdateParams as TestcaseUpdateParams,
    type TestcaseListParams as TestcaseListParams,
    type TestcaseDeleteParams as TestcaseDeleteParams,
  };
}
