/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Scorecard from "../../../../api/index";
import * as core from "../../../../core";
import { FileUrl } from "../../../types/FileUrl";

export const TestrecordCreateParamsCustomOutputsValue: core.serialization.Schema<
    serializers.TestrecordCreateParamsCustomOutputsValue.Raw,
    Scorecard.TestrecordCreateParamsCustomOutputsValue
> = core.serialization.undiscriminatedUnion([
    core.serialization.string(),
    FileUrl,
    core.serialization.lazyObject(() => serializers.JsonObject),
]);

export declare namespace TestrecordCreateParamsCustomOutputsValue {
    type Raw = string | FileUrl.Raw | serializers.JsonObject.Raw;
}
