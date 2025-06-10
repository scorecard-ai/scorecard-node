// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Versions extends APIResource {
  /**
   * Create a new version for a system.
   *
   * Each version contains specific parameter values that match the system's
   * `configSchema` - things like model parameters, thresholds, or processing
   * options. Once created, versions cannot be modified, ensuring stable reference
   * points for evaluations.
   *
   * When creating a system version:
   *
   * - The `config` object is validated against the parent system's `configSchema`.
   * - System versions with validation errors are still stored, with errors included
   *   in the response.
   * - Validation errors indicate fields that don't match the schema but don't
   *   prevent creation.
   * - Having validation errors may affect how some evaluation metrics are
   *   calculated.
   *
   * @example
   * ```ts
   * const systemVersion = await client.systems.versions.create(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   *   {
   *     config: {
   *       temperature: 0.1,
   *       maxTokens: 1024,
   *       model: 'gpt-4-turbo',
   *     },
   *     name: 'Production (Low Temperature)',
   *   },
   * );
   * ```
   */
  create(systemID: string, body: VersionCreateParams, options?: RequestOptions): APIPromise<SystemVersion> {
    return this._client.post(path`/systems/${systemID}/configs`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of system versions for a specific system.
   *
   * System versions provide concrete parameter values for a System Under Test,
   * defining exactly how the system should be configured during an evaluation run.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const systemVersion of client.systems.versions.list(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    systemID: string,
    query: VersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SystemVersionsPaginatedResponse, SystemVersion> {
    return this._client.getAPIList(path`/systems/${systemID}/configs`, PaginatedResponse<SystemVersion>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a specific system version by ID.
   *
   * @example
   * ```ts
   * const systemVersion = await client.systems.versions.get(
   *   '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0',
   * );
   * ```
   */
  get(systemVersionID: string, options?: RequestOptions): APIPromise<SystemVersion> {
    return this._client.get(path`/systems/configs/${systemVersionID}`, options);
  }
}

export type SystemVersionsPaginatedResponse = PaginatedResponse<SystemVersion>;

/**
 * A SystemVersion defines the specific settings for a System Under Test.
 *
 * System versions contain parameter values that determine system behavior during
 * evaluation. They are immutable snapshots - once created, they never change.
 *
 * When running evaluations, you reference a specific systemVersionId to establish
 * which system version to test.
 *
 * System versions will be validated against the system's configSchema, with
 * non-conforming values generating warnings.
 */
export interface SystemVersion {
  /**
   * The ID of the system version.
   */
  id: string;

  /**
   * The configuration of the system version.
   */
  config: Record<string, unknown>;

  /**
   * The name of the system version.
   */
  name: string;

  /**
   * The ID of the system the system version belongs to.
   */
  systemId: string;

  /**
   * Validation errors found in the system version. If present, the system version
   * doesn't fully conform to its system's configSchema.
   */
  validationErrors?: Array<SystemVersion.ValidationError>;
}

export namespace SystemVersion {
  export interface ValidationError {
    /**
     * Human-readable error description.
     */
    message: string;

    /**
     * JSON Pointer to the field with the validation error.
     */
    path: string;
  }
}

export interface VersionCreateParams {
  /**
   * The configuration of the system version.
   */
  config: Record<string, unknown>;

  /**
   * The name of the system version.
   */
  name: string;
}

export interface VersionListParams extends PaginatedResponseParams {}

export declare namespace Versions {
  export {
    type SystemVersion as SystemVersion,
    type SystemVersionsPaginatedResponse as SystemVersionsPaginatedResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionListParams as VersionListParams,
  };
}
