/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";
import { Prompt } from "./Prompt";

export const PromptCursorPage: core.serialization.ObjectSchema<
    serializers.PromptCursorPage.Raw,
    Scorecard.PromptCursorPage
> = core.serialization.object({
    items: core.serialization.list(Prompt),
    total: core.serialization.number().optional(),
    currentPage: core.serialization.property("current_page", core.serialization.string().optional()),
    currentPageBackwards: core.serialization.property("current_page_backwards", core.serialization.string().optional()),
    previousPage: core.serialization.property("previous_page", core.serialization.string().optional()),
    nextPage: core.serialization.property("next_page", core.serialization.string().optional()),
});

export declare namespace PromptCursorPage {
    interface Raw {
        items: Prompt.Raw[];
        total?: number | null;
        current_page?: string | null;
        current_page_backwards?: string | null;
        previous_page?: string | null;
        next_page?: string | null;
    }
}
