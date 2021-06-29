import React, { useState } from 'react';
import { useParams } from 'react-router';
import { node, any } from 'prop-types';
import { useQuery } from '@apollo/client';
import { Container, Tabs, Tab } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { GET_BUSINESS } from '../../../gql/queries/getBusiness';
import { Loading } from '../../common/Loading';
import { UserColumns, PolicyColumns, QuoteColumns } from './columnConfig';

const TabPanel = (props) => {
  const { children, value, index, columns, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ width: '100%', height: '89vh' }}>
          <DataGrid rows={children} columns={columns} pageSize={20} />
        </div>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: node,
  index: any.isRequired,
  value: any.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

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

  if (loading) return <Loading />;

  if (error) {
    return 'Error';
  }

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container style={{ maxWidth: '100%' }}>
      <h1>{data.businesses.nodes[0].name}</h1>
      <h3>uuid: {data.businesses.nodes[0].uuid}</h3>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        <Tab label="Users" {...a11yProps(0)} />
        <Tab label="Policies" {...a11yProps(1)} />
        <Tab label="Quotes" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} columns={UserColumns}>
        {data.users.nodes}
      </TabPanel>
      <TabPanel value={value} index={1} columns={PolicyColumns}>
        {data.policies.nodes}
      </TabPanel>
      <TabPanel value={value} index={2} columns={QuoteColumns}>
        {data.quotes.nodes}
      </TabPanel>
    </Container>
  );
};

export { BusinessView };
