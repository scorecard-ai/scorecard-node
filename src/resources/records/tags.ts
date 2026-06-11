// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tags extends APIResource {
  /**
   * Apply a tag to a Record. Idempotent: re-applying an existing tag returns the
   * existing tag.
   *
   * @example
   * ```ts
   * const recordTag = await client.records.tags.create('777', {
   *   text: 'urgent',
   * });
   * ```
   */
  create(recordID: string, body: TagCreateParams, options?: RequestOptions): APIPromise<RecordTag> {
    return this._client.post(path`/records/${recordID}/tags`, { body, ...options });
  }

  /**
   * List all tags applied to a specific Record.
   *
   * @example
   * ```ts
   * const tags = await client.records.tags.list('777');
   * ```
   */
  list(recordID: string, options?: RequestOptions): APIPromise<TagListResponse> {
    return this._client.get(path`/records/${recordID}/tags`, options);
  }

  /**
   * Remove a tag from a Record by its text.
   *
   * @example
   * ```ts
   * const tag = await client.records.tags.delete('urgent', {
   *   recordId: '777',
   * });
   * ```
   */
  delete(text: string, params: TagDeleteParams, options?: RequestOptions): APIPromise<TagDeleteResponse> {
    const { recordId } = params;
    return this._client.delete(path`/records/${recordId}/tags/${text}`, options);
  }
}

/**
 * An arbitrary tag applied to a Record (e.g. `urgent`, `regression`, `env:prod`),
 * either by a user or lifted from OTel span attributes at ingest.
 */
export interface RecordTag {
  /**
   * The ID of the tag.
   */
  id: string;

  /**
   * The ISO 8601 timestamp when the tag was created.
   */
  createdAt: string;

  /**
   * The ID of the Record this tag belongs to.
   */
  recordId: string;

  /**
   * How the tag was applied: `user` (UI, SDK, or REST) or `otel` (lifted from a span
   * attribute at ingest).
   */
  source: 'user' | 'otel';

  /**
   * The tag text. May encode key:value semantics with a colon (e.g. `env:prod`).
   */
  text: string;

  /**
   * The ID of the user who applied the tag; null for OTel-sourced tags.
   */
  userId: string | null;
}

export interface TagListResponse {
  data: Array<RecordTag>;
}

export interface TagDeleteResponse {
  /**
   * The number of tag rows removed (0 if the tag was not present).
   */
  deleted: number;
}

export interface TagCreateParams {
  /**
   * The tag text to apply. Idempotent: re-applying an existing tag is a no-op.
   */
  text: string;
}

export interface TagDeleteParams {
  /**
   * The ID of the Record to remove the tag from.
   */
  recordId: string;
}

export declare namespace Tags {
  export {
    type RecordTag as RecordTag,
    type TagListResponse as TagListResponse,
    type TagDeleteResponse as TagDeleteResponse,
    type TagCreateParams as TagCreateParams,
    type TagDeleteParams as TagDeleteParams,
  };
}
