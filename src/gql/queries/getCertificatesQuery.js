import { gql } from '@apollo/client';

export const GET_CERTIFICATES_QUERY = gql`
  query GetCertificatesQuery($currentBusinessId: Int!) {
    certificates(ids: [$currentBusinessId]) {
      nodes {
        id
      }
    }
  }
`;
