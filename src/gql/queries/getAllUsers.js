import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/UserFragment';

export const GET_ALL_USERS = gql`
  query GetAllUsers($after: String) {
    users(after: $after) {
      edges {
        node {
          ...UserFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${USER_FRAGMENT}
`;
