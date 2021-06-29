import React, { useState } from 'react';
import { useParams } from 'react-router';
import { node, any } from 'prop-types';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import { GET_BUSINESS } from '../../gql/queries/getBusiness';
import { Loading } from '../common/Loading';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: node,
  index: any.isRequired,
  value: any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

  const [value, setValue] = useState(0);
  const classes = useStyles();

  if (loading) return <Loading />;

  if (error) {
    return 'Error';
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <h1>{data.businesses.nodes[0].name}</h1>
      <h3>uuid: {data.businesses.nodes[0].uuid}</h3>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            centered
          >
            <Tab label="Users" props={a11yProps(0)} />
            <Tab label="Policies" {...a11yProps(1)} />
            <Tab label="Quotes" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {data.users.nodes.map((user) => (
            <li>{user.fullName}</li>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {data.policies.nodes.map((policy) => (
            <li>{policy.insurance || policy.insuranceTypeName}</li>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {data.quotes.nodes.map((quote) => (
            <li>{quote.status}</li>
          ))}
        </TabPanel>
      </div>
    </Container>
  );
};

export { BusinessView };
