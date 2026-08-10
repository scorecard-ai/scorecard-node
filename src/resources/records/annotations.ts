// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Annotations extends APIResource {
  /**
   * List all annotations (ratings and comments) for a specific Record.
   *
   * @example
   * ```ts
   * const annotations = await client.records.annotations.list(
   *   '777',
   * );
   * ```
   */
  list(recordID: string, options?: RequestOptions): APIPromise<AnnotationListResponse> {
    return this._client.get(path`/records/${recordID}/annotations`, options);
  }
}

/**
 * An annotation on a Record, containing a rating (thumbs up/down) and/or a text
 * comment.
 */
export interface Annotation {
  /**
   * The ID of the Annotation.
   */
  id: string;

  /**
   * An optional text comment for the annotation.
   */
  comment: string | null;

  /**
   * The ISO 8601 timestamp when the annotation was created.
   */
  createdAt: string;

  /**
   * The rating of the annotation: true (positive), false (negative), or null (no
   * rating).
   */
  rating: boolean | null;

  /**
   * The ID of the Record this Annotation belongs to.
   */
  recordId: string;

  /**
   * Optional span ID linking this annotation to a specific span.
   */
  spanId: string | null;

  /**
   * The ID of the user who created the annotation.
   */
  userId: string;
}

export interface AnnotationListResponse {
  data: Array<Annotation>;
}

export declare namespace Annotations {
  export { type Annotation as Annotation, type AnnotationListResponse as AnnotationListResponse };
}
