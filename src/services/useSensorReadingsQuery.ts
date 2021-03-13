/**
 * Hook emulating a server side request for `data/sensor_readings.json`
 */

import * as React from 'react';
import sensorReadings from '../data/sensor_readings.json';

type SensorType = 'O3' | 'NO2' | 'CO' | 'TEMP' | 'RH' | string;
type Unit = 'ppm' | '%' | '\u00baC' | string;

export interface SensorReading {
  /** UUID for this sensor reading */
  id: string;
  /** UUID of the box */
  box_id: string;
  /** type of the sensor */
  sensor_type: SensorType;
  /** type of data read by sensor */
  name: string;
  /** measuring range lower bound */
  range_l: number;
  /** measuring range upper bound */
  range_u: number;
  /** location of the box (lon) */
  longitude: number;
  /** location of the box (lat) */
  latitude: number;
  /** actual value being read */
  reading: number;
  /** measurement unit */
  unit: Unit;
  /** when the reading was taken */
  reading_ts: string;
}

interface QueryResult {
  isLoading: boolean;
  data: SensorReading[] | undefined;
}

export const useSensorReadingsQuery = (): QueryResult => {
  const [status, setStatus] = React.useState('idle');
  /** Pretend we have a cache. Return data immediately if this is > 0. Using a ref so as not to loop */
  const loadCount = React.useRef(0);

  React.useEffect(() => {
    const currentCount = loadCount.current;
    if (currentCount <= 0) {
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
        loadCount.current = currentCount + 1;
      }, 1000);
    } else {
      setStatus('success');
    }
  }, []);

  const isLoading = status === 'loading';
  const data: SensorReading[] | undefined =
    isLoading || status === 'idle' ? undefined : sensorReadings;

  return { isLoading, data };
};
