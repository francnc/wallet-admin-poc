import { gql } from '@apollo/client';

export const QUOTES_IN_BUSINESS = gql`
  fragment QuotesInBusinessFragment on QuoteConnection {
    nodes {
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
      uuid
    }
  }
`;
