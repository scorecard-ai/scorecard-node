// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

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

export interface ProjectListParams extends PaginatedResponseParams {}

export declare namespace Projects {
  export {
    type Project as Project,
    type ProjectsPaginatedResponse as ProjectsPaginatedResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
  };
}
