/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Scorecard from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace Traces {
    interface Options {
        environment?: core.Supplier<environments.ScorecardEnvironment | string>;
        apiKey: core.Supplier<string>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class Traces {
    constructor(protected readonly _options: Traces.Options) {}

    /**
     * Retrieve trace spans
     *
     * @param {string} traceId - The ID of the trace to retrieve spans from.
     * @param {Traces.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Scorecard.UnauthorizedError}
     * @throws {@link Scorecard.ForbiddenError}
     * @throws {@link Scorecard.NotFoundError}
     * @throws {@link Scorecard.UnprocessableEntityError}
     *
     * @example
     *     await scorecard.traces.get("trace_id")
     */
    public async get(traceId: string, requestOptions?: Traces.RequestOptions): Promise<Scorecard.Span[]> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.ScorecardEnvironment.Default,
                `v1/traces/${encodeURIComponent(traceId)}/spans`
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "scorecard-ai",
                "X-Fern-SDK-Version": "0.5.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return await serializers.traces.get.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 401:
                    throw new Scorecard.UnauthorizedError(
                        await serializers.UnauthenticatedError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 403:
                    throw new Scorecard.ForbiddenError(
                        await serializers.UnauthorizedErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 404:
                    throw new Scorecard.NotFoundError(
                        await serializers.NotFoundErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 422:
                    throw new Scorecard.UnprocessableEntityError(
                        await serializers.HttpValidationError.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                default:
                    throw new errors.ScorecardError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.ScorecardError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.ScorecardTimeoutError();
            case "unknown":
                throw new errors.ScorecardError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getCustomAuthorizationHeaders() {
        const apiKeyValue = (await core.Supplier.get(this._options.apiKey)) ?? process?.env["SCORECARD_API_KEY"];
        return { "X-API-Key": apiKeyValue };
    }
}
