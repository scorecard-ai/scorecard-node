/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../errors/index";
import * as Scorecard from "../index";

export class NotFoundError extends errors.ScorecardError {
    constructor(body: Scorecard.NotFoundErrorBody) {
        super({
            message: "NotFoundError",
            statusCode: 404,
            body: body,
        });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
