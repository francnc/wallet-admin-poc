import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@material-ui/data-grid';
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
  )
    return 'Loading';

  if (error) {
    return 'Error';
  }

  const columns = [
    { field: 'name', headerName: 'Business Name', width: 200, sortable: false },
    {
      field: 'industry',
      headerName: 'Industry',
      width: 200,
      sortable: false,
    },
    {
      field: 'subindustry',
      headerName: 'Sub-Industry',
      width: 200,
      sortable: false,
    },
    {
      field: 'contactEmail',
      headerName: 'Contact Email',
      width: 110,
      sortable: false,
    },
    {
      field: 'contactPhone',
      headerName: 'Сontact Phone',
      width: 110,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 110,
      sortable: false,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 110,
      sortable: false,
    },
    {
      field: 'uuid',
      headerName: 'UUID',
      width: 200,
      sortable: false,
    },
  ];

  const rows = data?.businesses?.edges?.map((business) => business.node);

  return (
    <div style={{ width: '100%', height: 968 }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} />
    </div>
  );
};

export { Businesses };
