// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_projects from './projects/create-projects';
import list_projects from './projects/list-projects';
import create_testsets from './testsets/create-testsets';
import update_testsets from './testsets/update-testsets';
import list_testsets from './testsets/list-testsets';
import delete_testsets from './testsets/delete-testsets';
import get_testsets from './testsets/get-testsets';
import create_testcases from './testcases/create-testcases';
import update_testcases from './testcases/update-testcases';
import list_testcases from './testcases/list-testcases';
import delete_testcases from './testcases/delete-testcases';
import get_testcases from './testcases/get-testcases';
import create_runs from './runs/create-runs';
import list_runs from './runs/list-runs';
import get_runs from './runs/get-runs';
import create_metrics from './metrics/create-metrics';
import update_metrics from './metrics/update-metrics';
import create_records from './records/create-records';
import upsert_scores from './scores/upsert-scores';
import update_systems from './systems/update-systems';
import list_systems from './systems/list-systems';
import delete_systems from './systems/delete-systems';
import get_systems from './systems/get-systems';
import upsert_systems from './systems/upsert-systems';
import get_systems_versions from './systems/versions/get-systems-versions';
import upsert_systems_versions from './systems/versions/upsert-systems-versions';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_projects);
addEndpoint(list_projects);
addEndpoint(create_testsets);
addEndpoint(update_testsets);
addEndpoint(list_testsets);
addEndpoint(delete_testsets);
addEndpoint(get_testsets);
addEndpoint(create_testcases);
addEndpoint(update_testcases);
addEndpoint(list_testcases);
addEndpoint(delete_testcases);
addEndpoint(get_testcases);
addEndpoint(create_runs);
addEndpoint(list_runs);
addEndpoint(get_runs);
addEndpoint(create_metrics);
addEndpoint(update_metrics);
addEndpoint(create_records);
addEndpoint(upsert_scores);
addEndpoint(update_systems);
addEndpoint(list_systems);
addEndpoint(delete_systems);
addEndpoint(get_systems);
addEndpoint(upsert_systems);
addEndpoint(get_systems_versions);
addEndpoint(upsert_systems_versions);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
