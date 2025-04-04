// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class RunMetric extends APIResource {
  /**
   * Retrieve metrics associated with a run
   */
  retrieve(runID: number, options?: RequestOptions): APIPromise<RunMetricRetrieveResponse> {
    return this._client.get(path`/v1/run_metric/${runID}`, options);
  }
}

export type RunMetricRetrieveResponse = Array<RunMetricRetrieveResponse.RunMetricRetrieveResponseItem>;

export namespace RunMetricRetrieveResponse {
  export interface RunMetricRetrieveResponseItem {
    id?: number | null;

    created_at?: string | null;

    metric_id?: number | null;

    run_id?: number | null;
  }
}

export declare namespace RunMetric {
  export { type RunMetricRetrieveResponse as RunMetricRetrieveResponse };
}
