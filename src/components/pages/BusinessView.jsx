import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_BUSINESS } from '../../gql/queries/getBusiness';
import { Loading } from '../common/Loading';

const BusinessView = () => {
  const { businessId } = useParams();

  const {
    loading,
    error,
    data = {
      businesses: {
        nodes: [],
      },
      users: {
        nodes: [],
      },
      policies: {
        nodes: [],
      },
      quotes: {
        nodes: [],
      },
    },
  } = useQuery(GET_BUSINESS, {
    variables: {
      ids: parseInt(businessId, 0),
    },
  });

  if (loading) return <Loading />;

  if (error) {
    return 'Error';
  }

  return (
    <div>
      <p>Business name: {data.businesses.nodes[0].name}</p>
      <p>Business uuid: {data.businesses.nodes[0].uuid}</p>
    </div>
  );
};

export { BusinessView };
