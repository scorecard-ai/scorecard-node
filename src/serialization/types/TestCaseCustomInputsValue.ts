/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";
import { FileUrl } from "./FileUrl";

export const TestCaseCustomInputsValue: core.serialization.Schema<
    serializers.TestCaseCustomInputsValue.Raw,
    Scorecard.TestCaseCustomInputsValue
> = core.serialization.undiscriminatedUnion([
    FileUrl,
    core.serialization.lazyObject(() => serializers.JsonObject),
    core.serialization.string(),
    core.serialization.number(),
    core.serialization.number(),
    core.serialization.boolean(),
]);

export declare namespace TestCaseCustomInputsValue {
    type Raw = FileUrl.Raw | serializers.JsonObject.Raw | string | number | number | boolean;
}
