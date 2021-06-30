import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../../gql/queries/getUser';
import { UPDATE_USER } from '../../gql/mutations/updateUser';
import { Loading } from '../common/Loading';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { ViewHeader } from '../common/ViewHeader';
import { Button, Card } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { FixedTags } from '../common/FixedTags';
import { DELETE_USER } from '../../gql/mutations/deleteUser';
import { GET_ALL_USERS } from '../../gql/queries/getAllUsers';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roles: [],
};

export const UserEdit = ({ match, history }) => {
  const {
    params: { userId },
  } = match;

  const [state, setState] = useState(initialState);
  const [isShowAlert, showAlert] = useState(false);

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
    if (!loading) {
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

  const [updateUser, { loading: updateUserLoading }] = useMutation(UPDATE_USER);
  const [deleteUser, { loading: deleteUserLoading }] = useMutation(DELETE_USER);

  const inputProps = {
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal',
  };

  const updateUserHandler = (event) => {
    event.preventDefault();

    updateUser({
      variables: {
        input: {
          ...state,
          roles: state.roles.map((role) => role.name),
        },
        userId,
      },
      refetchQueries: [
        {
          query: GET_USER,
          variables: {
            ids: parseInt(userId, 0),
          },
        },
      ],
    });
  };

  const changePasswordHandler = (event) => {
    event.preventDefault();
  };

  const deleteUserHandler = (event) => {
    event.preventDefault();
    showAlert(false);
    deleteUser({
      variables: {
        id: userId,
      },
      refetchQueries: [
        {
          query: GET_ALL_USERS,
        },
      ],
    }).then(() => {
      history.push('/users');
    });
  };

  const onChangeField = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Container maxWidth={false}>
      {isShowAlert && (
        <Alert severity="warning">
          <div
            style={{
              display: 'flex',
            }}
          >
            <div>Are you sure you want to delete this user?</div>
            <div>
              <Button size="small" color="default" onClick={deleteUserHandler}>
                Yes
              </Button>
              <Button
                size="small"
                color="default"
                onClick={() => {
                  showAlert(false);
                }}
              >
                No
              </Button>
            </div>
          </div>
        </Alert>
      )}
      <ViewHeader title="Edit User" subTitle={state.firstName}>
        <Link to="/users">« Back to Users</Link>
        <Button
          style={{
            marginLeft: 10,
          }}
          onClick={() => {
            history.push(`/users/${userId}`);
          }}
          variant="contained"
          color="default"
        >
          View User
        </Button>
      </ViewHeader>
      {loading ? (
        <Loading />
      ) : (
        <form>
          <TextField
            onChange={onChangeField}
            label="First Name (Optional)"
            name="firstName"
            value={state.firstName}
            {...inputProps}
          />
          <TextField
            onChange={onChangeField}
            label="Last Name (Optional)"
            name="lastName"
            value={state.lastName}
            {...inputProps}
          />
          <TextField
            onChange={onChangeField}
            label="Email (Required)"
            name="email"
            value={state.email}
            {...inputProps}
          />
          <TextField
            onChange={onChangeField}
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
      <Button
        disabled={loading || updateUserLoading}
        variant="contained"
        color="secondary"
        onClick={updateUserHandler}
      >
        Update User
      </Button>
      <div>
        <ViewHeader title="Account Settings" />
        <Card variant="outlined">
          <Button
            disabled={loading || deleteUserLoading}
            color="secondary"
            onClick={() => {
              showAlert(true);
            }}
          >
            Delete User
          </Button>
          <Button color="secondary" onClick={changePasswordHandler}>
            Change Password
          </Button>
        </Card>
      </div>
    </Container>
  );
};
