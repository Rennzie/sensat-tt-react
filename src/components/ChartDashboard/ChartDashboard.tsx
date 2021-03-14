import React, { ReactElement } from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { sanitiseBoxDataToChartDataSets, splitDataByKey } from './utils';
import type { SensorReading } from '../../services/useSensorReadingsQuery';

const chartOptions = {
  scales: {
    xAxes: [
      {
        type: 'time',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Reading TimeStamp',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

type Props = { data?: SensorReading[] };

function ChartDashboard({ data }: Props): ReactElement | null {
  // note: Large data sets are expensive to sanitise - SFR 2021-03-14
  const dataByBox = React.useMemo(() => {
    if (!data) return [];
    const dataByBoxId = splitDataByKey(data, 'box_id');
    return sanitiseBoxDataToChartDataSets(dataByBoxId);
  }, [data]);

  if (!data) return null;
  return (
    <div>
      {dataByBox.map((boxData) => (
        <Line type="line" data={boxData} options={chartOptions} />
      ))}
    </div>
  );
}

export default ChartDashboard;
