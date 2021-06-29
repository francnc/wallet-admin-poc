import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../gql/queries/getAllUsers';

export const Users = ({ history }) => {
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

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.edges.map((it) => (
          <li
            onClick={() => history.push('/users/' + it.node.id)}
            key={it.node.id}
          >
            {it.node.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
