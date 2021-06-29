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

  const [businessInfo] = data.businesses.nodes;
  const usersInBusiness = data.users.nodes;
  const policiesInBusiness = data.policies.nodes;
  const quotesInBusiness = data.quotes.nodes;

  if (error) {
    return 'Error';
  }

  return (
    <div>
      <p>Business name: {businessInfo.name}</p>
      <p>Business uuid: {businessInfo.uuid}</p>
    </div>
  );
};

export { BusinessView };
