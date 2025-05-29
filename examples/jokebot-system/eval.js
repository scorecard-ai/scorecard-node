import Scorecard from "scorecard-ai";
import { runAndEvaluate } from "scorecard-ai/lib/runAndEvaluate";
import dotenv from "dotenv";
import fs from "fs";
import { runJokeBot } from "./system.js";

dotenv.config();

const sc = new Scorecard({
  apiKey: process.env.SCORECARD_API_KEY,
  environment: "staging",
});

const {
  projectId,
  systemId,
  testsetId,
  metricIds = [],
} = JSON.parse(fs.readFileSync("eval-params.json", "utf8"));

// Get system configs
const { data: configs } = await sc.systemConfigs.list(systemId);

const configA = configs.find(({ config }) => config.model === "gpt-4.1-nano");
const configB = configs.find(({ config }) => config.model === "gpt-4.1");

console.log("🎭 Running experiment with configs:\n", {
  configA,
  configB,
});

if (metricIds.length > 0) {
  console.log("📊 Using metrics:", metricIds);
} else {
  console.log(
    "⚠️  No metrics configured. Add metric IDs to eval-params.json to enable automated scoring."
  );
}

// Create an experiment
const runA = await runAndEvaluate(sc, {
  projectId,
  testsetId,
  metricIds,
  system: async (inputs) => {
    return await runJokeBot(inputs, configA.config);
  },
  // TODO: accept system config id
  // systemConfigId: configA.id,
});

const runB = await runAndEvaluate(sc, {
  projectId,
  testsetId,
  metricIds,
  system: async (inputs) => {
    return await runJokeBot(inputs, configB.config);
  },
  // TODO: accept system config id
  // systemConfigId: configB.id,
});

console.log(`
  ✅ Done! View your experiment:
  ${
    process.env.SCORECARD_APP_URL || "https://app.scorecard.io"
  }/projects/${projectId}
  
  Try it locally:
  node system.js "pizza"
  `);
