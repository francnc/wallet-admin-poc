import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Businesses } from '../components/pages/Businesses';
import { Certificates } from '../components/pages/Certificates';
import { NotFound } from '../components/common/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route component={Businesses} path={'/businesses'} />
      <Route component={Certificates} path={'/certificates'} />
      <Route component={NotFound} />
    </Switch>
  );
};

export { Routes };
