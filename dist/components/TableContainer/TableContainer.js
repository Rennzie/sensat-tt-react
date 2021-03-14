import React from "../../../_snowpack/pkg/react.js";
import {format} from "../../../_snowpack/pkg/date-fns.js";
import Table, {LoadingRows} from "../Table/index.js";
import {sortByDate, sortByString} from "../../utils/sort.js";
const ID = "ID";
const BOX_ID = "Box ID";
const NAME = "Name";
const SENSOR_TYPE = "Type";
const RANGE_LOWER = "Lower";
const RANGE_UPPER = "Upper";
const READING = "Reading";
const UNIT = "Unit";
const TIME = "Time";
function TableContainer({
  data,
  loadingTableData
}) {
  const [sortColumn, setSortColumn] = React.useState("");
  const [sortedData, setSortedData] = React.useState(data);
  const sortAbleData = React.useMemo(() => data ? [...data] : [], [data]);
  const handleSortTime = () => setSortColumn((prevSort) => {
    if (prevSort !== "time") {
      return "time";
    }
    return "";
  });
  const handleSortType = () => setSortColumn((prevSort) => {
    if (prevSort !== "type") {
      return "type";
    }
    return "";
  });
  React.useEffect(() => {
    if (sortColumn) {
      if (sortColumn === "time")
        setSortedData(sortByDate(sortAbleData, "reading_ts", "desc"));
      if (sortColumn === "type")
        setSortedData(sortByString(sortAbleData, "sensor_type"));
    } else {
      setSortedData(data);
    }
  }, [data, sortAbleData, sortColumn]);
  return /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, ID), /* @__PURE__ */ React.createElement("th", null, BOX_ID, " "), /* @__PURE__ */ React.createElement("th", {
    onClick: handleSortType,
    style: {
      cursor: "pointer",
      fontWeight: sortColumn === "type" ? "bold" : "initial"
    }
  }, SENSOR_TYPE), /* @__PURE__ */ React.createElement("th", null, NAME), /* @__PURE__ */ React.createElement("th", null, RANGE_LOWER), /* @__PURE__ */ React.createElement("th", null, RANGE_UPPER), /* @__PURE__ */ React.createElement("th", null, READING), /* @__PURE__ */ React.createElement("th", null, UNIT), /* @__PURE__ */ React.createElement("th", {
    onClick: handleSortTime,
    style: {
      cursor: "pointer",
      fontWeight: sortColumn === "time" ? "bold" : "initial"
    }
  }, TIME))), /* @__PURE__ */ React.createElement("tbody", null, !loadingTableData ? sortedData?.map((sensor) => /* @__PURE__ */ React.createElement("tr", {
    key: `${sensor.reading_ts}-${sensor.id}`
  }, /* @__PURE__ */ React.createElement("td", null, sensor.id), /* @__PURE__ */ React.createElement("td", null, sensor.box_id), /* @__PURE__ */ React.createElement("td", null, sensor.sensor_type), /* @__PURE__ */ React.createElement("td", null, sensor.name), /* @__PURE__ */ React.createElement("td", null, sensor.range_l), /* @__PURE__ */ React.createElement("td", null, sensor.range_u), /* @__PURE__ */ React.createElement("td", null, sensor.reading), /* @__PURE__ */ React.createElement("td", null, sensor.unit), /* @__PURE__ */ React.createElement("td", null, format(new Date(sensor.reading_ts), "dd hh-mm")))) : /* @__PURE__ */ React.createElement(LoadingRows, null)));
}
export default TableContainer;
