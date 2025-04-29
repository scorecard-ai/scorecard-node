#!/usr/bin/env -S npx ts-node

import Scorecard from 'scorecard-ai';

const scorecard = new Scorecard({
  bearerToken: process.env['SCORECARD_API_KEY'],
});

async function listProjectsAndTestsets(): Promise<void> {
  // Print out info about each Project.
  for await (const project of scorecard.projects.list()) {
    console.log(`- ${project.id}: ${project.name}`);

    // Get all Testsets in the project
    const testsets: Array<Scorecard.Testsets.Testset> = [];
    for await (const testset of scorecard.testsets.list(project.id)) {
      testsets.push(testset);
    }

    // Print out info about each Testset.
    const outputs = await Promise.all(
      testsets.map(async (testset) => {
        let numTestcases = 0;
        for await (const _testcase of scorecard.testcases.list(testset.id)) {
          numTestcases++;
        }
        return `\t- ${testset.id}: ${testset.name} (${numTestcases} Testcase(s))`;
      }),
    );
    console.log(outputs.join('\n'));
  }
}

listProjectsAndTestsets();
