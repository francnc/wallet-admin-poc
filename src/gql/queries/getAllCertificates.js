import { gql } from '@apollo/client';

export const GET_ALL_CERTIFICATES = gql`
  query GetAllCertificates($currentBusinessId: Int!) {
    certificates(ids: [$currentBusinessId]) {
      nodes {
        id
      }
    }
  }
`;
