// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Record as BuiltinRecord } from '../internal/builtin-types';
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
}

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
  expected: BuiltinRecord<string, unknown>;

  /**
   * The actual inputs sent to the system, which should match the system's input
   * schema.
   */
  inputs: BuiltinRecord<string, unknown>;

  /**
   * The actual outputs from the system.
   */
  outputs: BuiltinRecord<string, unknown>;

  /**
   * The ID of the Run containing this Record.
   */
  runId: string;

  /**
   * The ID of the Testcase.
   */
  testcaseId?: string;
}

export interface RecordCreateParams {
  /**
   * The expected outputs for the Testcase.
   */
  expected: BuiltinRecord<string, unknown>;

  /**
   * The actual inputs sent to the system, which should match the system's input
   * schema.
   */
  inputs: BuiltinRecord<string, unknown>;

  /**
   * The actual outputs from the system.
   */
  outputs: BuiltinRecord<string, unknown>;

  /**
   * The ID of the Testcase.
   */
  testcaseId?: string;
}

export declare namespace Records {
  export { type Record as Record, type RecordCreateParams as RecordCreateParams };
}
