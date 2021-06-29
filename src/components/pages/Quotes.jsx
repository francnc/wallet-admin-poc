import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import { GET_ALL_QUOTES } from '../../gql/queries/getAllQuotes';
import { Loading } from '../common/Loading';

const Quotes = () => {
  /*
    commented code is to avoid querying all businesses in Leanid's local
    uncomment with precaution when you need
  */
  // const [isFetching, setFetching] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_QUOTES);
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
      field: 'uuid',
      headerName: 'UUID',
      flex: 2,
      sortable: false,
    },
    {
      field: 'insuranceType',
      headerName: 'Insurance',
      sortable: false,
      flex: 1.5,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Link to={`/quotes/${params.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      sortable: false,
    },
    {
      field: 'premium',
      headerName: 'Premium ($)',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Company Name',
      flex: 1.5,
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
      flex: 1,
      sortable: false,
    },
    {
      field: 'mainLocation',
      headerName: 'Location',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'termsFilepickerUrl',
      headerName: 'Terms',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => <a href={params.value}>quote.pdf</a>,
    },
    {
      field: 'insuranceName',
      headerName: 'Policy',
      flex: 1,
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
  ];

  const rows = data?.quotes?.edges?.map((quote) => ({
    ...quote.node,
    name: quote.node.business.name,
    policyId: quote.node?.policy?.id,
    insuranceName: quote.node?.policy?.insuranceName,
  }));

  return (
    <Container maxWidth={false}>
      <h1>Quotes</h1>
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

export { Quotes };
