/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";

export const PromptModelParamsValue: core.serialization.Schema<
    serializers.PromptModelParamsValue.Raw,
    Scorecard.PromptModelParamsValue
> = core.serialization.undiscriminatedUnion([
    core.serialization.number(),
    core.serialization.number(),
    core.serialization.string(),
]);

export declare namespace PromptModelParamsValue {
    type Raw = number | number | string;
}
