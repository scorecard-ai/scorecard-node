// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VersionsAPI from './versions';
import {
  SystemVersion,
  SystemVersionsPaginatedResponse,
  VersionCreateParams,
  VersionListParams,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Systems extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

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
   *
   * @example
   * ```ts
   * const system = await client.systems.create('314', {
   *   configSchema: {
   *     type: 'object',
   *     properties: {
   *       temperature: { type: 'number' },
   *       maxTokens: { type: 'integer' },
   *       model: { type: 'string', enum: ['gpt-4', 'gpt-4-turbo'] },
   *     },
   *     required: ['model'],
   *   },
   *   description: 'Production chatbot powered by GPT-4',
   *   inputSchema: {
   *     type: 'object',
   *     properties: {
   *       messages: {
   *         type: 'array',
   *         items: {
   *           type: 'object',
   *           properties: {
   *             role: { type: 'string', enum: ['system', 'user', 'assistant'] },
   *             content: { type: 'string' },
   *           },
   *           required: ['role', 'content'],
   *         },
   *       },
   *     },
   *     required: ['messages'],
   *   },
   *   name: 'GPT-4 Chatbot',
   *   outputSchema: {
   *     type: 'object',
   *     properties: { response: { type: 'string' } },
   *     required: ['response'],
   *   },
   * });
   * ```
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
   *
   * @example
   * ```ts
   * const system = await client.systems.update(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   *   {
   *     description:
   *       'Updated production chatbot powered by GPT-4 Turbo',
   *     name: 'GPT-4 Turbo Chatbot',
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
}

export type SystemsPaginatedResponse = PaginatedResponse<System>;

/**
 * A System Under Test (SUT) defines the interface to a component or service you
 * want to evaluate.
 *
 * It specifies three contracts through schemas:
 *
 * - inputSchema: The structure of data the system accepts.
 * - outputSchema: The structure of data the system produces.
 * - configSchema: The parameters that modify system behavior.
 *
 * This abstraction lets you evaluate any system as a black box, focusing on its
 * interface rather than implementation details. It's particularly useful for
 * systems with variable outputs or complex internal state.
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
   * The schema of the system's configuration.
   */
  configSchema: Record<string, unknown>;

  /**
   * The description of the system.
   */
  description: string;

  /**
   * The schema of the system's inputs.
   */
  inputSchema: Record<string, unknown>;

  /**
   * The name of the system.
   */
  name: string;

  /**
   * The schema of the system's outputs.
   */
  outputSchema: Record<string, unknown>;
}

export interface SystemDeleteResponse {
  /**
   * Whether the deletion was successful.
   */
  success: boolean;
}

export interface SystemCreateParams {
  /**
   * The schema of the system's configuration.
   */
  configSchema: Record<string, unknown>;

  /**
   * The description of the system.
   */
  description: string;

  /**
   * The schema of the system's inputs.
   */
  inputSchema: Record<string, unknown>;

  /**
   * The name of the system.
   */
  name: string;

  /**
   * The schema of the system's outputs.
   */
  outputSchema: Record<string, unknown>;
}

export interface SystemUpdateParams {
  /**
   * The schema of the system's configuration.
   */
  configSchema?: Record<string, unknown>;

  /**
   * The description of the system.
   */
  description?: string;

  /**
   * The schema of the system's inputs.
   */
  inputSchema?: Record<string, unknown>;

  /**
   * The name of the system.
   */
  name?: string;

  /**
   * The schema of the system's outputs.
   */
  outputSchema?: Record<string, unknown>;
}

export interface SystemListParams extends PaginatedResponseParams {}

Systems.Versions = Versions;

export declare namespace Systems {
  export {
    type System as System,
    type SystemDeleteResponse as SystemDeleteResponse,
    type SystemsPaginatedResponse as SystemsPaginatedResponse,
    type SystemCreateParams as SystemCreateParams,
    type SystemUpdateParams as SystemUpdateParams,
    type SystemListParams as SystemListParams,
  };

  export {
    Versions as Versions,
    type SystemVersion as SystemVersion,
    type SystemVersionsPaginatedResponse as SystemVersionsPaginatedResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionListParams as VersionListParams,
  };
}
