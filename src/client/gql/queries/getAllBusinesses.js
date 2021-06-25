import { gql } from '@apollo/client';

export const GET_ALL_BUSINESSES = gql`
  query {
    businesses {
      nodes {
        id
        name
        uuid
      }
    }
  }
`;
