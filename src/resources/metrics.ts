// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Metrics extends APIResource {
  /**
   * Create a new Metric for evaluating system outputs. The structure of a metric
   * depends on the evalType and outputType of the metric.
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
   *   evalModelName: 'gpt-4o',
   *   guidelines:
   *     'Check if the response contains factually correct information',
   *   temperature: 0.1,
   * });
   * ```
   */
  create(projectID: string, body: MetricCreateParams, options?: RequestOptions): APIPromise<Metric> {
    return this._client.post(path`/projects/${projectID}/metrics`, { body, ...options });
  }

  /**
   * Update an existing Metric. You must specify the evalType and outputType of the
   * metric. The structure of a metric depends on the evalType and outputType of the
   * metric.
   *
   * @example
   * ```ts
   * const metric = await client.metrics.update('321', {
   *   evalType: 'ai',
   *   outputType: 'boolean',
   *   promptTemplate:
   *     'Using the following guidelines, evaluate the response: {{ guidelines }}\n\nResponse: {{ outputs.response }}\n\nIdeal answer: {{ expected.idealResponse }}',
   * });
   * ```
   */
  update(metricID: string, body: MetricUpdateParams, options?: RequestOptions): APIPromise<Metric> {
    return this._client.patch(path`/metrics/${metricID}`, { body, ...options });
  }
}

/**
 * A Metric defines how to evaluate system outputs against expected results.
 */
export type Metric =
  | Metric.AIIntMetric
  | Metric.HumanIntMetric
  | Metric.HeuristicIntMetric
  | Metric.AIFloatMetric
  | Metric.HumanFloatMetric
  | Metric.HeuristicFloatMetric
  | Metric.AIBooleanMetric
  | Metric.HumanBooleanMetric
  | Metric.HeuristicBooleanMetric;

export namespace Metric {
  /**
   * A Metric with AI evaluation and integer output.
   */
  export interface AIIntMetric {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * The AI model to use for evaluation.
     */
    evalModelName: string;

    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines: string | null;

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Integer output type.
     */
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
  export interface HumanIntMetric {
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

    /**
     * Integer output type.
     */
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
  export interface HeuristicIntMetric {
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

    /**
     * Integer output type.
     */
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
   * A Metric with AI evaluation and float output.
   */
  export interface AIFloatMetric {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * The AI model to use for evaluation.
     */
    evalModelName: string;

    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines: string | null;

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
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
   * A Metric with human evaluation and float output.
   */
  export interface HumanFloatMetric {
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

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold: number;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;
  }

  /**
   * A Metric with heuristic evaluation and float output.
   */
  export interface HeuristicFloatMetric {
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

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
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
  export interface AIBooleanMetric {
    /**
     * The ID of the Metric.
     */
    id: string;

    /**
     * The description of the Metric.
     */
    description: string | null;

    /**
     * The AI model to use for evaluation.
     */
    evalModelName: string;

    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines: string | null;

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Boolean output type.
     */
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
  export interface HumanBooleanMetric {
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

    /**
     * Boolean output type.
     */
    outputType: 'boolean';

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;
  }

  /**
   * A Metric with heuristic evaluation and boolean output.
   */
  export interface HeuristicBooleanMetric {
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

