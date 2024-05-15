/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Scorecard from "../../../../api/index";
import * as core from "../../../../core";
import { RunMetric } from "../../../types/RunMetric";

export const Response: core.serialization.Schema<serializers.runMetric.get.Response.Raw, Scorecard.RunMetric[]> =
    core.serialization.list(RunMetric);

export declare namespace Response {
    type Raw = RunMetric.Raw[];
}
