import { gql } from '@apollo/client';

export const POLICIES_IN_BUSINESS = gql`
  fragment PoliciesInBusinessFragment on PolicyConnection {
    nodes {
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
  }
`;
