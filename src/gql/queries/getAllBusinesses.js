import { gql } from '@apollo/client';

export const GET_ALL_BUSINESSES = gql`
  query GetAllBusinesses($after: String, $search: String) {
    businesses(after: $after search: $search) {
      edges {
        node {
          id
          name
          uuid
          industry
          subindustry
          contactEmail
          createdAt
          updatedAt
          contactPhone
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
