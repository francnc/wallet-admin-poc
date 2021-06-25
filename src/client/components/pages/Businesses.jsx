import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BUSINESSES } from '../../gql/queries/getAllBusinesses';

const Businesses = () => {
  const [isFetching, setFetching] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_BUSINESSES);

  useEffect(() => {
    if (data) {
      const {
        pageInfo: { hasNextPage, endCursor },
      } = data?.businesses;

      if (hasNextPage) {
        fetchMore({
          variables: {
            after: endCursor,
          },
        });
      } else {
        setFetching(false);
      }
    }
  }, [data?.businesses]);

  if (loading || isFetching) return 'Loading';

  if (error) {
    return 'Error';
  }

  return <p>Hi!</p>;
};

export { Businesses };
