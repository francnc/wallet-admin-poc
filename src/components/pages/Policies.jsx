import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import { GET_ALL_POLICIES } from '../../gql/queries/getAllPolicies';
import { Loading } from '../common/Loading';

const Policies = () => {
  /*
    commented code is to avoid querying all businesses in Leanid's local
    uncomment with precaution when you need
  */
  // const [isFetching, setFetching] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_POLICIES);
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
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Business Name',
      sortable: false,
      flex: 1.5,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Link to={`/businesses/${params.row.business.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'insuranceName',
      headerName: 'Insurance Type',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/policies/${params.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'carrierName',
      headerName: 'Carrier',
      flex: 1,
      sortable: false,
    },
    {
      field: 'brokerInfo',
      headerName: 'Broker',
      flex: 1,
      sortable: false,
    },
    {
      field: 'premium',
      headerName: 'Premium ($)',
      flex: 1,
      sortable: false,
    },
    {
      field: 'effectiveDate',
      headerName: 'Effective Date',
      flex: 1,
      sortable: false,
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      flex: 1,
      sortable: false,
    },
    {
      field: 'filepickerUrl',
      headerName: 'Policy Document',
      flex: 1,
      sortable: false,
      renderCell: (params) => <a href={params.value}>policy.pdf</a>,
    },
    {
      field: 'policyNumber',
      headerName: 'Policy Number',
      flex: 1,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      sortable: false,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      flex: 1,
      sortable: false,
    },
    {
      field: 'uuid',
      headerName: 'UUID',
      flex: 1,
      sortable: false,
    },
  ];

  const rows = data?.policies?.edges?.map((policy) => ({
    ...policy.node,
    name: policy.node.business.name,
    carrierName: policy.node?.carrier?.name,
    brokerInfo: `${policy.node?.broker?.name} ${policy.node?.broker?.email}`,
  }));

  return (
    <Container maxWidth={false}>
      <h1>Policies</h1>
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

export { Policies };
