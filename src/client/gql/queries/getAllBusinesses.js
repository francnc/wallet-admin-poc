import { gql } from '@apollo/client';

export const GET_ALL_BUSINESSES = gql`
  query getAllBusinesses($after: String, $first: Int) {
    businesses(after: $after, first: $first) {
      edges {
        node {
          id
          name
          uuid
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
