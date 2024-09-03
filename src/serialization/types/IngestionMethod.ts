/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Scorecard from "../../api/index";
import * as core from "../../core";

export const IngestionMethod: core.serialization.Schema<serializers.IngestionMethod.Raw, Scorecard.IngestionMethod> =
    core.serialization.enum_(["csv", "logging"]);

export declare namespace IngestionMethod {
    type Raw = "csv" | "logging";
}
