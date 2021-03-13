import React from 'react';
import './App.css';
import { Layout, Table } from './components';

import { useSensorReadingsQuery } from './services/useSensorReadingsQuery';

function App(): React.ReactElement {
  // Create the count state.
  const { isLoading, data } = useSensorReadingsQuery();
  console.log({ data: data?.[1], isLoading });

  // Return the App component.
  return (
    <Layout>
      <div style={{ backgroundColor: 'red', gridColumnEnd: 'span 2' }}>
        Header
      </div>

      <div style={{ backgroundColor: 'blue' }}>
        <Table />{' '}
      </div>
      <div style={{ backgroundColor: 'green' }}>visualisations</div>
    </Layout>
  );
}

export default App;
