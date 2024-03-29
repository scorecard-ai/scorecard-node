/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Scorecard from "..";

export interface Testset {
    id?: number;
    createdAt?: Date;
    name?: string;
    description?: string;
    usingRetrieval?: boolean;
    ingestionMethod?: string;
    numTestcases?: number;
    published?: boolean;
    updatedAt?: Date;
    isArchived?: boolean;
    projectId?: number;
    customSchema?: Scorecard.CustomSchema;
}