/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../errors/index";
import * as Scorecard from "../index";

export class UnprocessableEntityError extends errors.ScorecardError {
    constructor(body: Scorecard.HttpValidationError) {
        super({
            message: "UnprocessableEntityError",
            statusCode: 422,
            body: body,
        });
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}
