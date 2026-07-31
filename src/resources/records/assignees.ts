// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Assignees extends APIResource {
  /**
   * Assign an organization member to a Record. Idempotent: re-assigning an existing
   * member returns the existing assignment.
   *
   * @example
   * ```ts
   * const recordAssignment =
   *   await client.records.assignees.create('777', {
   *     assigneeUserId: 'user_2abc123',
   *   });
   * ```
   */
  create(
    recordID: string,
    body: AssigneeCreateParams,
    options?: RequestOptions,
  ): APIPromise<RecordAssignment> {
    return this._client.post(path`/records/${recordID}/assignees`, { body, ...options });
  }

  /**
   * List the organization members assigned to a Record.
   *
   * @example
   * ```ts
   * const assignees = await client.records.assignees.list(
   *   '777',
   * );
   * ```
   */
  list(recordID: string, options?: RequestOptions): APIPromise<AssigneeListResponse> {
    return this._client.get(path`/records/${recordID}/assignees`, options);
  }

  /**
   * Remove an assignee from a Record.
   *
   * @example
   * ```ts
   * const assignee = await client.records.assignees.delete(
   *   'user_2abc123',
   *   { recordId: '777' },
   * );
   * ```
   */
  delete(
    assigneeUserID: string,
    params: AssigneeDeleteParams,
    options?: RequestOptions,
  ): APIPromise<AssigneeDeleteResponse> {
    const { recordId } = params;
    return this._client.delete(path`/records/${recordId}/assignees/${assigneeUserID}`, options);
  }
}

/**
 * An assignment of an organization member to a Record.
 */
export interface RecordAssignment {
  /**
   * The ID of the record assignment.
   */
  id: string;

  /**
   * The ID of the user who created the assignment.
   */
  assignedByUserId: string;

  /**
   * The ID of the organization member assigned to the Record.
   */
  assigneeUserId: string;

  /**
   * The ISO 8601 timestamp when the assignment was created.
   */
  createdAt: string;

  /**
   * The ID of the Record this assignment belongs to.
   */
  recordId: string;
}

export interface AssigneeListResponse {
  data: Array<RecordAssignment>;
}

export interface AssigneeDeleteResponse {
  /**
   * The number of assignment rows removed (0 if the member was not assigned).
   */
  deleted: number;
}

export interface AssigneeCreateParams {
  /**
   * The ID of the organization member to assign. Idempotent: re-assigning an
   * existing member returns the existing assignment.
   */
  assigneeUserId: string;
}

export interface AssigneeDeleteParams {
  /**
   * The ID of the Record to unassign from.
   */
  recordId: string;
}

export declare namespace Assignees {
  export {
    type RecordAssignment as RecordAssignment,
    type AssigneeListResponse as AssigneeListResponse,
    type AssigneeDeleteResponse as AssigneeDeleteResponse,
    type AssigneeCreateParams as AssigneeCreateParams,
    type AssigneeDeleteParams as AssigneeDeleteParams,
  };
}
