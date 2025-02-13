// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Traces extends APIResource {
  /**
   * Retrieve specified trace
   */
  retrieve(traceID: string, options?: RequestOptions): APIPromise<Trace> {
    return this._client.get(path`/v1/traces/${traceID}`, options);
  }

  /**
   * Retrieve traces
   */
  list(options?: RequestOptions): APIPromise<TraceListResponse> {
    return this._client.get('/v1/traces', options);
  }

  /**
   * Retrieve specified span
   */
  retrieveSpan(
    spanID: string,
    params: TraceRetrieveSpanParams,
    options?: RequestOptions,
  ): APIPromise<TraceRetrieveSpanResponse> {
    const { trace_id } = params;
    return this._client.get(path`/v1/traces/${trace_id}/spans/${spanID}`, options);
  }
}

export interface Trace {
  End: string;

  Start: string;

  TraceId: string;

  Spans?: Array<Trace.Span> | null;
}

export namespace Trace {
  export interface Span {
    Children: Array<unknown>;

    Duration: number;

    'Events.Attributes': Array<Record<string, string>>;

    'Events.Name': Array<string>;

    'Events.Timestamp': Array<string>;

    'Links.Attributes': Array<Record<string, string>>;

    'Links.SpanId': Array<string>;

    'Links.TraceId': Array<string>;

    'Links.TraceState': Array<string>;

    ParentSpanId: string;

    ResourceAttributes: Record<string, string>;

    ScopeName: string;

    ScopeVersion: string;

    ServiceName: string;

    SpanAttributes: Record<string, string>;

    SpanId: string;

    SpanKind: string;

    SpanName: string;

    StatusCode: string;

    StatusMessage: string;

    Timestamp: string;

    TraceId: string;

    TraceState: string;
  }
}

export type TraceListResponse = Array<Trace>;

export interface TraceRetrieveSpanResponse {
  Children: Array<unknown>;

  Duration: number;

  'Events.Attributes': Array<Record<string, string>>;

  'Events.Name': Array<string>;

  'Events.Timestamp': Array<string>;

  'Links.Attributes': Array<Record<string, string>>;

  'Links.SpanId': Array<string>;

  'Links.TraceId': Array<string>;

  'Links.TraceState': Array<string>;

  ParentSpanId: string;

  ResourceAttributes: Record<string, string>;

  ScopeName: string;

  ScopeVersion: string;

  ServiceName: string;

  SpanAttributes: Record<string, string>;

  SpanId: string;

  SpanKind: string;

  SpanName: string;

  StatusCode: string;

  StatusMessage: string;

  Timestamp: string;

  TraceId: string;

  TraceState: string;
}

export interface TraceRetrieveSpanParams {
  /**
   * The ID of the trace which the span is a part of.
   */
  trace_id: string;
}

export declare namespace Traces {
  export {
    type Trace as Trace,
    type TraceListResponse as TraceListResponse,
    type TraceRetrieveSpanResponse as TraceRetrieveSpanResponse,
    type TraceRetrieveSpanParams as TraceRetrieveSpanParams,
  };
}
