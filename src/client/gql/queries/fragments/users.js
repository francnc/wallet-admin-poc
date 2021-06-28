import { gql } from '@apollo/client';

export const USERS_IN_BUSINESS = gql`
  fragment UsersInBusinessFragment on UserConnection {
    nodes {
      email
      firstName
      fullName
      lastName
      phone
      userRole
      uuid
    }
  }
`;
