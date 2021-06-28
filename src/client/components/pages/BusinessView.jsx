import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_BUSINESS } from '../../gql/queries/getBusiness';

const BusinessView = () => {
  const { businessId } = useParams();

  const { loading, error, data } = useQuery(GET_BUSINESS, {
    variables: {
      ids: businessId,
    },
  });

  const businessInfo = data?.businesses.nodes[0];
  const usersInBusiness = data?.users.nodes;
  const policiesInBusiness = data?.policies?.nodes;
  const quotesInBusiness = data?.quotes?.nodes;

  if (loading) return 'Loading';

  if (error) {
    return 'Error';
  }

  return (
    <>
      <p>Business name: {businessInfo.name}</p>
      <p>Business uuid: {businessInfo.uuid}</p>
    </>
  );
};

export { BusinessView };
