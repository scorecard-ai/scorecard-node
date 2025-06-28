// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VersionsAPI from './versions';
import { SystemVersion, VersionUpsertParams, Versions } from './versions';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Systems extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Update an existing system. Only the fields provided in the request body will be
   * updated. If a field is provided, the new content will replace the existing
   * content. If a field is not provided, the existing content will remain unchanged.
   *
   * @example
   * ```ts
   * const system = await client.systems.update(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   *   {
   *     productionVersionId:
   *       '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf3',
   *   },
   * );
   * ```
   */
  update(
    systemID: string,
    body: SystemUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<System> {
    return this._client.patch(path`/systems/${systemID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of all systems. Systems are ordered by creation date.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const system of client.systems.list('314')) {
   *   // ...
   * }
   * ```
   */
  list(
    projectID: string,
    query: SystemListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SystemsPaginatedResponse, System> {
    return this._client.getAPIList(path`/projects/${projectID}/systems`, PaginatedResponse<System>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a system definition by ID. This will not delete associated system
   * versions.
   *
   * @example
   * ```ts
   * const system = await client.systems.delete(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   * );
   * ```
   */
  delete(systemID: string, options?: RequestOptions): APIPromise<SystemDeleteResponse> {
    return this._client.delete(path`/systems/${systemID}`, options);
  }

  /**
   * Retrieve a specific system by ID.
   *
   * @example
   * ```ts
   * const system = await client.systems.get(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   * );
   * ```
   */
  get(systemID: string, options?: RequestOptions): APIPromise<System> {
    return this._client.get(path`/systems/${systemID}`, options);
  }

  /**
   * Create a new system. If one with the same name in the project exists, it updates
   * it instead.
   *
   * @example
   * ```ts
   * const system = await client.systems.upsert('314', {
   *   config: { temperature: 0.1, maxTokens: 1024 },
   *   description: 'Production chatbot powered by GPT-4',
   *   name: 'GPT-4 Chatbot',
   * });
   * ```
   */
  upsert(projectID: string, body: SystemUpsertParams, options?: RequestOptions): APIPromise<System> {
    return this._client.post(path`/projects/${projectID}/systems`, { body, ...options });
  }
}

export type SystemsPaginatedResponse = PaginatedResponse<System>;

/**
 * A System Under Test (SUT).
 *
 * Systems are templates - to run evaluations, pair them with a SystemVersion that
 * provides specific parameter values.
 */
export interface System {
  /**
   * The ID of the system.
   */
  id: string;

  /**
   * The description of the system.
   */
  description: string;

  /**
   * The name of the system. Unique within the project.
   */
  name: string;

  /**
   * The production version of the system.
   */
  productionVersion: VersionsAPI.SystemVersion;

  /**
   * The versions of the system.
   */
  versions: Array<System.Version>;
}

export namespace System {
  /**
   * A SystemVersion defines the specific settings for a System Under Test.
   *
   * System versions contain parameter values that determine system behavior during
   * evaluation. They are immutable snapshots - once created, they never change.
   *
   * When running evaluations, you reference a specific systemVersionId to establish
   * which system version to test.
   */
  export interface Version {
    /**
     * The ID of the system version.
     */
    id: string;

    /**
     * The name of the system version.
     */
    name: string;
  }
}

export interface SystemDeleteResponse {
  /**
   * Whether the deletion was successful.
   */
  success: boolean;
}

export interface SystemUpdateParams {
  /**
   * The description of the system.
   */
  description?: string;

  /**
   * The name of the system. Unique within the project.
   */
  name?: string;

  /**
   * The ID of the production version of the system.
   */
  productionVersionId?: string;
}

export interface SystemListParams extends PaginatedResponseParams {}

export interface SystemUpsertParams {
  /**
   * The configuration of the system.
   */
  config: { [key: string]: unknown };

  /**
   * The description of the system.
   */
  description?: string;

  /**
   * The name of the system. Should be unique within the project. Default is "Default
   * system"
   */
  name?: string;
}

Systems.Versions = Versions;

export declare namespace Systems {
  export {
    type System as System,
    type SystemDeleteResponse as SystemDeleteResponse,
    type SystemsPaginatedResponse as SystemsPaginatedResponse,
    type SystemUpdateParams as SystemUpdateParams,
    type SystemListParams as SystemListParams,
    type SystemUpsertParams as SystemUpsertParams,
  };

  export {
    Versions as Versions,
    type SystemVersion as SystemVersion,
    type VersionUpsertParams as VersionUpsertParams,
  };
}
