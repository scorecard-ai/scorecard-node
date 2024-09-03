/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";
import { TestrecordCustomInputsValue } from "./TestrecordCustomInputsValue";
import { TestrecordCustomLabelsValue } from "./TestrecordCustomLabelsValue";
import { TestrecordCustomOutputsValue } from "./TestrecordCustomOutputsValue";
import { TestrecordModelParamsValue } from "./TestrecordModelParamsValue";
import { TestrecordModelDebugInfoValue } from "./TestrecordModelDebugInfoValue";

export const Testrecord: core.serialization.ObjectSchema<serializers.Testrecord.Raw, Scorecard.Testrecord> =
    core.serialization.object({
        id: core.serialization.number().optional(),
        createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
        runId: core.serialization.property("run_id", core.serialization.number().optional()),
        testsetId: core.serialization.property("testset_id", core.serialization.number().optional()),
        testcaseId: core.serialization.property("testcase_id", core.serialization.number().optional()),
        userQuery: core.serialization.property("user_query", core.serialization.string().optional()),
        context: core.serialization.string().optional(),
        modelResponse: core.serialization.property("model_response", core.serialization.string().optional()),
        ideal: core.serialization.string().optional(),
        customInputs: core.serialization.property(
            "custom_inputs",
            core.serialization.record(core.serialization.string(), TestrecordCustomInputsValue.optional()).optional()
        ),
        customLabels: core.serialization.property(
            "custom_labels",
            core.serialization.record(core.serialization.string(), TestrecordCustomLabelsValue.optional()).optional()
        ),
        customOutputs: core.serialization.property(
            "custom_outputs",
            core.serialization.record(core.serialization.string(), TestrecordCustomOutputsValue.optional()).optional()
        ),
        status: core.serialization.string().optional(),
        prompt: core.serialization.string().optional(),
        modelParams: core.serialization.property(
            "model_params",
            core.serialization.record(core.serialization.string(), TestrecordModelParamsValue.optional()).optional()
        ),
        modelDebugInfo: core.serialization.property(
            "model_debug_info",
            core.serialization.record(core.serialization.string(), TestrecordModelDebugInfoValue.optional()).optional()
        ),
        errorMessage: core.serialization.property("error_message", core.serialization.string().optional()),
    });

export declare namespace Testrecord {
    interface Raw {
        id?: number | null;
        created_at?: string | null;
        run_id?: number | null;
        testset_id?: number | null;
        testcase_id?: number | null;
        user_query?: string | null;
        context?: string | null;
        model_response?: string | null;
        ideal?: string | null;
        custom_inputs?: Record<string, TestrecordCustomInputsValue.Raw | null | undefined> | null;
        custom_labels?: Record<string, TestrecordCustomLabelsValue.Raw | null | undefined> | null;
        custom_outputs?: Record<string, TestrecordCustomOutputsValue.Raw | null | undefined> | null;
        status?: string | null;
        prompt?: string | null;
        model_params?: Record<string, TestrecordModelParamsValue.Raw | null | undefined> | null;
        model_debug_info?: Record<string, TestrecordModelDebugInfoValue.Raw | null | undefined> | null;
        error_message?: string | null;
    }
}
