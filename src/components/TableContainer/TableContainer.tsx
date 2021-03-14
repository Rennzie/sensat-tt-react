import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import Table, { LoadingRows } from '../Table';
import type { SensorReading } from '../../services/useSensorReadingsQuery';
import { sortByDate, sortByString } from '../../utils/sort';

type Props = { data?: SensorReading[]; loadingTableData: boolean };

const ID = 'ID';
const BOX_ID = 'Box ID';
const NAME = 'Name';
const SENSOR_TYPE = 'Type';
const RANGE_LOWER = 'Lower';
const RANGE_UPPER = 'Upper';
const READING = 'Reading';
const UNIT = 'Unit';
const TIME = 'Time';

function TableContainer({
  data,
  loadingTableData,
}: Props): ReactElement | null {
  const [sortColumn, setSortColumn] = React.useState<'time' | 'type' | ''>('');
  const [sortedData, setSortedData] = React.useState(data);

  // note: Clone the data: easier to reset - SFR 2021-03-14
  const sortAbleData = React.useMemo(() => (data ? [...data] : []), [data]);

  const handleSortTime = () =>
    setSortColumn((prevSort) => {
      if (prevSort !== 'time') {
        return 'time';
      }
      return '';
    });

  const handleSortType = () =>
    setSortColumn((prevSort) => {
      if (prevSort !== 'type') {
        return 'type';
      }
      return '';
    });

  React.useEffect(() => {
    if (sortColumn) {
      if (sortColumn === 'time')
        setSortedData(sortByDate(sortAbleData, 'reading_ts', 'desc'));

      if (sortColumn === 'type')
        setSortedData(sortByString(sortAbleData, 'sensor_type'));
    } else {
      setSortedData(data);
    }
  }, [data, sortAbleData, sortColumn]);

  return (
    <Table>
      <thead>
        <tr>
          <th>{ID}</th>
          <th>{BOX_ID} </th>
          <th
            onClick={handleSortType}
            style={{
              cursor: 'pointer',
              fontWeight: sortColumn === 'type' ? 'bold' : 'initial',
            }}
          >
            {SENSOR_TYPE}
          </th>
          <th>{NAME}</th>
          <th>{RANGE_LOWER}</th>
          <th>{RANGE_UPPER}</th>
          <th>{READING}</th>
          <th>{UNIT}</th>
          <th
            onClick={handleSortTime}
            style={{
              cursor: 'pointer',
              fontWeight: sortColumn === 'time' ? 'bold' : 'initial',
            }}
          >
            {TIME}
          </th>
        </tr>
      </thead>
      <tbody>
        {!loadingTableData ? (
          sortedData?.map((sensor) => (
            <tr key={`${sensor.reading_ts}-${sensor.id}`}>
              <td>{sensor.id}</td>
              <td>{sensor.box_id}</td>
              <td>{sensor.sensor_type}</td>
              <td>{sensor.name}</td>
              <td>{sensor.range_l}</td>
              <td>{sensor.range_u}</td>
              <td>{sensor.reading}</td>
              <td>{sensor.unit}</td>
              <td>{format(new Date(sensor.reading_ts), 'dd hh-mm')}</td>
            </tr>
          ))
        ) : (
          <LoadingRows />
        )}
      </tbody>
    </Table>
  );
}

export default TableContainer;
