import Scorecard, { runAndEvaluate } from 'scorecard-ai';

describe('runAndEvaluate URL', () => {
  const originalBaseURL = process.env['SCORECARD_BASE_URL'];
  const originalAppURL = process.env['SCORECARD_APP_URL'];

  beforeEach(() => {
    delete process.env['SCORECARD_APP_URL'];
  });

  afterEach(() => {
    if (originalBaseURL === undefined) {
      delete process.env['SCORECARD_BASE_URL'];
    } else {
      process.env['SCORECARD_BASE_URL'] = originalBaseURL;
    }
    if (originalAppURL === undefined) {
      delete process.env['SCORECARD_APP_URL'];
    } else {
      process.env['SCORECARD_APP_URL'] = originalAppURL;
    }
  });

  describe.each(['baseURL', 'SCORECARD_BASE_URL'])('configured through %s', (source) => {
    async function runWithBaseURL(baseURL: string) {
      if (source === 'SCORECARD_BASE_URL') {
        process.env['SCORECARD_BASE_URL'] = baseURL;
      } else {
        delete process.env['SCORECARD_BASE_URL'];
      }
      const fetch = jest.fn(
        async () =>
          new Response(JSON.stringify({ id: 'run-456' }), {
            headers: { 'Content-Type': 'application/json' },
          }),
      );
      const client = new Scorecard({
        apiKey: 'test-key',
        ...(source === 'baseURL' ? { baseURL } : {}),
        fetch,
      });
      const result = await runAndEvaluate(client, {
        projectId: 'project-123',
        metricIds: [],
        testcases: [],
        system: async () => ({}),
      });
      expect(fetch).toHaveBeenCalledTimes(1);
      return result;
    }

    it.each([
      ['https://api2.scorecard.io/api/v2', 'https://app.scorecard.io'],
      ['https://api2.scorecard.io/api/v2/', 'https://app.scorecard.io'],
      ['HTTPS://API2.SCORECARD.IO/api/v2///', 'https://app.scorecard.io'],
      ['https://staging.api2.scorecard.io/api/v2', 'https://staging.app.getscorecard.ai'],
      ['HTTPS://STAGING.API2.SCORECARD.IO/api/v2///', 'https://staging.app.getscorecard.ai'],
      ['http://localhost:3000/api/v2', 'http://localhost:3002'],
      ['HTTP://LOCALHOST:3000/api/v2///', 'http://localhost:3002'],
      ['http://localhost:8000/api/v2/', 'https://app.scorecard.io'],
      ['https://custom.example.com:8443/prefix/api/v2?key=value', 'https://app.scorecard.io'],
      ['https://staging.api2.scorecard.io/other', 'https://app.scorecard.io'],
    ])('maps %s to %s', async (baseURL, appURL) => {
      expect(await runWithBaseURL(baseURL)).toEqual({
        id: 'run-456',
        url: `${appURL}/projects/project-123/runs/run-456`,
      });
    });

    it.each(['https://api2.scorecard.io/api/v2', 'https://custom.example.com/api/v2'])(
      'uses SCORECARD_APP_URL for %s without normalizing the override',
      async (baseURL) => {
        process.env['SCORECARD_APP_URL'] = 'https://Dedicated.EXAMPLE.com/app///';
        expect(await runWithBaseURL(baseURL)).toEqual({
          id: 'run-456',
          url: 'https://Dedicated.EXAMPLE.com/app/projects/project-123/runs/run-456',
        });
      },
    );

    it.each(['', '  '])('ignores a blank SCORECARD_APP_URL (%j)', async (appURL) => {
      process.env['SCORECARD_APP_URL'] = appURL;
      expect(await runWithBaseURL('https://staging.api2.scorecard.io/api/v2')).toEqual({
        id: 'run-456',
        url: 'https://staging.app.getscorecard.ai/projects/project-123/runs/run-456',
      });
    });
  });
});
