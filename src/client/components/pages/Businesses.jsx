import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BUSINESSES } from '../../gql/queries/getAllBusinesses';
const Businesses = () => {
  /*
    commented code is to avoid querying all businesses in Leanid's local
    uncomment with precaution when you need
  */
  // const [isFetching, setFetching] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_BUSINESSES);
  // useEffect(() => {
  //   if (data) {
  //     const hasNextPage = data.businesses.pageInfo.hasNextPage;
  //     const endCursor = data.businesses.pageInfo.endCursor;
  //     if (hasNextPage) {
  //       fetchMore({
  //         variables: {
  //           after: endCursor,
  //         },
  //       });
  //     } else {
  //       setFetching(false);
  //     }
  //   }
  // }, [data]);
  if (
    loading 
    // || isFetching
  ) return 'Loading';
  if (error) {
    return 'Error';
  }
  return data?.businesses?.edges?.map((i) => (
    <p>business uuid: {i.node.uuid}</p>
  ));
};

export { Businesses };
