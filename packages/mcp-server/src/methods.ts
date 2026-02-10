import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.projects.create',
    fullyQualifiedName: 'projects.create',
    httpMethod: 'post',
    httpPath: '/projects',
  },
  {
    clientCallName: 'client.projects.list',
    fullyQualifiedName: 'projects.list',
    httpMethod: 'get',
    httpPath: '/projects',
  },
  {
    clientCallName: 'client.testsets.create',
    fullyQualifiedName: 'testsets.create',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/testsets',
  },
  {
    clientCallName: 'client.testsets.update',
    fullyQualifiedName: 'testsets.update',
    httpMethod: 'patch',
    httpPath: '/testsets/{testsetId}',
  },
  {
    clientCallName: 'client.testsets.list',
    fullyQualifiedName: 'testsets.list',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}/testsets',
  },
  {
    clientCallName: 'client.testsets.delete',
    fullyQualifiedName: 'testsets.delete',
    httpMethod: 'delete',
    httpPath: '/testsets/{testsetId}',
  },
  {
    clientCallName: 'client.testsets.get',
    fullyQualifiedName: 'testsets.get',
    httpMethod: 'get',
    httpPath: '/testsets/{testsetId}',
  },
  {
    clientCallName: 'client.testcases.create',
    fullyQualifiedName: 'testcases.create',
    httpMethod: 'post',
    httpPath: '/testsets/{testsetId}/testcases',
  },
  {
    clientCallName: 'client.testcases.update',
    fullyQualifiedName: 'testcases.update',
    httpMethod: 'put',
    httpPath: '/testcases/{testcaseId}',
  },
  {
    clientCallName: 'client.testcases.list',
    fullyQualifiedName: 'testcases.list',
    httpMethod: 'get',
    httpPath: '/testsets/{testsetId}/testcases',
  },
  {
    clientCallName: 'client.testcases.delete',
    fullyQualifiedName: 'testcases.delete',
    httpMethod: 'post',
    httpPath: '/testcases/bulk-delete',
  },
  {
    clientCallName: 'client.testcases.get',
    fullyQualifiedName: 'testcases.get',
    httpMethod: 'get',
    httpPath: '/testcases/{testcaseId}',
  },
  {
    clientCallName: 'client.runs.create',
    fullyQualifiedName: 'runs.create',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/runs',
  },
  {
    clientCallName: 'client.runs.list',
    fullyQualifiedName: 'runs.list',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}/runs',
  },
  {
    clientCallName: 'client.runs.get',
    fullyQualifiedName: 'runs.get',
    httpMethod: 'get',
    httpPath: '/runs/{runId}',
  },
  {
    clientCallName: 'client.metrics.create',
    fullyQualifiedName: 'metrics.create',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/metrics',
  },
  {
    clientCallName: 'client.metrics.update',
    fullyQualifiedName: 'metrics.update',
    httpMethod: 'patch',
    httpPath: '/metrics/{metricId}',
  },
  {
    clientCallName: 'client.metrics.list',
    fullyQualifiedName: 'metrics.list',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}/metrics',
  },
  {
    clientCallName: 'client.metrics.delete',
    fullyQualifiedName: 'metrics.delete',
    httpMethod: 'delete',
    httpPath: '/metrics/{metricId}',
  },
  {
    clientCallName: 'client.metrics.get',
    fullyQualifiedName: 'metrics.get',
    httpMethod: 'get',
    httpPath: '/metrics/{metricId}',
  },
  {
    clientCallName: 'client.records.create',
    fullyQualifiedName: 'records.create',
    httpMethod: 'post',
    httpPath: '/runs/{runId}/records',
  },
  {
    clientCallName: 'client.records.list',
    fullyQualifiedName: 'records.list',
    httpMethod: 'get',
    httpPath: '/runs/{runId}/records',
  },
  {
    clientCallName: 'client.records.delete',
    fullyQualifiedName: 'records.delete',
    httpMethod: 'delete',
    httpPath: '/records/{recordId}',
  },
  {
    clientCallName: 'client.scores.upsert',
    fullyQualifiedName: 'scores.upsert',
    httpMethod: 'put',
    httpPath: '/records/{recordId}/scores/{metricConfigId}',
  },
  {
    clientCallName: 'client.systems.update',
    fullyQualifiedName: 'systems.update',
    httpMethod: 'patch',
    httpPath: '/systems/{systemId}',
  },
  {
    clientCallName: 'client.systems.list',
    fullyQualifiedName: 'systems.list',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}/systems',
  },
  {
    clientCallName: 'client.systems.delete',
    fullyQualifiedName: 'systems.delete',
    httpMethod: 'delete',
    httpPath: '/systems/{systemId}',
  },
  {
    clientCallName: 'client.systems.get',
    fullyQualifiedName: 'systems.get',
    httpMethod: 'get',
    httpPath: '/systems/{systemId}',
  },
  {
    clientCallName: 'client.systems.upsert',
    fullyQualifiedName: 'systems.upsert',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/systems',
  },
  {
    clientCallName: 'client.systems.versions.get',
    fullyQualifiedName: 'systems.versions.get',
    httpMethod: 'get',
    httpPath: '/systems/versions/{systemVersionId}',
  },
  {
    clientCallName: 'client.systems.versions.upsert',
    fullyQualifiedName: 'systems.versions.upsert',
    httpMethod: 'post',
    httpPath: '/systems/{systemId}/versions',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
