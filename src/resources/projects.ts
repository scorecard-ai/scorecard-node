// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Projects extends APIResource {
  /**
   * Create a new Project.
   *
   * @example
   * ```ts
   * const project = await client.projects.create({
   *   description: 'This is a test project',
   *   name: 'My Project',
   * });
   * ```
   */
  create(body: ProjectCreateParams, options?: RequestOptions): APIPromise<Project> {
    return this._client.post('/projects', { body, ...options });
  }

  /**
   * Update a Project's name, description, or review status. Changing `status`
   * requires an organization admin: an organization API key, or a token belonging to
   * an admin. Keys and tokens scoped to an individual member receive a 403.
   * `statusUpdatedAt` moves only when the status actually changes.
   *
   * @example
   * ```ts
   * const project = await client.projects.update('314', {
   *   status: 'completed',
   * });
   * ```
   */
  update(
    projectID: string,
    body: ProjectUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Project> {
    return this._client.patch(path`/projects/${projectID}`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of all Projects. Projects are ordered by creation
   * date, with oldest Projects first.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const project of client.projects.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ProjectListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProjectsPaginatedResponse, Project> {
    return this._client.getAPIList('/projects', PaginatedResponse<Project>, { query, ...options });
  }

  /**
   * Retrieve a specific Project by ID.
   *
   * @example
   * ```ts
   * const project = await client.projects.get('314');
   * ```
   */
  get(projectID: string, options?: RequestOptions): APIPromise<Project> {
    return this._client.get(path`/projects/${projectID}`, options);
  }
}

export type ProjectsPaginatedResponse = PaginatedResponse<Project>;

/**
 * A Project in the Scorecard system.
 */
export interface Project {
  /**
   * The ID of the Project.
   */
  id: string;

  /**
   * The description of the Project.
   */
  description: string | null;

  /**
   * The name of the Project.
   */
  name: string | null;

  /**
   * The review status of the Project, set by an organization admin. `null` if the
   * Project doesn't track a status.
   */
  status: 'in_progress' | 'in_review' | 'completed' | null;

  /**
   * The ISO 8601 timestamp when `status` last changed. `null` if a status has never
   * been set.
   */
  statusUpdatedAt: string | null;
}

export interface ProjectCreateParams {
  /**
   * The description of the Project.
   */
  description: string;

  /**
   * The name of the Project.
   */
  name: string;
}

export interface ProjectUpdateParams {
  /**
   * The new description of the Project.
   */
  description?: string;

  /**
   * The new name of the Project.
   */
  name?: string;

  /**
   * The new review status of the Project. Only organization admins can change it.
   * Pass `null` to stop tracking a status.
   */
  status?: 'in_progress' | 'in_review' | 'completed' | null;
}

export interface ProjectListParams extends PaginatedResponseParams {}

export declare namespace Projects {
  export {
    type Project as Project,
    type ProjectsPaginatedResponse as ProjectsPaginatedResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectUpdateParams as ProjectUpdateParams,
    type ProjectListParams as ProjectListParams,
  };
}
