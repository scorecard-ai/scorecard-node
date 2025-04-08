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

  schema: unknown;
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

export type TestcasesPaginatedResponse = PaginatedResponse<Testcase>;
