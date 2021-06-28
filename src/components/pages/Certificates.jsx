import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CERTIFICATES_QUERY } from '../../gql/queries/getCertificatesQuery';

const Certificates = () => {
  const { loading, error, data } = useQuery(GET_CERTIFICATES_QUERY, {
    variables: { currentBusinessId: 7 },
  });

  if (loading) return 'Loading';

  if (error) {
    return 'Error';
  }

  return <p>Hi again!</p>;
};

export { Certificates };
