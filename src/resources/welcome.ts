// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { RequestOptions } from '../internal/request-options';

export class Welcome extends APIResource {
  /**
   * Root endpoint that returns a welcome message.
   */
  retrieve(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/', options);
  }
}

export type WelcomeRetrieveResponse = unknown;

export declare namespace Welcome {
  export { type WelcomeRetrieveResponse as WelcomeRetrieveResponse };
}
