// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Scores extends APIResource {
  /**
   * Create or update a Score for a given Record and MetricConfig. If a Score with
   * the specified Record ID and MetricConfig ID already exists, it will be updated.
   * Otherwise, a new Score will be created. The score provided should conform to the
   * schema defined by the MetricConfig; otherwise, validation errors will be
   * reported.
   *
   * @example
   * ```ts
   * const score = await client.scores.upsert(
   *   'a1b2c3d4-e5f6-7890-1234-567890abcdef',
   *   {
   *     recordId: '777',
   *     score: {
   *       value: true,
   *       reasoning: 'The response is correct',
   *     },
   *   },
   * );
   * ```
   */
  upsert(metricConfigID: string, params: ScoreUpsertParams, options?: RequestOptions): APIPromise<Score> {
    const { recordId, ...body } = params;
    return this._client.put(path`/records/${recordId}/scores/${metricConfigID}`, { body, ...options });
  }
}

/**
 * A Score represents the evaluation of a Record against a specific MetricConfig.
 * The actual `score` is stored as flexible JSON. While any JSON is accepted, it is
 * expected to conform to the output schema defined by the MetricConfig. Any
 * discrepancies will be noted in the `validationErrors` field, but the Score will
 * still be stored.
 */
export interface Score {
  /**
   * The ID of the MetricConfig this Score is for.
   */
  metricConfigId: string;

  /**
   * The ID of the Record this Score is for.
   */
  recordId: string;

  /**
   * The score of the Record, as arbitrary JSON. This data should ideally conform to
   * the output schema defined by the associated MetricConfig. If it doesn't,
   * validation errors will be captured in the `validationErrors` field.
   */
  score: { [key: string]: unknown };

  /**
   * Validation errors found in the Score data. If present, the Score doesn't fully
   * conform to its MetricConfig's schema.
   */
  validationErrors?: Array<Score.ValidationError>;
}

export namespace Score {
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

export interface ScoreUpsertParams {
  /**
   * Path param: The ID of the Record to upsert the Score for.
   */
  recordId: string;

  /**
   * Body param: The score of the Record, as arbitrary JSON. This data should ideally
   * conform to the output schema defined by the associated MetricConfig. If it
   * doesn't, validation errors will be captured in the `validationErrors` field.
   */
  score: { [key: string]: unknown };
}

export declare namespace Scores {
  export { type Score as Score, type ScoreUpsertParams as ScoreUpsertParams };
}
