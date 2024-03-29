/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Scorecard from "../../../../api";
import * as core from "../../../../core";

export const TestrecordCreateParamsCustomOutputsValue: core.serialization.Schema<
    serializers.TestrecordCreateParamsCustomOutputsValue.Raw,
    Scorecard.TestrecordCreateParamsCustomOutputsValue
> = core.serialization.undiscriminatedUnion([
    core.serialization.string(),
    core.serialization.lazyObject(async () => (await import("../../..")).FileUrl),
    core.serialization.lazyObject(async () => (await import("../../..")).JsonObject),
]);

export declare namespace TestrecordCreateParamsCustomOutputsValue {
    type Raw = string | serializers.FileUrl.Raw | serializers.JsonObject.Raw;
}