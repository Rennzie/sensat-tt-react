import React from "../_snowpack/pkg/react.js";
import "./app.css.proxy.js";
import "./reset.css.proxy.js";
import {Layout, TableContainer, Map, ChartDashboard} from "./components/index.js";
import {useSensorReadingsQuery} from "./services/useSensorReadingsQuery.js";
const TITLE = "Sensat Sensor-arena";
function App() {
  const [visView, setVisView] = React.useState("map");
  const {isLoading, data} = useSensorReadingsQuery(1e3);
  const {data: visData} = useSensorReadingsQuery();
  return /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement("header", {
    className: "head"
  }, /* @__PURE__ */ React.createElement("h1", null, TITLE), /* @__PURE__ */ React.createElement("div", {
    className: "toggleControls"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
    className: "toggle",
    id: "map-toggle",
    type: "checkbox",
    checked: visView === "map",
    onClick: () => setVisView("map")
  }), /* @__PURE__ */ React.createElement("span", {
    id: "map-toggle"
  }, "Map")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
    className: "toggle",
    id: "chart-toggle",
    type: "checkbox",
    checked: visView === "chart",
    onClick: () => setVisView("chart")
  }), /* @__PURE__ */ React.createElement("span", {
    id: "chart-toggle"
  }, "Charts")))), /* @__PURE__ */ React.createElement("div", {
    style: {position: "relative", overflowX: "scroll"}
  }, /* @__PURE__ */ React.createElement(TableContainer, {
    data,
    loadingTableData: isLoading
  })), /* @__PURE__ */ React.createElement("div", {
    style: {position: "relative"}
  }, visView === "map" ? /* @__PURE__ */ React.createElement(Map, {
    data: visData
  }) : null, visView === "chart" ? /* @__PURE__ */ React.createElement(ChartDashboard, {
    data: visData
  }) : null));
}
export default App;
