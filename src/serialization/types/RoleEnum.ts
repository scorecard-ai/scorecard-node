/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Scorecard from "../../api";
import * as core from "../../core";

export const RoleEnum: core.serialization.Schema<serializers.RoleEnum.Raw, Scorecard.RoleEnum> =
    core.serialization.enum_(["input", "output", "label", "metadata"]);

export declare namespace RoleEnum {
    type Raw = "input" | "output" | "label" | "metadata";
}