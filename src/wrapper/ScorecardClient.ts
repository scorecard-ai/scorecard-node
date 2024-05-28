import { ScorecardClient as FernClient } from "../Client";
import { ScorecardEnvironment } from "../environments";
import * as core from "../core";
import * as errors from "../errors";

export declare namespace ScorecardClient {
    interface Options {
        /**
         * Your Scorecard API Key. Defaults to the environment
         * variable SCORECARD_API_KEY.
         */
        apiKey?: core.Supplier<string>;
        environment?: core.Supplier<ScorecardEnvironment | string>;
    }

    interface RequestOptions extends FernClient.RequestOptions {}

    interface RunTestArgs {
        /**
         * The ID of the testset you want to run.
         */
        inputTestsetId: number;
        /**
         * The ID of the scoring config you want to use.
         */
        scoringConfigId: number;
        /**
         * A function that will call your AI model with a prompt.
         */
        modelInvocation: (prompt: string) => Promise<any>;
    }
}

export class ScorecardClient extends FernClient {
    constructor(options: ScorecardClient.Options = {}) {
        const apiKey = options.apiKey ?? process.env["SCORECARD_API_KEY"];
        if (apiKey !== undefined) {
            super({...options, apiKey});
        }
        
        throw new errors.ScorecardError({
            message: "Please pass in your Scorecard API Key or export SCORECARD_API_KEY in your environment.",
        });
    }

    /**
     * Runs all tests within a testset
     */
    public async runTests({
        inputTestsetId,
        scoringConfigId,
        modelInvocation,
    }: ScorecardClient.RunTestArgs): Promise<void> {
        const run = await this.run.create({
            testsetId: inputTestsetId,
            scoringConfigId,
        });
        if (run.id == null) {
            throw new errors.ScorecardError({
                message: `Didn't receive run id after creating run for testid=${inputTestsetId}`,
            });
        }

        const testcases = await this.testset.getTestcases(inputTestsetId);

        for (const testcase of testcases.results) {
            if (testcase.id == null) {
                continue;
            }

            console.log(`Running testcase ${testcase.id}...`);
            console.log(`User query: ${testcase.userQuery}...`);

            const modelResponse = await modelInvocation(testcase.userQuery);

            this.testrecord.create(run.id, {
                testcaseId: testcase.id,
                testsetId: inputTestsetId,
                userQuery: testcase.userQuery,
                context: testcase.context,
                ideal: testcase.ideal,
                response: modelResponse,
            });
        }

        console.log("Finished running testcases...");
    }
}
