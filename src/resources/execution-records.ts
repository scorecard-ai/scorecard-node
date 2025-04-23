// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ExecutionRecords extends APIResource {
  /**
   * Create a new execution record.
   */
  create(
    runID: string,
    body: ExecutionRecordCreateParams,
    options?: RequestOptions,
  ): APIPromise<ExecutionRecord> {
    return this._client.post(path`/runs/${runID}/executionrecords`, { body, ...options });
  }
}

/**
 * An execution record in the Scorecard system.
 */
export interface ExecutionRecord {
  /**
   * The ID of the execution record
   */
  id: string;

  /**
   * The actual inputs sent to the system, which should match the system's input
   * schema
   */
  inputs: Record<string, unknown>;

  /**
   * The expected outputs for the testcase
   */
  labels: Record<string, unknown>;

  /**
   * The actual outputs from the system
   */
  outputs: Record<string, unknown>;

  /**
   * The ID of the run containing this execution record
   */
  runId: string;

  /**
   * The ID of the testcase
   */
  testcaseId?: string;
}

export interface ExecutionRecordCreateParams {
  /**
   * The actual inputs sent to the system, which should match the system's input
   * schema
   */
  inputs: Record<string, unknown>;

  /**
   * The expected outputs for the testcase
   */
  labels: Record<string, unknown>;

  /**
   * The actual outputs from the system
   */
  outputs: Record<string, unknown>;

  /**
   * The ID of the testcase
   */
  testcaseId?: string;
}

export declare namespace ExecutionRecords {
  export {
    type ExecutionRecord as ExecutionRecord,
    type ExecutionRecordCreateParams as ExecutionRecordCreateParams,
  };
}
