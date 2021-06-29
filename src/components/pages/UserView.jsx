import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_BUSINESS } from '../../gql/queries/getBusiness';
import { Loading } from '../common/Loading';

export const UserView = ({ params }) => {
  console.log('params', params)

  return (
    <div>
      <h1>User</h1>
      {/*<TableBody>*/}
      {/*  {rows.map((row) => (*/}
      {/*    <TableRow key={row.name}>*/}
      {/*      <TableCell component="th" scope="row">*/}
      {/*        {row.name}*/}
      {/*      </TableCell>*/}
      {/*      <TableCell align="right">{row.calories}</TableCell>*/}
      {/*      <TableCell align="right">{row.fat}</TableCell>*/}
      {/*      <TableCell align="right">{row.carbs}</TableCell>*/}
      {/*      <TableCell align="right">{row.protein}</TableCell>*/}
      {/*    </TableRow>*/}
      {/*  ))}*/}
      {/*</TableBody>*/}
    </div>
  );
};
