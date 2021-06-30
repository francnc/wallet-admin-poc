import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    firstName
    fullName
    lastName
    phone
    userRole
    uuid
    updatedAt
    createdAt
    roles {
      id
      name
    }
    businesses {
      id
      name
    }
  }
`;
