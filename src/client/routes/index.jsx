import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Businesses } from '../components/pages/Businesses';
import { Certificates } from '../components/pages/Certificates';
import { MainLayout } from '../components/common/MainLayout';
import { NotFound } from '../components/common/NotFound';

const Routes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route component={Businesses} path="/businesses" />
        <Route component={Certificates} path="/certificates" />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
};

export { Routes };
