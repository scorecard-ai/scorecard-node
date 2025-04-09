// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PaginatedResponse } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Testcases extends APIResource {
  /**
   * Replace the data of an existing testcase while keeping its ID.
   */
  update(testcaseID: number, body: TestcaseUpdateParams, options?: RequestOptions): APIPromise<Testcase> {
    return this._client.put(path`/testcases/${testcaseID}`, { body, ...options });
  }

  /**
   * Retrieve a specific testcase by ID.
   */
  get(testcaseID: number, options?: RequestOptions): APIPromise<Testcase> {
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
  id: number;

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
  testsetId: number;

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

export interface TestcaseUpdateParams {
  /**
   * The JSON data of the testcase, which is validated against the testset's schema.
   */
  data: Record<string, unknown>;
}

export declare namespace Testcases {
  export { type Testcase as Testcase, type TestcaseUpdateParams as TestcaseUpdateParams };
}
