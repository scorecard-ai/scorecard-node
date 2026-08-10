// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, PaginatedResponse, type PaginatedResponseParams } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Attachments extends APIResource {
  /**
   * Lists the uploaded attachments for a session. Only committed attachments are
   * returned.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const attachment of client.attachments.list(
   *   'c59e5bd0-e5eb-4bf0-a08a-01f7e8f712c7',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    sessionID: string,
    query: AttachmentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AttachmentsPaginatedResponse, Attachment> {
    return this._client.getAPIList(path`/sessions/${sessionID}/attachments`, PaginatedResponse<Attachment>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes an attachment: both the stored file and its metadata.
   *
   * @example
   * ```ts
   * const attachment = await client.attachments.delete(
   *   '3fa85f64-5717-4562-b3fc-2c963f66afa6',
   * );
   * ```
   */
  delete(attachmentID: string, options?: RequestOptions): APIPromise<AttachmentDeleteResponse> {
    return this._client.delete(path`/attachments/${attachmentID}`, options);
  }

  /**
   * Finalizes an upload after the file bytes have been PUT to the signed upload URL.
   * Verifies the object landed in storage before the attachment starts describing
   * the new content. Committing an already-committed attachment is a no-op.
   *
   * @example
   * ```ts
   * const attachment = await client.attachments.commit(
   *   '3fa85f64-5717-4562-b3fc-2c963f66afa6',
   * );
   * ```
   */
  commit(attachmentID: string, options?: RequestOptions): APIPromise<Attachment> {
    return this._client.post(path`/attachments/${attachmentID}/commit`, options);
  }

  /**
   * Retrieves an attachment's metadata and a short-lived signed download URL for its
   * content.
   *
   * @example
   * ```ts
   * const attachment = await client.attachments.get(
   *   '3fa85f64-5717-4562-b3fc-2c963f66afa6',
   * );
   * ```
   */
  get(attachmentID: string, options?: RequestOptions): APIPromise<AttachmentGetResponse> {
    return this._client.get(path`/attachments/${attachmentID}`, options);
  }

  /**
   * Initiates (or deduplicates) an upload of a file attached to a session. If the
   * exact content is already stored for this (session ID, file path), the response
   * has `alreadyExists: true` and no upload is needed. Otherwise, PUT the file bytes
   * to the returned `uploadUrl`, then call the commit endpoint. Re-initiating an
   * existing (session ID, file path) with new content updates the attachment in
   * place on commit.
   *
   * @example
   * ```ts
   * const response = await client.attachments.initiate({
   *   contentType: 'application/pdf',
   *   filePath: '/tmp/report.pdf',
   *   sessionId: 'c59e5bd0-e5eb-4bf0-a08a-01f7e8f712c7',
   *   sha256:
   *     '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
   *   sizeBytes: 482133,
   *   filename: 'report.pdf',
   * });
   * ```
   */
  initiate(body: AttachmentInitiateParams, options?: RequestOptions): APIPromise<AttachmentInitiateResponse> {
    return this._client.post('/attachments', { body, ...options });
  }
}

export type AttachmentsPaginatedResponse = PaginatedResponse<Attachment>;

/**
 * A file attached to a session. Bytes live in object storage; this describes the
 * last committed content.
 */
export interface Attachment {
  /**
   * The ID of the Attachment.
   */
  id: string;

  /**
   * MIME type of the last committed content. Null until the first commit.
   */
  contentType: string | null;

  /**
   * Display filename, if provided.
   */
  filename: string | null;

  /**
   * The logical file path of the attachment (e.g. the path the agent wrote on disk).
   * Together with the session ID it identifies the attachment: re-uploading the same
   * path in the same session updates the existing attachment in place.
   */
  filePath: string;

  /**
   * Arbitrary caller-supplied metadata.
   */
  metadata: { [key: string]: unknown } | null;

  /**
   * The session ID the attachment belongs to. Matches the `session.id` emitted on
   * OTel spans, which is how attachments are joined to traces and records.
   */
  sessionId: string;

  /**
   * SHA-256 of the last committed content. Null until the first commit.
   */
  sha256: string | null;

  /**
   * Size in bytes of the last committed content. Null until the first commit.
   */
  sizeBytes: number | null;

  /**
   * `uploaded` once a commit has succeeded; `pending` while an initiated upload has
   * not been committed yet.
   */
  status: 'pending' | 'uploaded';

  /**
   * ISO 8601 timestamp of the last successful commit. Null until the first commit.
   */
  uploadedAt: string | null;
}

export interface AttachmentDeleteResponse {
  /**
   * Whether the deletion was successful.
   */
  success: boolean;
}

/**
 * A file attached to a session. Bytes live in object storage; this describes the
 * last committed content.
 */
export interface AttachmentGetResponse extends Attachment {
  /**
   * ISO 8601 expiry of `downloadUrl`.
   */
  downloadExpiresAt: string | null;

  /**
   * Short-lived signed URL to download the file. Null while the attachment has no
   * committed content.
   */
  downloadUrl: string | null;
}

export interface AttachmentInitiateResponse {
  /**
   * The ID of the Attachment.
   */
  id: string;

  /**
   * True if this exact content is already stored for this (session, file path) — no
   * upload is needed and no upload URL is returned.
   */
  alreadyExists: boolean;

  /**
   * ISO 8601 expiry of `uploadUrl`.
   */
  expiresAt: string | null;

  /**
   * HTTP method to use with `uploadUrl`.
   */
  uploadMethod: 'PUT' | null;

  /**
   * Signed URL to PUT the file bytes to. Null when `alreadyExists` is true.
   */
  uploadUrl: string | null;
}

export interface AttachmentListParams extends PaginatedResponseParams {}

export interface AttachmentInitiateParams {
  /**
   * MIME type of the file.
   */
  contentType: string;

  /**
   * The logical file path of the attachment (e.g. the path the agent wrote on disk).
   * Together with the session ID it identifies the attachment: re-uploading the same
   * path in the same session updates the existing attachment in place.
   */
  filePath: string;

  /**
   * The session ID the attachment belongs to. Matches the `session.id` emitted on
   * OTel spans, which is how attachments are joined to traces and records.
   */
  sessionId: string;

  /**
   * Lowercase hex SHA-256 of the file content.
   */
  sha256: string;

  /**
   * Size of the file in bytes.
   */
  sizeBytes: number;

  /**
   * Display filename. Defaults to none.
   */
  filename?: string;

  /**
   * Arbitrary metadata to store with the attachment.
   */
  metadata?: { [key: string]: unknown };
}

export declare namespace Attachments {
  export {
    type Attachment as Attachment,
    type AttachmentDeleteResponse as AttachmentDeleteResponse,
    type AttachmentGetResponse as AttachmentGetResponse,
    type AttachmentInitiateResponse as AttachmentInitiateResponse,
    type AttachmentsPaginatedResponse as AttachmentsPaginatedResponse,
    type AttachmentListParams as AttachmentListParams,
    type AttachmentInitiateParams as AttachmentInitiateParams,
  };
}
