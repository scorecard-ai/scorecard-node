/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         metricId: 1
 *     }
 */
export interface ScoreCreateParams {
    /** The ID of the metric */
    metricId: number;
    /** Specify integer scores. */
    intScore?: number;
    /** Specify boolean scores. */
    binaryScore?: boolean;
    /** The reasoning for the assigned score. */
    reasoning?: string;
}
