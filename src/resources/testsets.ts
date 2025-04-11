// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Testsets extends APIResource {
  /**
   * Create a new testset for a project. The testset will be created in the project
   * specified in the path.
   */
  create(projectID: string, body: TestsetCreateParams, options?: RequestOptions): APIPromise<Testset> {
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
    testsetID: string,
    body: TestsetUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Testset> {
    return this._client.patch(path`/testsets/${testsetID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of testsets belonging to a project.
   */
  list(
    projectID: string,
    query: TestsetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TestsetsPaginatedResponse, Testset> {
    return this._client.getAPIList(path`/projects/${projectID}/testsets`, PaginatedResponse<Testset>, {
      query,
      ...options,
    });
  }

  /**
   * Delete testset
   */
  delete(testsetID: string, options?: RequestOptions): APIPromise<TestsetDeleteResponse> {
    return this._client.delete(path`/testsets/${testsetID}`, options);
  }

  /**
   * Get testset by ID
   */
  get(testsetID: string, options?: RequestOptions): APIPromise<Testset> {
    return this._client.get(path`/testsets/${testsetID}`, options);
  }
}

export type TestsetsPaginatedResponse = PaginatedResponse<Testset>;

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
export interface Testset {
  /**
   * The ID of the testset
   */
  id: string;

  /**
   * The description of the testset
   */
  description: string;

  /**
   * Maps top-level keys of the testcase schema to their roles (input/label).
   * Unmapped fields are treated as metadata.
   */
  fieldMapping: Testset.FieldMapping;

  /**
   * The name of the testset
   */
  name: string;

  schema: Record<string, unknown>;
}

export namespace Testset {
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
  schema: Record<string, unknown>;
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
  schema?: Record<string, unknown>;
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

export declare namespace Testsets {
  export {
    type Testset as Testset,
    type TestsetDeleteResponse as TestsetDeleteResponse,
    type TestsetsPaginatedResponse as TestsetsPaginatedResponse,
    type TestsetCreateParams as TestsetCreateParams,
    type TestsetUpdateParams as TestsetUpdateParams,
    type TestsetListParams as TestsetListParams,
  };
}
