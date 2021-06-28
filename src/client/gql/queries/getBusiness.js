import { gql } from '@apollo/client';
import { USERS_IN_BUSINESS } from './fragments/users';
import { POLICIES_IN_BUSINESS } from './fragments/policies';
import { QUOTES_IN_BUSINESS } from './fragments/quotes';

export const GET_BUSINESS = gql`
  query getBusiness($ids: [Int!]) {
    businesses(ids: $ids) {
      nodes {
        name
        uuid
      }
    }
    users(businessIds: $ids) {
      ...UsersInBusinessFragment
    }
    policies(businessIds: $ids) {
      ...PoliciesInBusinessFragment
    }
    quotes(businessIds: $ids) {
      ...QuotesInBusinessFragment
    }
  }
  ${USERS_IN_BUSINESS}
  ${POLICIES_IN_BUSINESS}
  ${QUOTES_IN_BUSINESS}
`;
