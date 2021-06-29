import { gql } from '@apollo/client';

export const QUOTE_FRAGMENT = gql`
  fragment QuoteFragment on Quote {
    id
    uuid
    business {
      name
    }
    carrier {
      name
    }
    effectiveDate
    insuranceType
    insuranceTypeName
    premium
    status
  }
`;
