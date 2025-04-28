// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Runs extends APIResource {
  /**
   * Create a new run.
   */
  create(projectID: string, body: RunCreateParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post(path`/projects/${projectID}/runs`, { body, ...options });
  }

  /**
   * Update the status of a run.
   */
  update(runID: string, body: RunUpdateParams, options?: RequestOptions): APIPromise<RunUpdateResponse> {
    return this._client.patch(path`/runs/${runID}`, { body, ...options });
  }
}

/**
 * A Run in the Scorecard system.
 */
export interface Run {
  /**
   * The ID of the Run
   */
  id: string;

  /**
   * The IDs of the metrics this Run is using
   */
  metricIds: Array<string>;

  /**
   * The status of the Run
   */
  status:
    | 'pending'
    | 'awaiting_execution'
    | 'running_execution'
    | 'awaiting_scoring'
    | 'running_scoring'
    | 'awaiting_human_scoring'
    | 'completed';

  /**
   * The ID of the Testset this Run is testing
   */
  testsetId: string;

  /**
   * The ID of the system configuration this Run is using
   */
  systemConfigId?: string;
}

export interface RunUpdateResponse {
  /**
   * The ID of the Run
   */
  id: string;

  /**
   * The status of the Run
   */
  status:
    | 'pending'
    | 'awaiting_execution'
    | 'running_execution'
    | 'awaiting_scoring'
    | 'running_scoring'
    | 'awaiting_human_scoring'
    | 'completed';
}

export interface RunCreateParams {
  /**
   * The IDs of the metrics this Run is using
   */
  metricIds: Array<string>;

  /**
   * The ID of the Testset this Run is testing
   */
  testsetId: string;

  /**
   * The ID of the system configuration this Run is using
   */
  systemConfigId?: string;
}

export interface RunUpdateParams {
  /**
   * The status of the Run
   */
  status:
    | 'pending'
    | 'awaiting_execution'
    | 'running_execution'
    | 'awaiting_scoring'
    | 'running_scoring'
    | 'awaiting_human_scoring'
    | 'completed';
}

export declare namespace Runs {
  export {
    type Run as Run,
    type RunUpdateResponse as RunUpdateResponse,
    type RunCreateParams as RunCreateParams,
    type RunUpdateParams as RunUpdateParams,
  };
}
