import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/api/v4/graphql',
  connectToDevTools: true,
  cache: new InMemoryCache(),
  resolvers: {},
  headers: {
    apikey: 'mock_api_key',
    'user-email': 'darya.strokach@coverwallet.com',
  },
});
