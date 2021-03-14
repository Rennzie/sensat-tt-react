import chroma from "../../../_snowpack/pkg/chroma-js.js";
export function splitDataByKey(data, key) {
  const dataByKey = {};
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
export function sanitiseBoxDataToChartDataSets(boxes) {
  const sanitisedDataSets = [];
  Object.values(boxes).forEach((boxSensors) => {
    const dataBySensorId = splitDataByKey(boxSensors, "id");
    let longestSet = 0;
    let labels = [];
    const datasets = [];
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
        borderColor: chroma.random().hex()
      });
    });
    sanitisedDataSets.push({datasets, labels});
  });
  return sanitisedDataSets;
}
