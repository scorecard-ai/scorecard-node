/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Scorecard from "../../../../api/index";
import * as core from "../../../../core";
import { Prompt } from "../../../types/Prompt";

export const Response: core.serialization.Schema<serializers.prompt.getProds.Response.Raw, Scorecard.Prompt[]> =
    core.serialization.list(Prompt);

export declare namespace Response {
    type Raw = Prompt.Raw[];
}
