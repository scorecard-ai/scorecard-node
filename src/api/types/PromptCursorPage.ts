/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Scorecard from "../index";

export interface PromptCursorPage {
    items: Scorecard.Prompt[];
    /** Total items */
    total?: number;
    /** Cursor to refetch the current page */
    currentPage?: string;
    /** Cursor to refetch the current page starting from the last item */
    currentPageBackwards?: string;
    /** Cursor for the previous page */
    previousPage?: string;
    /** Cursor for the next page */
    nextPage?: string;
}