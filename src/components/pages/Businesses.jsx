import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import { GET_ALL_BUSINESSES } from '../../gql/queries/getAllBusinesses';
import { Loading } from '../common/Loading';

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

  if (error) {
    return 'Error';
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Business Name',
      width: 200,
      sortable: false,
      flex: 1.5,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Link to={`/businesses/${params.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'industry',
      headerName: 'Industry',
      flex: 1,
      sortable: false,
    },
    {
      field: 'subindustry',
      headerName: 'Sub-Industry',
      flex: 1,
      sortable: false,
    },
    {
      field: 'contactEmail',
      headerName: 'Contact Email',
      flex: 1.5,
      sortable: false,
    },
    {
      field: 'contactPhone',
      headerName: 'Сontact Phone',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'uuid',
      headerName: 'UUID',
      flex: 1.5,
      sortable: false,
    },
  ];

  const rows = data?.businesses?.edges?.map((business) => business.node);

  return (
    <Container maxWidth={false}>
      <h1>Businesses</h1>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ width: '100%', height: '89vh' }}>
          <DataGrid rows={rows} columns={columns} pageSize={20} />
        </div>
      )}
    </Container>
  );
};

export { Businesses };
