import { ApolloClient } from '@apollo/client/core';
import { apolloCache } from './apolloCache';
export const client = new ApolloClient({
  uri: 'http://admin.aoncover.test:3000/api/v4/graphql',
  connectToDevTools: true,
  cache: apolloCache,
  resolvers: {},
  headers: {
    apikey: 'mock_api_key',
    'user-email': 'darya.strokach@coverwallet.com',
  },
});
