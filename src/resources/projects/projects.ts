// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TestsetsAPI from './testsets';
import {
  TestsetCreateParams,
  TestsetCreateResponse,
  TestsetListParams,
  TestsetListResponse,
  TestsetListResponsesPaginatedResponse,
  Testsets,
} from './testsets';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class Projects extends APIResource {
  testsets: TestsetsAPI.Testsets = new TestsetsAPI.Testsets(this._client);

  /**
   * Retrieve a paginated list of all projects. Projects are ordered by creation
   * date, with oldest projects first.
   */
  list(
    query: ProjectListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProjectListResponsesPaginatedResponse, ProjectListResponse> {
    return this._client.getAPIList('/projects', PaginatedResponse<ProjectListResponse>, {
      query,
      ...options,
    });
  }
}

export type ProjectListResponsesPaginatedResponse = PaginatedResponse<ProjectListResponse>;

/**
 * A project in the Scorecard system.
 */
export interface ProjectListResponse {
  /**
   * The ID of the project
   */
  id: number;

  /**
   * The name of the project
   */
  name: string | null;
}

export interface ProjectListParams extends PaginatedResponseParams {}

Projects.Testsets = Testsets;

export declare namespace Projects {
  export {
    type ProjectListResponse as ProjectListResponse,
    type ProjectListResponsesPaginatedResponse as ProjectListResponsesPaginatedResponse,
    type ProjectListParams as ProjectListParams,
  };

  export {
    Testsets as Testsets,
    type TestsetCreateResponse as TestsetCreateResponse,
    type TestsetListResponse as TestsetListResponse,
    type TestsetListResponsesPaginatedResponse as TestsetListResponsesPaginatedResponse,
    type TestsetCreateParams as TestsetCreateParams,
    type TestsetListParams as TestsetListParams,
  };
}
