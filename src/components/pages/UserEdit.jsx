import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/queries/getUser';
import { Loading } from '../common/Loading';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { ViewHeader } from '../common/ViewHeader';
import { Card, Input } from '@material-ui/core';

export const UserEdit = ({ match }) => {
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

  return (
    <Container maxWidth={false}>
      <ViewHeader title="Edit User" subTitle={user.fullName}>
        <Link to="/users">« Back to Users</Link>
      </ViewHeader>
      UserEdit
      <form>
        <Input  value={user.firstName} />
      </form>
      <div>
        <h1>Account Settings</h1>
        <Card>Delete User</Card>
      </div>
    </Container>
  );
};
