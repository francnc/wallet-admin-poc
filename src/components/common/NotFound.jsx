import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const errorStyles = {
  margin: '0 auto',
  marginTop: '5%',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  height: 'fit-content',
  minHeight: '400px',
  minWidth: '800px',
};

const useStyles = makeStyles({
  root: {
    border: 0,
    color: 'red',
    height: 120,
    padding: '0 30px',
    width: '5em',
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <div style={errorStyles}>
      <ErrorOutlineIcon
        classes={{ root: classes.root }}
        fontSize="large"
        centered
      />
      <h1>Oops! Page not found (404)!</h1>
    </div>
  );
};

export { NotFound };
