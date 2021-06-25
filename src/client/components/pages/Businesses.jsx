import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BUSINESSES } from '../../gql/queries/getAllBusinesses';

const Businesses = () => {
  const { loading, error, data } = useQuery(GET_ALL_BUSINESSES);

  if (loading) return 'Loading';

  if (error) {
    return 'Error';
  }

  console.log(data);

  return <p>Hi!</p>;
};

export { Businesses };
