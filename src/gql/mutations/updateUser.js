import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/UserFragment';

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdateInput!, $userId: ID!) {
    updateUser(input: $input, userId: $userId) {
      user {
        ...UserFragment
      }
      errors {
        message
        path
      }
    }
  }
  ${USER_FRAGMENT}
`;
