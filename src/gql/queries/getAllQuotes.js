import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
  query GetAllQuotes($after: String) {
    quotes(after: $after) {
      edges {
        node {
          id
          uuid
          insuranceType
          status
          premium
          business {
            name
          }
          contactPhone
          contactEmail
          updatedAt
          createdAt
          termsFilepickerUrl
          policy {
            id
            insuranceName
          }
          mainLocation {
            city
            state
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
