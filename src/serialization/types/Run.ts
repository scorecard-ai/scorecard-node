/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";

export const Run: core.serialization.ObjectSchema<serializers.Run.Raw, Scorecard.Run> = core.serialization.object({
    id: core.serialization.number().optional(),
    createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
    updatedAt: core.serialization.property("updated_at", core.serialization.date().optional()),
    executionStartTime: core.serialization.property("execution_start_time", core.serialization.date().optional()),
    executionEndTime: core.serialization.property("execution_end_time", core.serialization.date().optional()),
    testsetId: core.serialization.property("testset_id", core.serialization.number().optional()),
    status: core.serialization.string().optional(),
    limitTestcases: core.serialization.property("limit_testcases", core.serialization.number().optional()),
    source: core.serialization.string().optional(),
    modelParams: core.serialization.property(
        "model_params",
        core.serialization.record(core.serialization.string(), core.serialization.unknown()).optional()
    ),
    notes: core.serialization.string().optional(),
    scoringConfigId: core.serialization.property("scoring_config_id", core.serialization.number().optional()),
    promptTemplate: core.serialization.property("prompt_template", core.serialization.string().optional()),
    scoringStartTime: core.serialization.property("scoring_start_time", core.serialization.date().optional()),
    scoringEndTime: core.serialization.property("scoring_end_time", core.serialization.date().optional()),
});

export declare namespace Run {
    interface Raw {
        id?: number | null;
        created_at?: string | null;
        updated_at?: string | null;
        execution_start_time?: string | null;
        execution_end_time?: string | null;
        testset_id?: number | null;
        status?: string | null;
        limit_testcases?: number | null;
        source?: string | null;
        model_params?: Record<string, unknown> | null;
        notes?: string | null;
        scoring_config_id?: number | null;
        prompt_template?: string | null;
        scoring_start_time?: string | null;
        scoring_end_time?: string | null;
    }
}
