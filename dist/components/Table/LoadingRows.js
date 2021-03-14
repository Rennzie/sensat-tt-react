import React from "../../../_snowpack/pkg/react.js";
const NO_DATA = "---";
function LoadingRows() {
  const [count, setCount] = React.useState([0]);
  React.useEffect(() => {
    setTimeout(() => {
      const randomKey = Math.floor(Math.random() * 1e4);
      if (count.length <= 3) {
        setCount([...count, randomKey]);
      } else {
        setCount([randomKey]);
      }
    }, 300);
  }, [count]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, count.map((row) => /* @__PURE__ */ React.createElement("tr", {
    key: row
  }, /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "), /* @__PURE__ */ React.createElement("td", null, " ", NO_DATA, " "))));
}
export default LoadingRows;
