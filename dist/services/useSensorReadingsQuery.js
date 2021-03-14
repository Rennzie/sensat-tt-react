import * as React from "../../_snowpack/pkg/react.js";
import sensorReadings from "../data/sensor_readings.json.proxy.js";
export const useSensorReadingsQuery = (records = -1) => {
  const [status, setStatus] = React.useState("idle");
  const loadCount = React.useRef(0);
  React.useEffect(() => {
    const currentCount = loadCount.current;
    if (currentCount <= 0) {
      setStatus("loading");
      setTimeout(() => {
        setStatus("success");
        loadCount.current = currentCount + 1;
      }, 1e3);
    } else {
      setStatus("success");
    }
  }, []);
  const isLoading = status === "loading";
  const data = isLoading || status === "idle" ? void 0 : sensorReadings.slice(0, records);
  return {isLoading, data};
};
