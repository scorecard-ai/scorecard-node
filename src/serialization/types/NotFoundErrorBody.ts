/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Scorecard from "../../api";
import * as core from "../../core";

export const NotFoundErrorBody: core.serialization.ObjectSchema<
    serializers.NotFoundErrorBody.Raw,
    Scorecard.NotFoundErrorBody
> = core.serialization.object({
    error: core.serialization.string().optional(),
    errorDescription: core.serialization.property("error_description", core.serialization.string().optional()),
    statusCode: core.serialization.property("status_code", core.serialization.number().optional()),
});

export declare namespace NotFoundErrorBody {
    interface Raw {
        error?: string | null;
        error_description?: string | null;
        status_code?: number | null;
    }
}