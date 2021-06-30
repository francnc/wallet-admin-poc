import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/UserFragment';

export const GET_USER = gql`
  query GetUser($ids: [Int!]) {
    users(ids: $ids) {
      nodes {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;