    /**
     * Boolean output type.
     */
    outputType: 'boolean';

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;
  }
}

export type MetricCreateParams =
  | MetricCreateParams.AIIntMetric
  | MetricCreateParams.HumanIntMetric
  | MetricCreateParams.HeuristicIntMetric
  | MetricCreateParams.AIFloatMetric
  | MetricCreateParams.HumanFloatMetric
  | MetricCreateParams.HeuristicFloatMetric
  | MetricCreateParams.AIBooleanMetric
  | MetricCreateParams.HumanBooleanMetric
  | MetricCreateParams.HeuristicBooleanMetric;

export declare namespace MetricCreateParams {
  export interface AIIntMetric {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Integer output type.
     */
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
     * The AI model to use for evaluation.
     */
    evalModelName?: string;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface HumanIntMetric {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Integer output type.
     */
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

  export interface HeuristicIntMetric {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Integer output type.
     */
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

  export interface AIFloatMetric {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

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
     * The AI model to use for evaluation.
     */
    evalModelName?: string;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold?: number;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface HumanFloatMetric {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold?: number;
  }

  export interface HeuristicFloatMetric {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold?: number;
  }

  export interface AIBooleanMetric {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Boolean output type.
     */
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
     * The AI model to use for evaluation.
     */
    evalModelName?: string;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface HumanBooleanMetric {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Boolean output type.
     */
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

  export interface HeuristicBooleanMetric {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * The name of the Metric.
     */
    name: string;

    /**
     * Boolean output type.
     */
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

export type MetricUpdateParams =
  | MetricUpdateParams.AIIntMetric
  | MetricUpdateParams.HumanIntMetric
  | MetricUpdateParams.HeuristicIntMetric
  | MetricUpdateParams.AIFloatMetric
  | MetricUpdateParams.HumanFloatMetric
  | MetricUpdateParams.HeuristicFloatMetric
  | MetricUpdateParams.AIBooleanMetric
  | MetricUpdateParams.HumanBooleanMetric
  | MetricUpdateParams.HeuristicBooleanMetric;

export declare namespace MetricUpdateParams {
  export interface AIIntMetric {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Integer output type.
     */
    outputType: 'int';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * The AI model to use for evaluation.
     */
    evalModelName?: string;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The name of the Metric.
     */
    name?: string;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate?: string;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface HumanIntMetric {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * Integer output type.
     */
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
     * The name of the Metric.
     */
    name?: string;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;
  }

  export interface HeuristicIntMetric {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * Integer output type.
     */
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
     * The name of the Metric.
     */
    name?: string;

    /**
     * The threshold for determining pass/fail from integer scores (1-5).
     */
    passingThreshold?: number;
  }

  export interface AIFloatMetric {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * The AI model to use for evaluation.
     */
    evalModelName?: string;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The name of the Metric.
     */
    name?: string;

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold?: number;

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate?: string;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface HumanFloatMetric {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;

    /**
     * The name of the Metric.
     */
    name?: string;

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold?: number;
  }

  export interface HeuristicFloatMetric {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * Float output type (0-1).
     */
    outputType: 'float';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;

    /**
     * The name of the Metric.
     */
    name?: string;

    /**
     * Threshold for determining pass/fail from float scores (0.0-1.0).
     */
    passingThreshold?: number;
  }

  export interface AIBooleanMetric {
    /**
     * AI-based evaluation type.
     */
    evalType: 'ai';

    /**
     * Boolean output type.
     */
    outputType: 'boolean';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * The AI model to use for evaluation.
     */
    evalModelName?: string;

    /**
     * Guidelines for AI evaluation on how to score the metric.
     */
    guidelines?: string | null;

    /**
     * The name of the Metric.
     */
    name?: string;

    /**
     * The complete prompt template for AI evaluation. Should include placeholders for
     * dynamic content.
     */
    promptTemplate?: string;

    /**
     * The temperature for AI evaluation (0-2).
     */
    temperature?: number;
  }

  export interface HumanBooleanMetric {
    /**
     * Human-based evaluation type.
     */
    evalType: 'human';

    /**
     * Boolean output type.
     */
    outputType: 'boolean';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Guidelines for human evaluators.
     */
    guidelines?: string;

    /**
     * The name of the Metric.
     */
    name?: string;
  }

  export interface HeuristicBooleanMetric {
    /**
     * Heuristic-based evaluation type.
     */
    evalType: 'heuristic';

    /**
     * Boolean output type.
     */
    outputType: 'boolean';

    /**
     * The description of the Metric.
     */
    description?: string | null;

    /**
     * Optional guidelines for heuristic evaluation logic.
     */
    guidelines?: string;

    /**
     * The name of the Metric.
     */
    name?: string;
  }
}

export declare namespace Metrics {
  export {
    type Metric as Metric,
    type MetricCreateParams as MetricCreateParams,
    type MetricUpdateParams as MetricUpdateParams,
  };
}
