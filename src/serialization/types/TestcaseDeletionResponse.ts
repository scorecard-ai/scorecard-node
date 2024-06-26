/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";

export const TestcaseDeletionResponse: core.serialization.ObjectSchema<
    serializers.TestcaseDeletionResponse.Raw,
    Scorecard.TestcaseDeletionResponse
> = core.serialization.object({
    id: core.serialization.number(),
    detail: core.serialization.string(),
});

export declare namespace TestcaseDeletionResponse {
    interface Raw {
        id: number;
        detail: string;
    }
}
