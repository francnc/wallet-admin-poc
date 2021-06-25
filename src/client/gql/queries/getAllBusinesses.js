import { gql } from '@apollo/client';

export const GET_ALL_BUSINESSES = gql`
  query getAllBusinesses($after: String) {
    businesses(after: $after) {
      nodes {
        id
        name
        uuid
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
