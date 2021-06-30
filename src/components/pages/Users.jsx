import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../gql/queries/getAllUsers';
import { Link } from 'react-router-dom';
import { Loading } from '../common/Loading';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import AccountBox from '@material-ui/icons/AccountBox';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { Button } from '@material-ui/core';
import { CellListItems } from '../common/CellListItems';

const columns = [
  {
    field: 'fullName',
    headerName: 'User Name',
    flex: 1,
    sortable: false,
    renderCell: (user) => <Link to={`/users/${user.id}`}>{user.value}</Link>,
  },
  {
    field: 'businesses',
    headerName: 'Business',
    flex: 1,
    sortable: false,
    renderCell: (businesses) => (
      <CellListItems>
        {businesses.value.map((business) => (
          <Link to={`/businesses/${business.id}`}>{business.name}</Link>
        ))}
      </CellListItems>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    sortable: false,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
    sortable: false,
  },
  {
    field: 'roles',
    headerName: 'Roles',
    flex: 1,
    sortable: false,
    renderCell: (roles) => (
      <CellListItems>{roles.value.map((role) => role.name)}</CellListItems>
    ),
  },
  {
    field: 'uuid',
    headerName: 'UUID',
    flex: 1,
    sortable: false,
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    sortable: false,
    renderCell: (user) => (
      <div
        style={{
          lineHeight: 1.5,
        }}
      >
        <Link to={`/users/${user.id}`}>View</Link>
        {' | '}
        <Link to={`/users/${user.id}/edit`}>Edit</Link>
      </div>
    ),
  },
];

export const Users = ({ history }) => {
  const [isFetching, setFetching] = useState(true);

  const {
    loading,
    error,
    data = {
      users: {
        edges: [],
      },
    },
    fetchMore,
  } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (data.users.edges.length > 0) {
      const hasNextPage = data.users.pageInfo.hasNextPage;
      const endCursor = data.users.pageInfo.endCursor;
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
  }, [data.users.edges]);

  return (
    <Container maxWidth={false}>
      <h1>Users</h1>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ width: '100%', height: '89vh' }}>
          <DataGrid
            rowHeight={80}
            rows={data.users.edges.map((user) => {
              return {
                businesses: user.node.businesses.map((it) => ({
                  id: it.id,
                  name: it.name,
                })),
                ...user.node,
              };
            })}
            columns={columns}
            pageSize={20}
          />
        </div>
      )}
    </Container>
  );
};
