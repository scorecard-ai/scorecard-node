// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Testcases extends APIResource {
  /**
   * Create multiple Testcases in the specified Testset.
   *
   * @example
   * ```ts
   * const testcase = await client.testcases.create('246', {
   *   items: [
   *     {
   *       jsonData: {
   *         question: 'What is the capital of France?',
   *         idealAnswer: 'Paris',
   *         provenance: 'hand_curated',
   *       },
   *     },
   *     {
   *       jsonData: {
   *         question:
   *           'What is the largest planet in our solar system?',
   *         idealAnswer: 'Jupiter',
   *         provenance: 'synthetic',
   *       },
   *     },
   *     {
   *       jsonData: {
   *         question:
   *           'How many planets are in our solar system?',
   *         idealAnswer: 8,
   *         provenance: 'user_feedback',
   *       },
   *     },
   *   ],
   * });
   * ```
   */
  create(
    testsetID: string,
    body: TestcaseCreateParams,
    options?: RequestOptions,
  ): APIPromise<TestcaseCreateResponse> {
    return this._client.post(path`/testsets/${testsetID}/testcases`, { body, ...options });
  }

  /**
   * Replace the data of an existing Testcase while keeping its ID.
   *
   * @example
   * ```ts
   * const testcase = await client.testcases.update('248', {
   *   jsonData: {
   *     question: 'What is the capital of France?',
   *     idealAnswer: 'Paris is the capital of France',
   *     provenance: 'hand_curated',
   *   },
   * });
   * ```
   */
  update(testcaseID: string, body: TestcaseUpdateParams, options?: RequestOptions): APIPromise<Testcase> {
    return this._client.put(path`/testcases/${testcaseID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of Testcases belonging to a Testset.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const testcase of client.testcases.list('246')) {
   *   // ...
   * }
   * ```
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
   * Delete multiple Testcases by their IDs.
   *
   * @example
   * ```ts
   * const testcase = await client.testcases.delete({
   *   ids: ['123', '124', '125'],
   * });
   * ```
   */
  delete(body: TestcaseDeleteParams, options?: RequestOptions): APIPromise<TestcaseDeleteResponse> {
    return this._client.post('/testcases/bulk-delete', { body, ...options });
  }

  /**
   * Retrieve a specific Testcase by ID.
   *
   * @example
   * ```ts
   * const testcase = await client.testcases.get('248');
   * ```
   */
  get(testcaseID: string, options?: RequestOptions): APIPromise<Testcase> {
    return this._client.get(path`/testcases/${testcaseID}`, options);
  }
}

export type TestcasesPaginatedResponse = PaginatedResponse<Testcase>;

/**
 * A test case in the Scorecard system. Contains JSON data that is validated
 * against the schema defined by its Testset. The `inputs` and `expected` fields
 * are derived from the `data` field based on the Testset's `fieldMapping`, and
 * include all mapped fields, including those with validation errors. Testcases are
 * stored regardless of validation results, with any validation errors included in
 * the `validationErrors` field.
 */
export interface Testcase {
  /**
   * The ID of the Testcase.
   */
  id: string;

  /**
   * Derived from data based on the Testset's fieldMapping. Contains all fields
   * marked as expected outputs, including those with validation errors.
   */
  expected: { [key: string]: unknown };

  /**
   * Derived from data based on the Testset's fieldMapping. Contains all fields
   * marked as inputs, including those with validation errors.
   */
  inputs: { [key: string]: unknown };

  /**
   * The JSON data of the Testcase, which is validated against the Testset's schema.
   */
  jsonData: { [key: string]: unknown };

  /**
   * The ID of the Testset this Testcase belongs to.
   */
  testsetId: string;

  /**
   * Validation errors found in the Testcase data. If present, the Testcase doesn't
   * fully conform to its Testset's schema.
   */
  validationErrors?: Array<Testcase.ValidationError>;
}

export namespace Testcase {
  export interface ValidationError {
    /**
     * Human-readable error description.
     */
    message: string;

    /**
     * JSON Pointer to the field with the validation error.
     */
    path: string;
  }
}

export interface TestcaseCreateResponse {
  items: Array<Testcase>;
}

export interface TestcaseDeleteResponse {
  /**
   * Whether the deletion was successful.
   */
  success: boolean;
}

export interface TestcaseCreateParams {
  /**
   * Testcases to create (max 100).
   */
  items: Array<TestcaseCreateParams.Item>;
}

export namespace TestcaseCreateParams {
  export interface Item {
    /**
     * The JSON data of the Testcase, which is validated against the Testset's schema.
     */
    jsonData: { [key: string]: unknown };
  }
}

export interface TestcaseUpdateParams {
  /**
   * The JSON data of the Testcase, which is validated against the Testset's schema.
   */
  jsonData: { [key: string]: unknown };
}

export interface TestcaseListParams extends PaginatedResponseParams {}

export interface TestcaseDeleteParams {
  /**
   * IDs of Testcases to delete.
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
