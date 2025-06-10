// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Metrics extends APIResource {
  /**
   * Create a new Metric for evaluating system outputs.
   *
   * @example
   * ```ts
   * const metric = await client.metrics.create('314', {
   *   evalType: 'ai',
   *   name: 'Response Accuracy',
   *   outputType: 'boolean',
   *   promptTemplate:
   *     'Please evaluate if the following response is factually accurate: {{outputs.response}}',
   *   description:
   *     'Evaluates if the response is factually accurate',
   *   guidelines:
   *     'Check if the response contains factually correct information',
   *   modelName: 'gpt-4o',
   *   temperature: 0.1,
   * });
   * ```
   */
  create(projectID: string, body: MetricCreateParams, options?: RequestOptions): APIPromise<Metric> {
    return this._client.post(path`/projects/${projectID}/metrics`, { body, ...options });
  }
}

/**
 * A Metric defines how to evaluate system outputs against expected results.
 */
export type Metric =
  | Metric.UnionMember0
  | Metric.UnionMember1
  | Metric.UnionMember2
  | Metric.UnionMember3
  | Metric.UnionMember4
  | Metric.UnionMember5;

export namespace Metric {
  /**
   * A Metric with AI evaluation and integer output.
   */
  export interface UnionMember0 {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines: string | null;

    /**
     * The AI model to use for evaluation.
     */
    modelName: string;

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'int';

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold: number;

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate: string;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature: number;
  }

  /**
   * A Metric with human evaluation and integer output.
   */
  export interface UnionMember1 {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'int';

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold: number;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;
  }

  /**
   * A Metric with heuristic evaluation and integer output.
   */
  export interface UnionMember2 {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'int';

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold: number;

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;
  }

  /**
   * A Metric with AI evaluation and boolean output.
   */
  export interface UnionMember3 {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines: string | null;

    /**
     * The AI model to use for evaluation.
     */
    modelName: string;

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'boolean';

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate: string;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature: number;
  }

  /**
   * A Metric with human evaluation and boolean output.
   */
  export interface UnionMember4 {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'boolean';

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;
  }

  /**
   * A Metric with heuristic evaluation and boolean output.
   */
  export interface UnionMember5 {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'boolean';

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;
  }
}

export type MetricCreateParams =
  | MetricCreateParams.Variant0
  | MetricCreateParams.Variant1
  | MetricCreateParams.Variant2
  | MetricCreateParams.Variant3
  | MetricCreateParams.Variant4
  | MetricCreateParams.Variant5;

export declare namespace MetricCreateParams {
  export interface Variant0 {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'int';

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate: string;

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The AI model to use for evaluation.
     */
    modelName?: string;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface Variant1 {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'int';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;
  }

  export interface Variant2 {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'int';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;
  }

  export interface Variant3 {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'boolean';

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate: string;

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The AI model to use for evaluation.
     */
    modelName?: string;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface Variant4 {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'boolean';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;
  }

  export interface Variant5 {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    outputType: 'boolean';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;
  }
}

export declare namespace Metrics {
  export { type Metric as Metric, type MetricCreateParams as MetricCreateParams };
}
