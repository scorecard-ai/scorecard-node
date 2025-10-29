// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Runs extends APIResource {
  /**
   * Create a new Run.
   *
   * @example
   * ```ts
   * const run = await client.runs.create('314', {
   *   metricIds: ['789', '101'],
   *   systemVersionId: '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0',
   *   testsetId: '246',
   * });
   * ```
   */
  create(projectID: string, body: RunCreateParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post(path`/projects/${projectID}/runs`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of all Runs for a Project. Runs are ordered by
   * creation date, most recent first.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const run of client.runs.list('314')) {
   *   // ...
   * }
   * ```
   */
  list(
    projectID: string,
    query: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RunsPaginatedResponse, Run> {
    return this._client.getAPIList(path`/projects/${projectID}/runs`, PaginatedResponse<Run>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a specific Run by ID.
   *
   * @example
   * ```ts
   * const run = await client.runs.get('135');
   * ```
   */
  get(runID: string, options?: RequestOptions): APIPromise<Run> {
    return this._client.get(path`/runs/${runID}`, options);
  }
}

export type RunsPaginatedResponse = PaginatedResponse<Run>;

/**
 * A Run in the Scorecard system.
 */
export interface Run {
  /**
   * The ID of the Run.
   */
  id: string;

  /**
   * The IDs of the metrics this Run is using.
   */
  metricIds: Array<string>;

  /**
   * The IDs of the metric versions this Run is using.
   */
  metricVersionIds: Array<string>;

  /**
   * The number of expected records in the Run. Determined by the number of testcases
   * in the Run's Testset at the time of Run creation.
   */
  numExpectedRecords: number | null;

  /**
   * The number of records in the Run.
   */
  numRecords: number;

  /**
   * The number of completed scores in the Run so far.
   */
  numScores: number;

  /**
   * The status of the Run.
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
   * The ID of the system this Run is using.
   */
  systemId: string | null;

  /**
   * The ID of the system version this Run is using.
   */
  systemVersionId: string | null;

  /**
   * The ID of the Testset this Run is testing.
   */
  testsetId: string | null;
}

export interface RunCreateParams {
  /**
   * The IDs of the metrics this Run is using.
   */
  metricIds: Array<string>;

  /**
   * The ID of the system version this Run is using.
   */
  systemVersionId?: string | null;

  /**
   * The ID of the Testset this Run is testing.
   */
  testsetId?: string | null;
}

export interface RunListParams extends PaginatedResponseParams {}

export declare namespace Runs {
  export {
    type Run as Run,
    type RunsPaginatedResponse as RunsPaginatedResponse,
    type RunCreateParams as RunCreateParams,
    type RunListParams as RunListParams,
  };
}
