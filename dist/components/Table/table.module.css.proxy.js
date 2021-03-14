
export let code = "._tableWrapper_qhetd_1 {\n  position: absolute;\n  bottom: 0;\n  top: 0;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\ntable {\n  display: grid;\n  border-collapse: collapse;\n  min-width: 100%;\n  grid-template-columns:\n    minmax(100px, 1fr) /*ID*/\n    minmax(80px, 1fr) /*BOX_ID*/\n    minmax(70px, 1fr) /*TYPE*/\n    minmax(100px, 1fr) /*NAME*/\n    minmax(70px, 1fr) /*RANGE_LOWER*/\n    minmax(70px, 1fr) /*RANGE_UPPER*/\n    minmax(80px, 1fr) /*READING*/\n    minmax(70px, 1fr) /*UNIT*/\n    minmax(100px, 1fr); /*TIME*/\n}\n\nthead,\ntbody,\ntr {\n  /* Lets the td and th elements be grid cells. */\n  display: contents;\n}\n\nth,\ntd {\n  padding: 15px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\nth {\n  position: sticky;\n  top: 0;\n  background: #0f0d0e;\n  text-align: left;\n  font-weight: normal;\n  font-size: 1rem;\n  color: white;\n}\n\nth:last-child {\n  border: 0;\n}\n\ntd {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  font-size: small;\n  color: #808080;\n}\n\ntr:nth-child(even) td {\n  background: #0f0d0e30;\n}\n";
let json = {"tableWrapper":"_tableWrapper_qhetd_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}