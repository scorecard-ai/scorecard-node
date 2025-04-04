// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TestrecordAPI from './testrecord/testrecord';
import {
  Testrecord,
  TestrecordCreateParams,
  TestrecordResource,
  TestrecordRetrieveParams,
} from './testrecord/testrecord';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class RunResource extends APIResource {
  testrecord: TestrecordAPI.TestrecordResource = new TestrecordAPI.TestrecordResource(this._client);

  /**
   * Create a new Run
   */
  create(body: RunCreateParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post('/v1/run', { body, ...options });
  }

  /**
   * Retrieve a Run metadata
   */
  retrieve(runID: number, options?: RequestOptions): APIPromise<Run> {
    return this._client.get(path`/v1/run/${runID}`, options);
  }

  /**
   * Update the status of a run.
   */
  updateStatus(runID: number, body: RunUpdateStatusParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.patch(path`/v1/run/${runID}/status`, { body, ...options });
  }
}

export interface Run {
  id?: number;

  /**
   * The creation date and time of the run.
   */
  created_at?: string | null;

  /**
   * The end time of the run.
   */
  execution_end_time?: string | null;

  /**
   * The start time of the run.
   */
  execution_start_time?: string | null;

  /**
   * The maximum number of testcases to run.
   */
  limit_testcases?: number | null;

  /**
   * The model parameters used when generating the run.
   */
  model_params?: unknown | null;

  /**
   * Notes about the run.
   */
  notes?: string | null;

  prompt_id?: string | null;

  /**
   * The prompt template to be used while executing the run.
   */
  prompt_template?: string | null;

  /**
   * The ID of the scoring configuration the run uses.
   */
  scoring_config_id?: number | null;

  /**
   * The end time of scoring the run's results.
   */
  scoring_end_time?: string | null;

  /**
   * The start time of scoring the run's results.
   */
  scoring_start_time?: string | null;

  /**
   * How the run was created.
   */
  source?: string | null;

  /**
   * The current status of the run.
   */
  status?: string | null;

  /**
   * The testset that was executed in this run.
   */
  testset_id?: number | null;

  /**
   * The last time the run was updated.
   */
  updated_at?: string | null;
}

export interface RunCreateParams {
  metrics?: Array<number> | null;

  /**
   * Optional. The model parameters to use for this run.
   */
  model_params?: unknown | null;

  notes?: string | null;

  prompt_id?: string | null;

  prompt_template?: string | null;

  scoring_config_id?: number | null;

  source?: string;

  status?: string;

  testset_id?: number | null;
}

export interface RunUpdateStatusParams {
  status?:
    | 'pending'
    | 'awaiting_execution'
    | 'running_execution'
    | 'awaiting_scoring'
    | 'running_scoring'
    | 'awaiting_human_scoring'
    | 'completed';
}

RunResource.TestrecordResource = TestrecordResource;

export declare namespace RunResource {
  export {
    type Run as Run,
    type RunCreateParams as RunCreateParams,
    type RunUpdateStatusParams as RunUpdateStatusParams,
  };

  export {
    TestrecordResource as TestrecordResource,
    type Testrecord as Testrecord,
    type TestrecordCreateParams as TestrecordCreateParams,
    type TestrecordRetrieveParams as TestrecordRetrieveParams,
  };
}
