import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/queries/getUser';
import { Loading } from '../common/Loading';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { ViewHeader } from '../common/ViewHeader';
import { Button, Card } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { FixedTags } from '../common/FixedTags';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roles: [],
};

export const UserEdit = ({ match }) => {
  const {
    params: { userId },
  } = match;

  const [state, setState] = useState(initialState);

  const staticRoles = {
    admin: 'Admin',
    super_admin: 'Super Admin',
    agent: 'Agent',
  };

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

  useEffect(() => {
    if (user) {
      setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        roles:
          user.roles?.map((role) => ({
            ...role,
            title: staticRoles[role.name],
          })) || [],
      });
    }
  }, [loading]);

  const inputProps = {
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal',
  };

  const updateUserHandler = (event) => {
    event.preventDefault();
    console.log('submit', state);
  };

  const changePasswordHandler = (event) => {
    event.preventDefault();
    console.log('submit', state);
  };

  const deleteUserHandler = (event) => {
    event.preventDefault();
    console.log('submit', state);
  };

  return (
    <Container maxWidth={false}>
      <ViewHeader title="Edit User" subTitle={state.firstName}>
        <Link to="/users">« Back to Users</Link>
      </ViewHeader>
      {loading ? (
        <Loading />
      ) : (
        <form>
          <TextField
            label="First Name (Optional)"
            name="firstName"
            value={state.firstName}
            {...inputProps}
          />
          <TextField
            label="Last Name (Optional)"
            name="lastName"
            value={state.lastName}
            {...inputProps}
          />
          <TextField
            label="Email (Optional)"
            name="email"
            value={state.email}
            {...inputProps}
          />
          <TextField
            label="Phone (Optional)"
            name="phone"
            value={state.phone}
            {...inputProps}
          />
          <FixedTags
            label="Roles"
            placeholder="Add roles"
            options={Object.keys(staticRoles).map((key) => ({
              title: staticRoles[key],
              name: key,
            }))}
            onChange={(items) => {
              setState({
                ...state,
                roles: items.map((role) => ({
                  ...role,
                  title: staticRoles[role.name],
                })),
              });
            }}
            values={state.roles}
          />
        </form>
      )}
      <Button variant="contained" color="secondary" onClick={updateUserHandler}>
        Update User
      </Button>
      <div>
        <ViewHeader title="Account Settings" />
        <Card variant="outlined">
          <Button
            color="secondary"
            onClick={deleteUserHandler}
          >
            Delete User
          </Button>
          <Button
            color="secondary"
            onClick={changePasswordHandler}
          >
            Change Password
          </Button>
        </Card>
      </div>
    </Container>
  );
};
