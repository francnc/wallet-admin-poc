import { gql } from '@apollo/client';
import { POLICY_FRAGMENT } from '../fragments/PolicyFragment';
import { QUOTE_FRAGMENT } from '../fragments/QuoteFragment';
import { USER_FRAGMENT } from '../fragments/UserFragment';

export const GET_BUSINESS = gql`
  query GetBusiness($ids: [Int!]) {
    businesses(ids: $ids) {
      nodes {
        id
        name
        uuid
      }
    }
    users(businessIds: $ids) {
      nodes {
        ...UserFragment
      }
    }
    policies(businessIds: $ids) {
      nodes {
        ...PolicyFragment
      }
    }
    quotes(businessIds: $ids) {
      nodes {
        ...QuoteFragment
      }
    }
  }
  ${POLICY_FRAGMENT}
  ${QUOTE_FRAGMENT}
  ${USER_FRAGMENT}
`;
