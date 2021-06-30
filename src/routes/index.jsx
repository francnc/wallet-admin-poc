import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../components/pages/HomePage';
import { Businesses } from '../components/pages/Businesses';
import { BusinessView } from '../components/pages/BusinessView/index';
import { UserView } from '../components/pages/UserView';
import { UserEdit } from '../components/pages/UserEdit';
import { Users } from '../components/pages/Users';
import { Certificates } from '../components/pages/Certificates';
import { Policies } from '../components/pages/Policies';
import { Quotes } from '../components/pages/Quotes';
import { MainLayout } from '../components/common/MainLayout';
import { NotFound } from '../components/common/NotFound';

const Routes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route component={Users} path="/users" exact />
        <Route component={UserView} path="/users/:userId" />
        <Route component={UserEdit} path="/users/:userId/edit" />
        <Route component={HomePage} path="/" exact />
        <Route component={Businesses} path="/businesses" exact />
        <Route component={Policies} path="/policies" exact />
        <Route component={Quotes} path="/quotes" exact />
        <Route component={BusinessView} path="/businesses/:businessId" />
        <Route component={Certificates} path="/certificates" />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
};

export { Routes };
