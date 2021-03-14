import type { ChartData, ChartDataSets } from 'chart.js';
import chroma from 'chroma-js';
import type { SensorReading } from '../../services/useSensorReadingsQuery';

export function splitDataByKey(
  data: SensorReading[],
  key: 'id' | 'box_id',
): Record<string, SensorReading[]> {
  const dataByKey: Record<string, SensorReading[]> = {};

  data?.forEach((item) => {
    const boxKey = item[key];
    if (dataByKey.hasOwnProperty(boxKey)) {
      dataByKey[boxKey].push(item);
    } else {
      dataByKey[boxKey] = [item];
    }
  });

  return dataByKey;
}

export function sanitiseBoxDataToChartDataSets(
  boxes: Record<string, SensorReading[]>,
): ChartData[] {
  const sanitisedDataSets: ChartData[] = [];

  Object.values(boxes).forEach((boxSensors) => {
    const dataBySensorId: Record<string, SensorReading[]> = splitDataByKey(
      boxSensors,
      'id',
    );

    // note: Ensure we have enough labels if some sensors have fewer readings - SFR 2021-03-14
    let longestSet = 0;
    let labels: Date[] = [];
    const datasets: ChartDataSets[] = [];

    Object.entries(dataBySensorId).forEach(([sensorId, sensorData]) => {
      const values = sensorData.map((sensor) => sensor.reading);
      const totalReadings = sensorData.length;

      if (totalReadings > longestSet) {
        labels = sensorData.map((sensor) => new Date(sensor.reading_ts));
        longestSet = totalReadings;
      }

      datasets.push({
        label: sensorId,
        data: values,
        backgroundColor: chroma.random().hex(),
        borderColor: chroma.random().hex(),
      });
    });

    sanitisedDataSets.push({ datasets, labels });
  });

  return sanitisedDataSets;
}
