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
    intScore?: number;
    binaryScore?: boolean;
    reasoning?: string;
}
