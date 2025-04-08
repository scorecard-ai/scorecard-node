// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { TestcasesPaginatedResponse, TestsetsPaginatedResponse } from './shared';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Testsets extends APIResource {
  /**
   * Create a new testset for a project. The testset will be created in the project
   * specified in the path.
   */
  create(projectID: number, body: TestsetCreateParams, options?: RequestOptions): APIPromise<Shared.Testset> {
    return this._client.post(path`/projects/${projectID}/testsets`, { body, ...options });
  }

  /**
   * Update a testset. Only the fields provided in the request body will be updated.
   * If a field is provided, the new content will replace the existing content. If a
   * field is not provided, the existing content will remain unchanged.
   *
   * When updating the schema:
   *
   * - If field mappings are not provided and existing mappings reference fields that
   *   no longer exist, those mappings will be automatically removed
   * - To preserve all existing mappings, ensure all referenced fields remain in the
   *   updated schema
   * - For complete control, provide both schema and fieldMapping when updating the
   *   schema
   */
  update(
    testsetID: number,
    body: TestsetUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.Testset> {
    return this._client.patch(path`/testsets/${testsetID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of testsets belonging to a project.
   */
  list(
    projectID: number,
    query: TestsetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TestsetsPaginatedResponse, Shared.Testset> {
    return this._client.getAPIList(path`/projects/${projectID}/testsets`, PaginatedResponse<Shared.Testset>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a testset
   */
  delete(testsetID: number, options?: RequestOptions): APIPromise<TestsetDeleteResponse> {
    return this._client.delete(path`/testsets/${testsetID}`, options);
  }

  /**
   * Create multiple testcases in the specified testset.
   */
  createTestcases(
    testsetID: number,
    body: TestsetCreateTestcasesParams,
    options?: RequestOptions,
  ): APIPromise<TestsetCreateTestcasesResponse> {
    return this._client.post(path`/testsets/${testsetID}/testcases`, { body, ...options });
  }

  /**
   * Delete multiple testcases from the specified testset.
   */
  deleteTestcases(
    testsetID: number,
    body: TestsetDeleteTestcasesParams,
    options?: RequestOptions,
  ): APIPromise<TestsetDeleteTestcasesResponse> {
    return this._client.delete(path`/testsets/${testsetID}/testcases`, { body, ...options });
  }

  /**
   * Get a testset by ID
   */
  get(testsetID: number, options?: RequestOptions): APIPromise<Shared.Testset> {
    return this._client.get(path`/testsets/${testsetID}`, options);
  }

  /**
   * Retrieve a paginated list of testcases belonging to a testset.
   */
  listTestcases(
    testsetID: number,
    query: TestsetListTestcasesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TestcasesPaginatedResponse, Shared.Testcase> {
    return this._client.getAPIList(
      path`/testsets/${testsetID}/testcases`,
      PaginatedResponse<Shared.Testcase>,
      { query, ...options },
    );
  }
}

export interface TestsetDeleteResponse {
  /**
   * Whether the deletion was successful
   */
  success: boolean;
}

export interface TestsetCreateTestcasesResponse {
  items: Array<Shared.Testcase>;
}

export interface TestsetDeleteTestcasesResponse {
  /**
   * Number of testcases successfully deleted
   */
  deletedCount: number;

  /**
   * List of errors encountered during deletion, if any
   */
  errors: Array<TestsetDeleteTestcasesResponse.Error>;
}

export namespace TestsetDeleteTestcasesResponse {
  export interface Error {
    /**
     * ID of the testcase that failed to be deleted
     */
    id: number;

    /**
     * Error message explaining why the deletion failed
     */
    message: string;
  }
}

export interface TestsetCreateParams {
  /**
   * The description of the testset
   */
  description: string;

  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  fieldMapping: TestsetCreateParams.FieldMapping;

  /**
   * The name of the testset
   */
  name: string;

  /**
   * The JSON schema for each testcase in the testset
   */
  schema: unknown;
}

export namespace TestsetCreateParams {
  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  export interface FieldMapping {
    /**
     * Fields that represent inputs to the AI system
     */
    inputs: Array<string>;

    /**
     * Fields that represent expected outputs/labels
     */
    labels: Array<string>;

    /**
     * Fields that are not inputs or labels
     */
    metadata: Array<string>;
  }
}

export interface TestsetUpdateParams {
  /**
   * The description of the testset
   */
  description?: string;

  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  fieldMapping?: TestsetUpdateParams.FieldMapping;

  /**
   * The name of the testset
   */
  name?: string;

  /**
   * The JSON schema for each testcase in the testset
   */
  schema?: unknown;
}

export namespace TestsetUpdateParams {
  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  export interface FieldMapping {
    /**
     * Fields that represent inputs to the AI system
     */
    inputs: Array<string>;

    /**
     * Fields that represent expected outputs/labels
     */
    labels: Array<string>;

    /**
     * Fields that are not inputs or labels
     */
    metadata: Array<string>;
  }
}

export interface TestsetListParams extends PaginatedResponseParams {}

export interface TestsetCreateTestcasesParams {
  /**
   * Testcases to create (max 100)
   */
  items: Array<TestsetCreateTestcasesParams.Item>;
}

export namespace TestsetCreateTestcasesParams {
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
    data: Record<string, Record<string, unknown>>;
  }
}

export interface TestsetDeleteTestcasesParams {
  /**
   * IDs of testcases to delete (max 100)
   */
  ids: Array<number>;
}

export interface TestsetListTestcasesParams extends PaginatedResponseParams {}

export declare namespace Testsets {
  export {
    type TestsetDeleteResponse as TestsetDeleteResponse,
    type TestsetCreateTestcasesResponse as TestsetCreateTestcasesResponse,
    type TestsetDeleteTestcasesResponse as TestsetDeleteTestcasesResponse,
    type TestsetCreateParams as TestsetCreateParams,
    type TestsetUpdateParams as TestsetUpdateParams,
    type TestsetListParams as TestsetListParams,
    type TestsetCreateTestcasesParams as TestsetCreateTestcasesParams,
    type TestsetDeleteTestcasesParams as TestsetDeleteTestcasesParams,
    type TestsetListTestcasesParams as TestsetListTestcasesParams,
  };
}

export { type TestsetsPaginatedResponse, type TestcasesPaginatedResponse };
