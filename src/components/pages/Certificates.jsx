import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import { GET_ALL_CERTIFICATES } from '../../gql/queries/getAllCertificates';
import { Loading } from '../common/Loading';

const Certificates = () => {
  /*
    commented code is to avoid querying all businesses in Leanid's local
    uncomment with precaution when you need
  */
  // const [isFetching, setFetching] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_CERTIFICATES);
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
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Link to={`/certificates/${params.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'Holder Name',
      headerName: 'holderName',
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'insuranceType',
      headerName: 'Insurance Types',
      flex: 1,
      sortable: false,
    },
    {
      field: 'holderTypesAttributes',
      headerName: 'Holder Type',
      flex: 1.5,
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
      field: 'businessUuid',
      headerName: 'Action',
      sortable: false,
      flex: 0.5,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <a
          href={`https://wallet-admin.aoncover.biz/businesses/${params.value}/certificates/${params.id}/edit`}
        >
          Edit
        </a>
      ),
    },
  ];

  const rows = data?.certificates?.edges?.map((cert) => {
    const holderTypesAttributes = cert.node.holderTypesAttributes
      ?.map((attr) => attr.value)
      .join(', ');
    return {
      ...cert.node,
      businessUuid: cert.node.businessAttributes.uuid,
      holderTypesAttributes: holderTypesAttributes,
      name: cert.node.businessAttributes.name,
      createdAt: new Date(cert.node.createdAt),
      updatedAt: new Date(cert.node.updatedAt),
    };
  });

  return (
    <Container maxWidth={false}>
      <h1>Certificates</h1>
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

export { Certificates };
