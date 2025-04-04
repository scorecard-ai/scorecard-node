// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TestcaseAPI from './testcase';
import {
  TestCase,
  Testcase,
  TestcaseBatchCopyParams,
  TestcaseBatchCopyResponse,
  TestcaseBatchDeleteParams,
  TestcaseBatchDeleteResponse,
  TestcaseCreateParams,
  TestcaseDeleteParams,
  TestcaseDeleteResponse,
  TestcaseListParams,
  TestcaseListResponse,
  TestcaseRetrieveParams,
  TestcaseUpdateParams,
} from './testcase';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class TestsetResource extends APIResource {
  testcase: TestcaseAPI.Testcase = new TestcaseAPI.Testcase(this._client);

  /**
   * Create a new Testset
   */
  create(body: TestsetCreateParams, options?: RequestOptions): APIPromise<Testset> {
    return this._client.post('/v1/testset', { body, ...options });
  }

  /**
   * Retrieve Testset metadata without Testcase data
   */
  retrieve(testsetID: number, options?: RequestOptions): APIPromise<Testset> {
    return this._client.get(path`/v1/testset/${testsetID}`, options);
  }

  /**
   * Update a Testset.
   */
  update(testsetID: number, body: TestsetUpdateParams, options?: RequestOptions): APIPromise<Testset> {
    return this._client.patch(path`/v1/testset/${testsetID}`, { body, ...options });
  }

  /**
   * Retrieve all Testsets with cursor-based pagination
   */
  list(
    query: TestsetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TestsetListResponse> {
    return this._client.get('/v1/testset', { query, ...options });
  }

  /**
   * Delete a Testset
   */
  delete(testsetID: number, options?: RequestOptions): APIPromise<Testset> {
    return this._client.delete(path`/v1/testset/${testsetID}`, options);
  }

  /**
   * Read the schema of a Testset
   */
  getSchema(testsetID: number, options?: RequestOptions): APIPromise<TestsetGetSchemaResponse> {
    return this._client.get(path`/v1/testset/${testsetID}/schema`, options);
  }
}

export interface Testset {
  /**
   * The ID of the testset.
   */
  id?: number | null;

  /**
   * The creation date and time of the testset.
   */
  created_at?: string | null;

  /**
   * Whether or not the testset was created by the playground.
   */
  created_by_playground?: boolean | null;

  /**
   * Custom schema model with an ordered list of custom variables.
   */
  custom_schema?: Testset.CustomSchema | null;

  /**
   * A description for the testset.
   */
  description?: string | null;

  /**
   * The method used to ingest the testset.
   */
  ingestion_method?: string | null;

  /**
   * Whether or not the testset is archived.
   */
  is_archived?: boolean | null;

  /**
   * A human-readable name for the testset. This will be displayed in the UI.
   */
  name?: string | null;

  /**
   * The number of testcases in the testset.
   */
  num_testcases?: number | null;

  /**
   * The ID of the project the testset belongs to.
   */
  project_id?: number | null;

  /**
   * Whether or not the testset is published.
   */
  published?: boolean | null;

  /**
   * The last time the testset was updated.
   */
  updated_at?: string | null;

  /**
   * Whether or not the testset uses retrieval.
   */
  using_retrieval?: boolean | null;
}

export namespace Testset {
  /**
   * Custom schema model with an ordered list of custom variables.
   */
  export interface CustomSchema {
    /**
     * Ordered list of custom variables
     */
    variables?: Array<CustomSchema.Variable>;
  }

  export namespace CustomSchema {
    /**
     * Custom variable model with name, description, role and data type.
     */
    export interface Variable {
      /**
       * Enum for data types.
       */
      data_type: 'text' | 'file_url' | 'json_object';

      name: string;

      /**
       * Enum for role types.
       */
      role: 'input' | 'output' | 'label' | 'metadata';

      description?: string | null;
    }
  }
}

export interface TestsetListResponse {
  items: Array<Testset>;

  /**
   * Cursor to refetch the current page
   */
  current_page?: string | null;

  /**
   * Cursor to refetch the current page starting from the last item
   */
  current_page_backwards?: string | null;

  /**
   * Cursor for the next page
   */
  next_page?: string | null;

  /**
   * Cursor for the previous page
   */
  previous_page?: string | null;

  /**
   * Total items
   */
  total?: number | null;
}

/**
 * Custom schema model with an ordered list of custom variables.
 */
export interface TestsetGetSchemaResponse {
  /**
   * Ordered list of custom variables
   */
  variables?: Array<TestsetGetSchemaResponse.Variable>;
}

export namespace TestsetGetSchemaResponse {
  /**
   * Custom variable model with name, description, role and data type.
   */
  export interface Variable {
    /**
     * Enum for data types.
     */
    data_type: 'text' | 'file_url' | 'json_object';

    name: string;

    /**
     * Enum for role types.
     */
    role: 'input' | 'output' | 'label' | 'metadata';

    description?: string | null;
  }
}

export interface TestsetCreateParams {
  name: string;

  /**
   * Whether or not the testset was created by the playground.
   */
  created_by_playground?: boolean | null;

  /**
   * Custom schema model with an ordered list of custom variables.
   */
  custom_schema?: TestsetCreateParams.CustomSchema | null;

  /**
   * A description for the testset.
   */
  description?: string | null;

  /**
   * The method of ingestion for the testset.
   */
  ingestion_method?: 'csv' | 'logging' | null;

  /**
   * The ID of the project to create the testset in. Omitting this optional argument
   * will create the testset inside your Organization's default project.
   */
  project_id?: number | null;

  /**
   * Whether or not the testset is published.
   */
  published?: boolean | null;

  /**
   * Whether or not the testset uses retrieval.
   */
  using_retrieval?: boolean | null;
}

export namespace TestsetCreateParams {
  /**
   * Custom schema model with an ordered list of custom variables.
   */
  export interface CustomSchema {
    /**
     * Ordered list of custom variables
     */
    variables?: Array<CustomSchema.Variable>;
  }

  export namespace CustomSchema {
    /**
     * Custom variable model with name, description, role and data type.
     */
    export interface Variable {
      /**
       * Enum for data types.
       */
      data_type: 'text' | 'file_url' | 'json_object';

      name: string;

      /**
       * Enum for role types.
       */
      role: 'input' | 'output' | 'label' | 'metadata';

      description?: string | null;
    }
  }
}

export interface TestsetUpdateParams {
  /**
   * Custom schema model with an ordered list of custom variables.
   */
  custom_schema?: TestsetUpdateParams.CustomSchema | null;

  /**
   * A description for the testset.
   */
  description?: string | null;

  name?: string | null;

  /**
   * Whether or not the testset uses retrieval.
   */
  using_retrieval?: boolean | null;
}

export namespace TestsetUpdateParams {
  /**
   * Custom schema model with an ordered list of custom variables.
   */
  export interface CustomSchema {
    /**
     * Ordered list of custom variables
     */
    variables?: Array<CustomSchema.Variable>;
  }

  export namespace CustomSchema {
    /**
     * Custom variable model with name, description, role and data type.
     */
    export interface Variable {
      /**
       * Enum for data types.
       */
      data_type: 'text' | 'file_url' | 'json_object';

      name: string;

      /**
       * Enum for role types.
       */
      role: 'input' | 'output' | 'label' | 'metadata';

      description?: string | null;
    }
  }
}

export interface TestsetListParams {
  cursor?: string | null;

  size?: number;
}

TestsetResource.Testcase = Testcase;

export declare namespace TestsetResource {
  export {
    type Testset as Testset,
    type TestsetListResponse as TestsetListResponse,
    type TestsetGetSchemaResponse as TestsetGetSchemaResponse,
    type TestsetCreateParams as TestsetCreateParams,
    type TestsetUpdateParams as TestsetUpdateParams,
    type TestsetListParams as TestsetListParams,
  };

  export {
    Testcase as Testcase,
    type TestCase as TestCase,
    type TestcaseListResponse as TestcaseListResponse,
    type TestcaseDeleteResponse as TestcaseDeleteResponse,
    type TestcaseBatchCopyResponse as TestcaseBatchCopyResponse,
    type TestcaseBatchDeleteResponse as TestcaseBatchDeleteResponse,
    type TestcaseCreateParams as TestcaseCreateParams,
    type TestcaseRetrieveParams as TestcaseRetrieveParams,
    type TestcaseUpdateParams as TestcaseUpdateParams,
    type TestcaseListParams as TestcaseListParams,
    type TestcaseDeleteParams as TestcaseDeleteParams,
    type TestcaseBatchCopyParams as TestcaseBatchCopyParams,
    type TestcaseBatchDeleteParams as TestcaseBatchDeleteParams,
  };
}
