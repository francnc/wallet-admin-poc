import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_CERTIFICATES } from '../../gql/queries/getAllCertificates';
import { Container } from '@material-ui/core';

const Certificates = () => {
  const { loading, error, data } = useQuery(GET_ALL_CERTIFICATES, {
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
