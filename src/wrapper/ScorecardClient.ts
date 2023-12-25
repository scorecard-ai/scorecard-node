import { ScorecardClient as FernClient } from "../Client";
import * as core from "../core";
import * as errors from "../errors";

export declare namespace ScorecardClient {
    interface Options {
        /**
         * Your Scorecard API Key. Defaults to the environment
         * variable SCORECARD_API_KEY.
         */
        apiKey?: core.Supplier<string>;
    }

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
        if (apiKey == null) {
            throw new errors.ScorecardError({
                message: "Please pass in your Scorecard API Key or export SCORECARD_API_KEY in your environment.",
            });
        }
        super({
            apiKey,
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
        const runId = (await this.run.create({
            testsetId: inputTestsetId,
            scoringConfigId,
        })) as number;
        const testcases = (await this.testset.get(inputTestsetId)) as any;

        for (const testcase of testcases) {
            const testcaseId = testcase["id"] as number;
            const userQuery = testcase["user_query"] as string;

            console.log(`Running testcase ${testcaseId}...`);
            console.log(`User query: ${userQuery}...`);

            const modelResponse = await modelInvocation(userQuery);

            this.testrecord.create({
                runId,
                testcaseId,
                modelResponse,
            });
        }

        console.log("Finished running testcases...");
    }
}
