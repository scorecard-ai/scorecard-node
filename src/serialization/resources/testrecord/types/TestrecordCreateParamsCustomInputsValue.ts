/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Scorecard from "../../../../api/index";
import * as core from "../../../../core";
import { FileUrl } from "../../../types/FileUrl";

export const TestrecordCreateParamsCustomInputsValue: core.serialization.Schema<
    serializers.TestrecordCreateParamsCustomInputsValue.Raw,
    Scorecard.TestrecordCreateParamsCustomInputsValue
> = core.serialization.undiscriminatedUnion([
    core.serialization.string(),
    FileUrl,
    core.serialization.lazyObject(async () => (await import("../../..")).JsonObject),
]);

export declare namespace TestrecordCreateParamsCustomInputsValue {
    type Raw = string | FileUrl.Raw | serializers.JsonObject.Raw;
}
