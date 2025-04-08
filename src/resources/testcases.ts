// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Testcases extends APIResource {
  /**
   * Replace the data of an existing testcase while keeping its ID.
   */
  update(
    testcaseID: number,
    body: TestcaseUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Shared.Testcase> {
    return this._client.put(path`/testcases/${testcaseID}`, { body, ...options });
  }

  /**
   * Retrieve a specific testcase by ID.
   */
  get(testcaseID: number, options?: RequestOptions): APIPromise<Shared.Testcase> {
    return this._client.get(path`/testcases/${testcaseID}`, options);
  }
}

export interface TestcaseUpdateParams {
  /**
   * The JSON data of the testcase, which is validated against the testset's schema.
   */
  data: Record<string, unknown>;
}

export declare namespace Testcases {
  export { type TestcaseUpdateParams as TestcaseUpdateParams };
}
