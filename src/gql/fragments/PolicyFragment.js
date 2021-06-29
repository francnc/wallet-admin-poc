import { gql } from '@apollo/client';

export const POLICY_FRAGMENT = gql`
  fragment PolicyFragment on Policy {
    id
    business {
      name
    }
    carrier {
      name
    }
    effectiveDate
    insuranceTypeName
    premium
    status
    uuid
  }
`;
