/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Testset } from "./api/resources/testset/client/Client";
import { Testcase } from "./api/resources/testcase/client/Client";
import { Testrecord } from "./api/resources/testrecord/client/Client";
import { Run } from "./api/resources/run/client/Client";
import { Score } from "./api/resources/score/client/Client";
import { RunMetric } from "./api/resources/runMetric/client/Client";
import { Tracing } from "./api/resources/tracing/client/Client";
import { Prompt } from "./api/resources/prompt/client/Client";
import { ScoringConfig } from "./api/resources/scoringConfig/client/Client";

export declare namespace ScorecardClient {
    interface Options {
        environment?: core.Supplier<environments.ScorecardEnvironment | string>;
        apiKey: core.Supplier<string>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class ScorecardClient {
    constructor(protected readonly _options: ScorecardClient.Options) {}

    protected _testset: Testset | undefined;

    public get testset(): Testset {
        return (this._testset ??= new Testset(this._options));
    }

    protected _testcase: Testcase | undefined;

    public get testcase(): Testcase {
        return (this._testcase ??= new Testcase(this._options));
    }

    protected _testrecord: Testrecord | undefined;

    public get testrecord(): Testrecord {
        return (this._testrecord ??= new Testrecord(this._options));
    }

    protected _run: Run | undefined;

    public get run(): Run {
        return (this._run ??= new Run(this._options));
    }

    protected _score: Score | undefined;

    public get score(): Score {
        return (this._score ??= new Score(this._options));
    }

    protected _runMetric: RunMetric | undefined;

    public get runMetric(): RunMetric {
        return (this._runMetric ??= new RunMetric(this._options));
    }

    protected _tracing: Tracing | undefined;

    public get tracing(): Tracing {
        return (this._tracing ??= new Tracing(this._options));
    }

    protected _prompt: Prompt | undefined;

    public get prompt(): Prompt {
        return (this._prompt ??= new Prompt(this._options));
    }

    protected _scoringConfig: ScoringConfig | undefined;

    public get scoringConfig(): ScoringConfig {
        return (this._scoringConfig ??= new ScoringConfig(this._options));
    }
}
