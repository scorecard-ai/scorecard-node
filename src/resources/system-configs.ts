// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SystemConfigs extends APIResource {
  /**
   * Create a new configuration for a system.
   *
   * Each configuration contains specific parameter values that match the system's
   * configSchema - things like model parameters, thresholds, or processing options.
   * Once created, configurations cannot be modified, ensuring stable reference
   * points for evaluations.
   *
   * When creating a configuration:
   *
   * - The 'config' object is validated against the parent system's configSchema
   * - Configurations with validation errors are still stored, with errors included
   *   in the response
   * - Validation errors indicate fields that don't match the schema but don't
   *   prevent creation
   * - Having validation errors may affect how some evaluation metrics are calculated
   *
   * @example
   * ```ts
   * const systemConfig = await client.systemConfigs.create(
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
  create(
    systemID: string,
    body: SystemConfigCreateParams,
    options?: RequestOptions,
  ): APIPromise<SystemConfig> {
    return this._client.post(path`/systems/${systemID}/configs`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of configurations for a specific system.
   *
   * System configurations provide concrete parameter values for a System Under Test,
   * defining exactly how the system should be configured during an evaluation run.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const systemConfig of client.systemConfigs.list(
   *   '12345678-0a8b-4f66-b6f3-2ddcfa097257',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    systemID: string,
    query: SystemConfigListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SystemConfigsPaginatedResponse, SystemConfig> {
    return this._client.getAPIList(path`/systems/${systemID}/configs`, PaginatedResponse<SystemConfig>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a specific system configuration by ID.
   *
   * @example
   * ```ts
   * const systemConfig = await client.systemConfigs.get(
   *   '87654321-4d3b-4ae4-8c7a-4b6e2a19ccf0',
   *   { systemId: '12345678-0a8b-4f66-b6f3-2ddcfa097257' },
   * );
   * ```
   */
  get(
    systemConfigID: string,
    params: SystemConfigGetParams,
    options?: RequestOptions,
  ): APIPromise<SystemConfig> {
    const { systemId } = params;
    return this._client.get(path`/systems/${systemId}/configs/${systemConfigID}`, options);
  }
}

export type SystemConfigsPaginatedResponse = PaginatedResponse<SystemConfig>;

/**
 * A SystemConfig defines the specific settings for a System Under Test.
 *
 * Configurations contain parameter values that determine system behavior during
 * evaluation. They are immutable snapshots - once created, they never change.
 *
 * When running evaluations, you reference a specific configId to establish which
 * configuration to test.
 *
 * Configurations will be validated against the system's configSchema, with
 * non-conforming values generating warnings.
 */
export interface SystemConfig {
  /**
   * The ID of the system configuration.
   */
  id: string;

  /**
   * The configuration of the system.
   */
  config: Record<string, unknown>;

  /**
   * The name of the system configuration.
   */
  name: string;

  /**
   * The ID of the system the configuration belongs to.
   */
  systemId: string;

  /**
   * Validation errors found in the configuration. If present, the configuration
   * doesn't fully conform to its system's configSchema.
   */
  validationErrors?: Array<SystemConfig.ValidationError>;
}

export namespace SystemConfig {
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

export interface SystemConfigCreateParams {
  /**
   * The configuration of the system.
   */
  config: Record<string, unknown>;

  /**
   * The name of the system configuration.
   */
  name: string;

  /**
   * Validation errors found in the configuration. If present, the configuration
   * doesn't fully conform to its system's configSchema.
   */
  validationErrors?: Array<SystemConfigCreateParams.ValidationError>;
}

export namespace SystemConfigCreateParams {
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

export interface SystemConfigListParams extends PaginatedResponseParams {}

export interface SystemConfigGetParams {
  /**
   * The ID of the system the configuration belongs to.
   */
  systemId: string;
}

export declare namespace SystemConfigs {
  export {
    type SystemConfig as SystemConfig,
    type SystemConfigsPaginatedResponse as SystemConfigsPaginatedResponse,
    type SystemConfigCreateParams as SystemConfigCreateParams,
    type SystemConfigListParams as SystemConfigListParams,
    type SystemConfigGetParams as SystemConfigGetParams,
  };
}
