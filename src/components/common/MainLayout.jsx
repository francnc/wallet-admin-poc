import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Logo from '../../assets/images/logo.svg';
import { SideBar } from './SideBar/index';

export const MainLayout = ({ children }) => {
  return (
    <main>
      <AppBar
        position="fixed"
        style={{
          height: 50,
          padding: 5,
        }}
      >
        <img className="logo" src={Logo} />
      </AppBar>
      <div
        style={{
          marginTop: 50,
          minHeight: '100%',
          display: 'flex',
        }}
      >
        <SideBar />
        <Container>{children}</Container>
      </div>
    </main>
  );
};
