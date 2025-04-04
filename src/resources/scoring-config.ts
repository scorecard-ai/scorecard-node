// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ScoringConfigResource extends APIResource {
  /**
   * Create a new scoring config.
   */
  create(body: ScoringConfigCreateParams, options?: RequestOptions): APIPromise<ScoringConfig> {
    return this._client.post('/v1/scoring_config', { body, ...options });
  }

  /**
   * Retrieve a scoring config by id
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ScoringConfig> {
    return this._client.get(path`/v1/scoring_config/${id}`, options);
  }

  /**
   * Delete a scoring config.
   */
  delete(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/scoring_config/${id}`, options);
  }
}

export interface ScoringConfig {
  id?: number | null;

  config?: unknown | null;

  created_at?: string | null;

  description?: string | null;

  is_archived?: boolean | null;

  metrics?: Array<number> | null;

  name?: string | null;

  /**
   * The organization this resource belongs to.
   */
  org_id?: string | null;

  /**
   * The ID of the project the scoring config belongs to.
   */
  project_id?: number | null;

  /**
   * The user this record belongs to.
   */
  user_id?: string | null;
}

export type ScoringConfigDeleteResponse = unknown;

export interface ScoringConfigCreateParams {
  description?: string | null;

  metrics?: Array<number> | null;

  name?: string | null;

  project_id?: number;
}

export declare namespace ScoringConfigResource {
  export {
    type ScoringConfig as ScoringConfig,
    type ScoringConfigDeleteResponse as ScoringConfigDeleteResponse,
    type ScoringConfigCreateParams as ScoringConfigCreateParams,
  };
}
