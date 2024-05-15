/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Scorecard from "../../../../../api/index";
import * as core from "../../../../../core";

export const ScoreCreateParams: core.serialization.Schema<
    serializers.ScoreCreateParams.Raw,
    Scorecard.ScoreCreateParams
> = core.serialization.object({
    metricId: core.serialization.property("metric_id", core.serialization.number()),
    intScore: core.serialization.property("int_score", core.serialization.number().optional()),
    binaryScore: core.serialization.property("binary_score", core.serialization.boolean().optional()),
    reasoning: core.serialization.string().optional(),
});

export declare namespace ScoreCreateParams {
    interface Raw {
        metric_id: number;
        int_score?: number | null;
        binary_score?: boolean | null;
        reasoning?: string | null;
    }
}
