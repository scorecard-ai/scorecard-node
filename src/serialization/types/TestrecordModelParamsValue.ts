/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Scorecard from "../../api";
import * as core from "../../core";

export const TestrecordModelParamsValue: core.serialization.Schema<
    serializers.TestrecordModelParamsValue.Raw,
    Scorecard.TestrecordModelParamsValue
> = core.serialization.undiscriminatedUnion([
    core.serialization.number(),
    core.serialization.number(),
    core.serialization.string(),
]);

export declare namespace TestrecordModelParamsValue {
    type Raw = number | number | string;
}