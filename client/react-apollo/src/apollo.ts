import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  fromPromise,
  gql,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

export const prod = process.env.NODE_ENV === 'production';

const REFRESH_MUTATION = gql`
  mutation refresh {
    result
  }
`;

let apolloClient: ApolloClient<NormalizedCacheObject>;

const link = new HttpLink({
  uri: prod ? process.env.API_URI : 'http://localhost:4000/graphql',
  credentials: 'include',
});

const linkOnError = onError(({ graphQLErrors, operation, forward, response }) => {
  if (!apolloClient) return;
  if (graphQLErrors?.find((error) => error.message === 'token expired')) {
    const refresh = fromPromise(
      apolloClient.mutate({ mutation: REFRESH_MUTATION }).then(({ data }) => data.refresh.ok),
    );

    return refresh.filter((result) => result).flatMap(() => forward(operation));
  }
  if (graphQLErrors?.[0].message === 'no auth' && response) {
    response.errors = undefined;
  }
});

const cache = new InMemoryCache();

apolloClient = new ApolloClient({
  connectToDevTools: !prod,
  link: concat(linkOnError, link),
  cache,
});

export const client = apolloClient;
