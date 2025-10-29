// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ScoresAPI from './scores';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Records extends APIResource {
  /**
   * Create a new Record in a Run.
   *
   * @example
   * ```ts
   * const record = await client.records.create('135', {
   *   expected: {
   *     idealAnswer: 'Paris is the capital of France',
   *   },
   *   inputs: { question: 'What is the capital of France?' },
   *   outputs: { response: 'The capital of France is Paris.' },
   *   testcaseId: '248',
   * });
   * ```
   */
  create(runID: string, body: RecordCreateParams, options?: RequestOptions): APIPromise<Record> {
    return this._client.post(path`/runs/${runID}/records`, { body, ...options });
  }

  /**
   * Retrieve a paginated list of Records for a Run, including all scores for each
   * record.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const recordListResponse of client.records.list(
   *   '135',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    runID: string,
    query: RecordListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RecordListResponsesPaginatedResponse, RecordListResponse> {
    return this._client.getAPIList(path`/runs/${runID}/records`, PaginatedResponse<RecordListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a specific Record by ID.
   *
   * @example
   * ```ts
   * const record = await client.records.delete('777');
   * ```
   */
  delete(recordID: string, options?: RequestOptions): APIPromise<RecordDeleteResponse> {
    return this._client.delete(path`/records/${recordID}`, options);
  }
}

export type RecordListResponsesPaginatedResponse = PaginatedResponse<RecordListResponse>;

/**
 * A record of a system execution in the Scorecard system.
 */
export interface Record {
  /**
   * The ID of the Record.
   */
  id: string;

  /**
   * The expected outputs for the Testcase.
   */
  expected: { [key: string]: unknown };

  /**
   * The actual inputs sent to the system, which should match the system's input
   * schema.
   */
  inputs: { [key: string]: unknown };

  /**
   * The actual outputs from the system.
   */
  outputs: { [key: string]: unknown };

  /**
   * The ID of the Run containing this Record.
   */
  runId: string;

  /**
   * The ID of the Testcase.
   */
  testcaseId?: string;
}

/**
 * A record with all its associated scores.
 */
export interface RecordListResponse extends Record {
  /**
   * All scores associated with this record.
   */
  scores: Array<ScoresAPI.Score>;
}

export interface RecordDeleteResponse {
  /**
   * Whether the deletion was successful.
   */
  success: boolean;
}

export interface RecordCreateParams {
  /**
   * The expected outputs for the Testcase.
   */
  expected: { [key: string]: unknown };

  /**
   * The actual inputs sent to the system, which should match the system's input
   * schema.
   */
  inputs: { [key: string]: unknown };

  /**
   * The actual outputs from the system.
   */
  outputs: { [key: string]: unknown };

  /**
   * The ID of the Testcase.
   */
  testcaseId?: string;
}

export interface RecordListParams extends PaginatedResponseParams {}

export declare namespace Records {
  export {
    type Record as Record,
    type RecordListResponse as RecordListResponse,
    type RecordDeleteResponse as RecordDeleteResponse,
    type RecordListResponsesPaginatedResponse as RecordListResponsesPaginatedResponse,
    type RecordCreateParams as RecordCreateParams,
    type RecordListParams as RecordListParams,
  };
}
