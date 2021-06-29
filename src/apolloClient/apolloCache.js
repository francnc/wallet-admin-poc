import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        businesses: relayStylePagination(),
      },
    },
  },
});
