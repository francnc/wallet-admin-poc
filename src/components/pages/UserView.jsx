import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/queries/getUser';
import { Loading } from '../common/Loading';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import { CellListItems } from '../common/CellListItems';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ViewHeader } from '../common/ViewHeader';

export const UserView = ({ match, history }) => {
  const {
    params: { userId },
  } = match;

  const {
    loading,
    data = {
      users: {
        nodes: [],
      },
    },
  } = useQuery(GET_USER, {
    variables: {
      ids: parseInt(userId, 0),
    },
  });

  const [user = {}] = data.users.nodes;

  const rows = [
    {
      name: 'Business names',
      value: (
        <CellListItems>
          {user.businesses?.map((business) => (
            <Link key={business.id} to={`/businesses/${business.id}`}>
              {business.name}
            </Link>
          ))}
        </CellListItems>
      ),
    },
    {
      name: 'First Name',
      value: user.firstName,
    },
    {
      name: 'Last Name',
      value: user.lastName,
    },
    {
      name: 'Email',
      value: user.email,
    },
    {
      name: 'Phone',
      value: user.phone,
    },
    {
      name: 'Created at',
      value: user.createdAt,
    },
    {
      name: 'Updated at',
      value: user.updatedAt,
    },
    {
      name: 'SF UUID',
      value: user.uuid,
    },
  ];

  return (
    <Container maxWidth={false}>
      <ViewHeader title="User">
        <Button
          onClick={() => {
            history.push(`/users/${userId}/edit`);
          }}
          variant="contained"
          color="default"
        >
          Edit
        </Button>
      </ViewHeader>
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow selected={index % 2 !== 1} key={row.name}>
                <TableCell component="th" scope="row">
                  <b>{row.name}</b>
                </TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};
