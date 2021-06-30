import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/queries/getUser';
import { Loading } from '../common/Loading';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ViewHeader } from '../common/ViewHeader';
import { redirectToWallet } from '../../util/walletRedirection';

export const UserView = ({ match, history }) => {
  const [currentBusinessUuid, setCurrentBusinessUuid] = useState('');
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

  const businesses = user.businesses || [];

  useEffect(() => {
    if (!loading && businesses[0]) {
      setCurrentBusinessUuid(businesses[0].uuid);
    }
  }, [loading]);

  const rows = [
    {
      name: 'Business names',
      value:
        businesses.length > 0 ? (
          <RadioGroup
            aria-label="business"
            name="business"
            value={currentBusinessUuid}
            onChange={(event) => {
              setCurrentBusinessUuid(event.target.value);
            }}
          >
            {businesses.map((business) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <FormControlLabel
                    label="-"
                    value={business.uuid}
                    control={<Radio />}
                  />
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      redirectToWallet(business.id, 'quick_links');
                    }}
                    disabled={business.uuid !== currentBusinessUuid}
                  >
                    Impersonate
                  </Button>
                  <div
                    style={{
                      padding: '0 0 0 10px',
                    }}
                  >
                    <Link key={business.id} to={`/businesses/${business.id}`}>
                      {business.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        ) : (
          'No businesses'
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
        <Link to="/users">« Back to Users</Link>
        <Button
          style={{
            marginLeft: 10,
          }}
          onClick={() => {
            history.push(`/users/${userId}/edit`);
          }}
          variant="contained"
          color="default"
        >
          Edit User
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
