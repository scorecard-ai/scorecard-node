/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Scorecard from "../../api";
import * as core from "../../core";

export const CreateRunParams: core.serialization.ObjectSchema<
    serializers.CreateRunParams.Raw,
    Scorecard.CreateRunParams
> = core.serialization.object({
    testsetId: core.serialization.property("testset_id", core.serialization.number()),
    scoringConfigId: core.serialization.property("scoring_config_id", core.serialization.number()),
    status: core.serialization.string().optional(),
    modelParams: core.serialization.property(
        "model_params",
        core.serialization.record(core.serialization.string(), core.serialization.unknown()).optional()
    ),
});

export declare namespace CreateRunParams {
    interface Raw {
        testset_id: number;
        scoring_config_id: number;
        status?: string | null;
        model_params?: Record<string, unknown> | null;
    }
}