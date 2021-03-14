import React from "../../../_snowpack/pkg/react.js";
import {Line} from "../../../_snowpack/pkg/@reactchartjs/react-chartjs.js";
import {sanitiseBoxDataToChartDataSets, splitDataByKey} from "./utils.js";
const chartOptions = {
  scales: {
    xAxes: [
      {
        type: "time",
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Reading TimeStamp"
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
function ChartDashboard({data}) {
  const dataByBox = React.useMemo(() => {
    if (!data)
      return [];
    const dataByBoxId = splitDataByKey(data, "box_id");
    return sanitiseBoxDataToChartDataSets(dataByBoxId);
  }, [data]);
  if (!data)
    return null;
  return /* @__PURE__ */ React.createElement("div", null, dataByBox.map((boxData) => /* @__PURE__ */ React.createElement(Line, {
    type: "line",
    data: boxData,
    options: chartOptions
  })));
}
export default ChartDashboard;
