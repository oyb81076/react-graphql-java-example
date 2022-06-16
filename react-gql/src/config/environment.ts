import {
  Environment,
  RecordSource,
  Network,
  Store,
  RequestParameters,
  Variables,
  CacheConfig,
  GraphQLResponse,
} from 'relay-runtime';

const store = new Store(new RecordSource(), {
  // This property tells Relay to not immediately clear its cache when the user
  // navigates around the app. Relay will hold onto the specified number of
  // query results, allowing the user to return to recently visited pages
  // and reusing cached data if its available/fresh.
  gcReleaseBufferSize: 10,
});

async function fetchRelay(
  params: RequestParameters,
  variables: Variables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cacheConfig: CacheConfig,
) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  // Get the response as JSON
  const json = (await response.json()) as GraphQLResponse;

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if ('errors' in json && Array.isArray(json.errors)) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${params.name}' with variables '${JSON.stringify(
        variables,
      )}': ${JSON.stringify(json.errors)}`,
    );
  }

  // Otherwise, return the full payload.
  return json;
}

const environment = new Environment({
  network: Network.create(fetchRelay),
  store,
});

export default environment;
