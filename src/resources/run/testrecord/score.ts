// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Score extends APIResource {
  /**
   * Create a score
   */
  create(testrecordID: number, params: ScoreCreateParams, options?: RequestOptions): APIPromise<Grade> {
    const { run_id, ...body } = params;
    return this._client.post(path`/v1/run/${run_id}/testrecord/${testrecordID}/score`, { body, ...options });
  }

  /**
   * Update a score
   */
  update(scoreID: number, params: ScoreUpdateParams, options?: RequestOptions): APIPromise<Grade> {
    const { run_id, testrecord_id, ...body } = params;
    return this._client.patch(path`/v1/run/${run_id}/testrecord/${testrecord_id}/score/${scoreID}`, {
      body,
      ...options,
    });
  }
}

export interface Grade {
  /**
   * The ID of the grade.
   */
  id?: number | null;

  /**
   * The binary score assigned to the grade.
   */
  binary_score?: boolean | null;

  /**
   * when the grade was created.
   */
  created_at?: string | null;

  /**
   * The error message if the grade was not created successfully.
   */
  error_message?: string | null;

  /**
   * Indicates if a human should assign a grade.
   */
  human_eval?: boolean;

  /**
   * The integer score assigned to the grade.
   */
  int_score?: number | null;

  /**
   * The ID of the metric used to compute the grade.
   */
  metric_id?: number | null;

  /**
   * The reasoning for the assigned score.
   */
  reasoning?: string | null;

  /**
   * The ID of the run that created the grade.
   */
  run_id?: number | null;

  /**
   * The status of the grade.
   */
  status?: 'pending' | 'error' | 'completed';

  /**
   * The ID of the testcase associated with the grade.
   */
  testcase_id?: number | null;

  /**
   * The ID of the testrecord for which the grade was created.
   */
  testrecord_id?: number | null;

  /**
   * when the grade was last updated.
   */
  updated_at?: string | null;

  user_id?: string | null;
}

export interface ScoreCreateParams {
  /**
   * Path param: The ID of the run that created the testrecord to be scored.
   */
  run_id: number;

  /**
   * Body param: Specify boolean scores.
   */
  binary_score: boolean | null;

  /**
   * Body param: Specify integer scores.
   */
  int_score: number | null;

  /**
   * Body param: The ID of the metric
   */
  metric_id: number;

  /**
   * Body param: The reasoning for the assigned score.
   */
  reasoning: string | null;
}

export interface ScoreUpdateParams {
  /**
   * Path param: The run ID that created the test record to be scored.
   */
  run_id: number;

  /**
   * Path param: The ID of the testrecord whose score will be updated.
   */
  testrecord_id: number;

  /**
   * Body param: The new boolean score to assign.
   */
  binary_score: boolean | null;

  /**
   * Body param: The new integer score to assign.
   */
  int_score: number | null;

  /**
   * Body param: The reasoning for the score update.
   */
  reasoning: string | null;
}

export declare namespace Score {
  export {
    type Grade as Grade,
    type ScoreCreateParams as ScoreCreateParams,
    type ScoreUpdateParams as ScoreUpdateParams,
  };
}
