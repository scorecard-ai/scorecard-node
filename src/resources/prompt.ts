// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PromptResource extends APIResource {
  /**
   * Two types of prompts can be created - a root prompt or a child prompt (aka
   * Prompt Version in the app).
   *
   *         A root prompt can be created by providing the `name` param, and it will always be tagged as production.
   *
   *         A child prompt can be created by providing the `parent_id` param. Note that the `name` param in this case will be ignored as all descendants from a root prompt would share the root's name. `is_prod` can also be provided to configure whether a child should be tagged as production.
   */
  create(body: PromptCreateParams, options?: RequestOptions): APIPromise<Prompt> {
    return this._client.post('/v1/prompt', { body, ...options });
  }

  /**
   * Update a prompt.
   *
   *         `is_prod` tags the provided prompt as the production prompt within the prompt graph.
   */
  update(id: string, body: PromptUpdateParams, options?: RequestOptions): APIPromise<Prompt> {
    return this._client.patch(path`/v1/prompt/${id}`, { body, ...options });
  }

  /**
   * List all prompts with cursor-based pagination
   */
  list(
    query: PromptListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PromptListResponse> {
    return this._client.get('/v1/prompt/list', { query, ...options });
  }

  /**
   * Delete a root prompt and all of its children.
   */
  deleteRoot(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/prompt/${id}`, options);
  }

  /**
   * Retrieve a prompt by id
   */
  retrieveByID(id: string, options?: RequestOptions): APIPromise<Prompt> {
    return this._client.get(path`/v1/prompt/${id}`, options);
  }

  /**
   * Retrieve a prompt by name, defaulting to the production prompt, unless a tag to
   * select the prompt by is specified
   */
  retrieveByName(query: PromptRetrieveByNameParams, options?: RequestOptions): APIPromise<Prompt> {
    return this._client.get('/v1/prompt', { query, ...options });
  }
}

export interface Prompt {
  id?: string | null;

  created_at?: string | null;

  description?: string | null;

  is_archived?: boolean | null;

  merge_parent_id?: string | null;

  model_params?: Record<string, number | string> | null;

  name?: string | null;

  /**
   * The organization this resource belongs to.
   */
  org_id?: string | null;

  parent_id?: string | null;

  /**
   * The ID of the project the prompt belongs to.
   */
  project_id?: number | null;

  prompt_template?: string | null;

  root_id?: string | null;

  /**
   * The user this record belongs to.
   */
  user_id?: string | null;
}

export interface PromptListResponse {
  items: Array<Prompt>;

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

export type PromptDeleteRootResponse = unknown;

export interface PromptCreateParams {
  prompt_template: string;

  description?: string | null;

  is_prod?: boolean | null;

  model_params?: Record<string, number | string | boolean> | null;

  name?: string | null;

  parent_id?: string | null;

  project_id?: number | null;

  tag?: string | null;
}

export interface PromptUpdateParams {
  is_prod?: boolean | null;
}

export interface PromptListParams {
  /**
   * Cursor for the next page
   */
  cursor?: string | null;

  /**
   * ID of Project to filter by.
   */
  project_id?: number | null;

  /**
   * Page size
   */
  size?: number;
}

export interface PromptRetrieveByNameParams {
  /**
   * Name of the prompt.
   */
  name: string;

  /**
   * Tag to select by. Defaults to selecting the production version
   */
  tag?: string;
}

export declare namespace PromptResource {
  export {
    type Prompt as Prompt,
    type PromptListResponse as PromptListResponse,
    type PromptDeleteRootResponse as PromptDeleteRootResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptListParams as PromptListParams,
    type PromptRetrieveByNameParams as PromptRetrieveByNameParams,
  };
}
