import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CERTIFICATES_QUERY } from '../../gql/queries/getCertificatesQuery';
import { Container } from '@material-ui/core';

const Certificates = () => {
  const { loading, error, data } = useQuery(GET_CERTIFICATES_QUERY, {
    variables: { currentBusinessId: 7 },
  });

  if (loading) return 'Loading';

  if (error) {
    return 'Error';
  }

  return (
    <Container>
      <p>Hi again!</p>
    </Container>
  );
};

export { Certificates };
