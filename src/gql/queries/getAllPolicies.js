import { gql } from '@apollo/client';

export const GET_ALL_POLICIES = gql`
  query GetAllPolicies($after: String) {
    policies(after: $after) {
      edges {
        node {
          id
          uuid
          status
          updatedAt
          createdAt
          business {
            id
            name
          }
          insuranceName
          carrier {
            name
          }
          broker {
            name
            email
          }
          premium
          effectiveDate
          expirationDate
          filepickerUrl
          policyNumber
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
