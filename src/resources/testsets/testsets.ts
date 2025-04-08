// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TestcasesAPI from './testcases';
import {
  TestcaseCreateParams,
  TestcaseCreateResponse,
  TestcaseDeleteParams,
  TestcaseDeleteResponse,
  TestcaseListParams,
  TestcaseListResponse,
  TestcaseListResponsesPaginatedResponse,
  Testcases,
} from './testcases';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Testsets extends APIResource {
  testcases: TestcasesAPI.Testcases = new TestcasesAPI.Testcases(this._client);

  /**
   * Get a testset by ID
   */
  retrieve(testsetID: number, options?: RequestOptions): APIPromise<TestsetRetrieveResponse> {
    return this._client.get(path`/testsets/${testsetID}`, options);
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
  ): APIPromise<TestsetUpdateResponse> {
    return this._client.patch(path`/testsets/${testsetID}`, { body, ...options });
  }

  /**
   * Delete a testset
   */
  delete(testsetID: number, options?: RequestOptions): APIPromise<TestsetDeleteResponse> {
    return this._client.delete(path`/testsets/${testsetID}`, options);
  }
}

/**
 * A collection of test cases that share the same schema. Each testset defines the
 * structure of its test cases through a JSON schema. The `fieldMapping` object
 * maps top-level keys of the testcase schema to their roles (input/label). Fields
 * not mentioned in the `fieldMapping` during creation or update are treated as
 * metadata.
 *
 * ## JSON Schema validation constraints supported:
 *
 * - **Required fields** - Fields listed in the schema's `required` array must be
 *   present in testcases
 * - **Type validation** - Values must match the specified type (string, number,
 *   boolean, null, integer, object, array)
 * - **Enum validation** - Values must be one of the options specified in the
 *   `enum` array
 * - **Object property validation** - Properties of objects must conform to their
 *   defined schemas
 * - **Array item validation** - Items in arrays must conform to the `items` schema
 * - **Logical composition** - Values must conform to at least one schema in the
 *   `anyOf` array
 *
 * Testcases that fail validation will still be stored, but will include
 * `validationErrors` detailing the issues. Extra fields in the testcase data that
 * are not in the schema will be stored but are ignored during validation.
 */
export interface TestsetRetrieveResponse {
  /**
   * The ID of the testset
   */
  id: number;

  /**
   * The description of the testset
   */
  description: string;

  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  fieldMapping: TestsetRetrieveResponse.FieldMapping;

  /**
   * The name of the testset
   */
  name: string;

  schema: unknown;
}

export namespace TestsetRetrieveResponse {
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

/**
 * A collection of test cases that share the same schema. Each testset defines the
 * structure of its test cases through a JSON schema. The `fieldMapping` object
 * maps top-level keys of the testcase schema to their roles (input/label). Fields
 * not mentioned in the `fieldMapping` during creation or update are treated as
 * metadata.
 *
 * ## JSON Schema validation constraints supported:
 *
 * - **Required fields** - Fields listed in the schema's `required` array must be
 *   present in testcases
 * - **Type validation** - Values must match the specified type (string, number,
 *   boolean, null, integer, object, array)
 * - **Enum validation** - Values must be one of the options specified in the
 *   `enum` array
 * - **Object property validation** - Properties of objects must conform to their
 *   defined schemas
 * - **Array item validation** - Items in arrays must conform to the `items` schema
 * - **Logical composition** - Values must conform to at least one schema in the
 *   `anyOf` array
 *
 * Testcases that fail validation will still be stored, but will include
 * `validationErrors` detailing the issues. Extra fields in the testcase data that
 * are not in the schema will be stored but are ignored during validation.
 */
export interface TestsetUpdateResponse {
  /**
   * The ID of the testset
   */
  id: number;

  /**
   * The description of the testset
   */
  description: string;

  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  fieldMapping: TestsetUpdateResponse.FieldMapping;

  /**
   * The name of the testset
   */
  name: string;

  schema: unknown;
}

export namespace TestsetUpdateResponse {
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

export interface TestsetDeleteResponse {
  /**
   * Whether the deletion was successful
   */
  success: boolean;
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

Testsets.Testcases = Testcases;

export declare namespace Testsets {
  export {
    type TestsetRetrieveResponse as TestsetRetrieveResponse,
    type TestsetUpdateResponse as TestsetUpdateResponse,
    type TestsetDeleteResponse as TestsetDeleteResponse,
    type TestsetUpdateParams as TestsetUpdateParams,
  };

  export {
    Testcases as Testcases,
    type TestcaseCreateResponse as TestcaseCreateResponse,
    type TestcaseListResponse as TestcaseListResponse,
    type TestcaseDeleteResponse as TestcaseDeleteResponse,
    type TestcaseListResponsesPaginatedResponse as TestcaseListResponsesPaginatedResponse,
    type TestcaseCreateParams as TestcaseCreateParams,
    type TestcaseListParams as TestcaseListParams,
    type TestcaseDeleteParams as TestcaseDeleteParams,
  };
}
