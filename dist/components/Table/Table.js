import React from "../../../_snowpack/pkg/react.js";
import styles from "./table.module.css.proxy.js";
function Table({children}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.tableWrapper
  }, /* @__PURE__ */ React.createElement("table", null, children));
}
export default Table;
