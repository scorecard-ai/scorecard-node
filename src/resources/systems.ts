// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Systems extends APIResource {
  /**
   * Create a new system definition that specifies the interface contracts for a
   * component you want to evaluate.
   *
   * A system acts as a template that defines three key contracts through JSON
   * Schemas:
   *
   * 1. Input Schema: What data your system accepts (e.g., user queries, context
   *    documents)
   * 2. Output Schema: What data your system produces (e.g., responses, confidence
   *    scores)
   * 3. Config Schema: What parameters can be adjusted (e.g., model selection,
   *    temperature)
   *
   * This separation lets you evaluate any system as a black box, focusing on its
   * interface rather than implementation details.
   */
  create(projectID: string, body: SystemCreateParams, options?: RequestOptions): APIPromise<System> {
    return this._client.post(path`/projects/${projectID}/systems`, { body, ...options });
  }

  /**
   * Update an existing system definition. Only the fields provided in the request
   * body will be updated. If a field is provided, the new content will replace the
   * existing content. If a field is not provided, the existing content will remain
   * unchanged.
   *
   * When updating schemas:
   *
   * - The system will accept your changes regardless of compatibility with existing
   *   configurations
   * - Schema updates won't invalidate existing evaluations or configurations
   * - For significant redesigns, creating a new system definition provides a cleaner
   *   separation
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
   * configurations.
   */
  delete(systemID: string, options?: RequestOptions): APIPromise<SystemDeleteResponse> {
    return this._client.delete(path`/systems/${systemID}`, options);
  }

  /**
   * Retrieve a specific system by ID.
   */
  get(systemID: string, options?: RequestOptions): APIPromise<System> {
    return this._client.get(path`/systems/${systemID}`, options);
  }
}

export type SystemsPaginatedResponse = PaginatedResponse<System>;

/**
 * A System Under Test (SUT) defines the interface to a component or service you
 * want to evaluate.
 *
 * It specifies three contracts through schemas:
 *
 * - inputSchema: The structure of data the system accepts
 * - outputSchema: The structure of data the system produces
 * - configSchema: The parameters that modify system behavior
 *
 * This abstraction lets you evaluate any system as a black box, focusing on its
 * interface rather than implementation details. It's particularly useful for
 * systems with variable outputs or complex internal state.
 *
 * Systems are templates - to run evaluations, pair them with a SystemConfig that
 * provides specific parameter values.
 */
export interface System {
  /**
   * The ID of the system
   */
  id: string;

  /**
   * The schema of the system's configuration
   */
  configSchema: Record<string, unknown>;

  /**
   * The description of the system
   */
  description: string;

  /**
   * The schema of the system's inputs
   */
  inputSchema: Record<string, unknown>;

  /**
   * The name of the system
   */
  name: string;

  /**
   * The schema of the system's outputs
   */
  outputSchema: Record<string, unknown>;
}

export interface SystemDeleteResponse {
  /**
   * Whether the deletion was successful
   */
  success: boolean;
}

export interface SystemCreateParams {
  /**
   * The schema of the system's configuration
   */
  configSchema: Record<string, unknown>;

  /**
   * The description of the system
   */
  description: string;

  /**
   * The schema of the system's inputs
   */
  inputSchema: Record<string, unknown>;

  /**
   * The name of the system
   */
  name: string;

  /**
   * The schema of the system's outputs
   */
  outputSchema: Record<string, unknown>;
}

export interface SystemUpdateParams {
  /**
   * The schema of the system's configuration
   */
  configSchema?: Record<string, unknown>;

  /**
   * The description of the system
   */
  description?: string;

  /**
   * The schema of the system's inputs
   */
  inputSchema?: Record<string, unknown>;

  /**
   * The name of the system
   */
  name?: string;

  /**
   * The schema of the system's outputs
   */
  outputSchema?: Record<string, unknown>;
}

export interface SystemListParams extends PaginatedResponseParams {}

export declare namespace Systems {
  export {
    type System as System,
    type SystemDeleteResponse as SystemDeleteResponse,
    type SystemsPaginatedResponse as SystemsPaginatedResponse,
    type SystemCreateParams as SystemCreateParams,
    type SystemUpdateParams as SystemUpdateParams,
    type SystemListParams as SystemListParams,
  };
}
