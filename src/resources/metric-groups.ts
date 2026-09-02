// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class MetricGroups extends APIResource {
  /**
   * Create a new Metric Group referencing Metrics in the same Project.
   *
   * @example
   * ```ts
   * const metricGroup = await client.metricGroups.create(
   *   '314',
   *   {
   *     metricIds: ['321', '322'],
   *     name: 'Accuracy Metrics',
   *     description: 'Metrics that evaluate factual accuracy',
   *   },
   * );
   * ```
   */
  create(
    projectID: string,
    body: MetricGroupCreateParams,
    options?: RequestOptions,
  ): APIPromise<MetricGroup> {
    return this._client.post(path`/projects/${projectID}/metric-groups`, { body, ...options });
  }

  /**
   * Update a Metric Group's name, description, or member Metrics. The `metricIds`
   * array replaces the group's current set of Metrics.
   *
   * @example
   * ```ts
   * const metricGroup = await client.metricGroups.update(
   *   '612',
   *   { metricIds: ['321'], name: 'Quality Metrics' },
   * );
   * ```
   */
  update(
    metricGroupID: string,
    body: MetricGroupUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricGroup> {
    return this._client.patch(path`/metric-groups/${metricGroupID}`, { body, ...options });
  }

  /**
   * List Metric Groups configured for the specified Project. Metric Groups are
   * returned in reverse chronological order.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const metricGroup of client.metricGroups.list(
   *   '314',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    projectID: string,
    query: MetricGroupListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MetricGroupsPaginatedResponse, MetricGroup> {
    return this._client.getAPIList(
      path`/projects/${projectID}/metric-groups`,
      PaginatedResponse<MetricGroup>,
      { query, ...options },
    );
  }

  /**
   * Delete a specific Metric Group by ID. The Metrics in the group are not deleted.
   *
   * @example
   * ```ts
   * const metricGroup = await client.metricGroups.delete('612');
   * ```
   */
  delete(metricGroupID: string, options?: RequestOptions): APIPromise<MetricGroupDeleteResponse> {
    return this._client.delete(path`/metric-groups/${metricGroupID}`, options);
  }

  /**
   * Retrieve a specific Metric Group by ID.
   *
   * @example
   * ```ts
   * const metricGroup = await client.metricGroups.get('612');
   * ```
   */
  get(metricGroupID: string, options?: RequestOptions): APIPromise<MetricGroup> {
    return this._client.get(path`/metric-groups/${metricGroupID}`, options);
  }
}

export type MetricGroupsPaginatedResponse = PaginatedResponse<MetricGroup>;

/**
 * A Metric Group is a named collection of Metrics within a Project, used to score
 * or compare records with a consistent set of Metrics.
 */
export interface MetricGroup {
  /**
   * The ID of the Metric Group.
   */
  id: string;

  /**
   * The ISO 8601 timestamp when the Metric Group was created.
   */
  createdAt: string;

  /**
   * The description of the Metric Group.
   */
  description: string;

  /**
   * The IDs of the Metrics in the group.
   */
  metricIds: Array<string>;

  /**
   * The name of the Metric Group.
   */
  name: string;

  /**
   * The ID of the Project the Metric Group belongs to.
   */
  projectId: string;

  /**
   * The ISO 8601 timestamp when the Metric Group was last updated.
   */
  updatedAt: string;
}

export interface MetricGroupDeleteResponse {
  /**
   * Whether the deletion was successful.
   */
  success: boolean;
}

export interface MetricGroupCreateParams {
  /**
   * The IDs of the Metrics to include in the group. Every Metric must belong to the
   * same Project as the group.
   */
  metricIds: Array<string>;

  /**
   * The name of the Metric Group.
   */
  name: string;

  /**
   * The description of the Metric Group.
   */
  description?: string;
}

export interface MetricGroupUpdateParams {
  /**
   * The new description of the Metric Group.
   */
  description?: string;

  /**
   * The new set of Metric IDs for the group, replacing the current set. Every Metric
   * must belong to the same Project as the group.
   */
  metricIds?: Array<string>;

  /**
   * The new name of the Metric Group.
   */
  name?: string;
}

export interface MetricGroupListParams extends PaginatedResponseParams {}

export declare namespace MetricGroups {
  export {
    type MetricGroup as MetricGroup,
    type MetricGroupDeleteResponse as MetricGroupDeleteResponse,
    type MetricGroupsPaginatedResponse as MetricGroupsPaginatedResponse,
    type MetricGroupCreateParams as MetricGroupCreateParams,
    type MetricGroupUpdateParams as MetricGroupUpdateParams,
    type MetricGroupListParams as MetricGroupListParams,
  };
}
