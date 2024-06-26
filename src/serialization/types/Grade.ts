/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";
import { ScoreStatus } from "./ScoreStatus";

export const Grade: core.serialization.ObjectSchema<serializers.Grade.Raw, Scorecard.Grade> = core.serialization.object(
    {
        userId: core.serialization.property("user_id", core.serialization.string().optional()),
        id: core.serialization.number().optional(),
        runId: core.serialization.property("run_id", core.serialization.number().optional()),
        testcaseId: core.serialization.property("testcase_id", core.serialization.number().optional()),
        testrecordId: core.serialization.property("testrecord_id", core.serialization.number().optional()),
        metricId: core.serialization.property("metric_id", core.serialization.number().optional()),
        binaryScore: core.serialization.property("binary_score", core.serialization.boolean().optional()),
        intScore: core.serialization.property("int_score", core.serialization.number().optional()),
        reasoning: core.serialization.string().optional(),
        humanEval: core.serialization.property("human_eval", core.serialization.boolean().optional()),
        status: ScoreStatus.optional(),
        errorMessage: core.serialization.property("error_message", core.serialization.string().optional()),
        createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
        updatedAt: core.serialization.property("updated_at", core.serialization.date().optional()),
    }
);

export declare namespace Grade {
    interface Raw {
        user_id?: string | null;
        id?: number | null;
        run_id?: number | null;
        testcase_id?: number | null;
        testrecord_id?: number | null;
        metric_id?: number | null;
        binary_score?: boolean | null;
        int_score?: number | null;
        reasoning?: string | null;
        human_eval?: boolean | null;
        status?: ScoreStatus.Raw | null;
        error_message?: string | null;
        created_at?: string | null;
        updated_at?: string | null;
    }
}
