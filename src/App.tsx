import React from 'react';
import './app.css';
import './reset.css';

import { Layout, TableContainer, Map, ChartDashboard } from './components';

import { useSensorReadingsQuery } from './services/useSensorReadingsQuery';

const TITLE = 'Sensat Sensor-arena';

function App(): React.ReactElement {
  const [visView, setVisView] = React.useState<'map' | 'chart'>('map');

  // note: Limited rows dues to performance: Would paginate or virtualise in reality - SFR 2021-03-14
  const { isLoading, data } = useSensorReadingsQuery(1000);
  // note: Data would be "cached". This simulates that - SFR 2021-03-14
  const { data: visData } = useSensorReadingsQuery();

  return (
    <Layout>
      <header className="head">
        <h1>{TITLE}</h1>
        <div className="toggleControls">
          <div>
            <input
              className="toggle"
              id="map-toggle"
              type="checkbox"
              checked={visView === 'map'}
              onClick={() => setVisView('map')}
            />
            <span id="map-toggle">Map</span>
          </div>
          <div>
            <input
              className="toggle"
              id="chart-toggle"
              type="checkbox"
              checked={visView === 'chart'}
              onClick={() => setVisView('chart')}
            />
            <span id="chart-toggle">Charts</span>
          </div>
        </div>
      </header>

      <div style={{ position: 'relative', overflowX: 'scroll' }}>
        <TableContainer data={data} loadingTableData={isLoading} />
      </div>
      <div style={{ position: 'relative' }}>
        {visView === 'map' ? <Map data={visData} /> : null}
        {visView === 'chart' ? <ChartDashboard data={visData} /> : null}
      </div>
    </Layout>
  );
}

export default App;
