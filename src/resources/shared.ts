// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PaginatedResponse } from '../core/pagination';

/**
 * An API error
 */
export interface APIError {
  code: string;

  details: Record<string, unknown>;

  message: string;
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
export interface Testset {
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

export type TestsetsPaginatedResponse = PaginatedResponse<Testset>;
