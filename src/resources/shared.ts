// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * An API error.
 */
export interface APIError {
  code: string;

  details: { [key: string]: unknown };

  message: string;
}
