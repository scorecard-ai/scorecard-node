// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
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
   *   systemConfigId: '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0',
   *   testsetId: '246',
   * });
   * ```
   */
  create(projectID: string, body: RunCreateParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post(path`/projects/${projectID}/runs`, { body, ...options });
  }
}

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
   * The ID of the Testset this Run is testing.
   */
  testsetId: string | null;

  /**
   * The ID of the system configuration this Run is using.
   */
  systemConfigId?: string;
}

export interface RunCreateParams {
  /**
   * The IDs of the metrics this Run is using.
   */
  metricIds: Array<string>;

  /**
   * The ID of the system configuration this Run is using.
   */
  systemConfigId?: string;

  /**
   * The ID of the Testset this Run is testing.
   */
  testsetId?: string | null;
}

export declare namespace Runs {
  export { type Run as Run, type RunCreateParams as RunCreateParams };
}
