import { gql } from '@apollo/client';

export const GET_ALL_CERTIFICATES = gql`
  query GetAllCertificates($after: String) {
    certificates(after: $after) {
      edges {
        node {
          id
          uuid
          status
          updatedAt
          createdAt
          holderName
          businessAttributes {
            name
          }
          insuranceType
          holderTypesAttributes {
            value
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
