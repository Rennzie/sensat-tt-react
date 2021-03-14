
export let code = "._layoutRoot_1mc1l_1 {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: 80px 1fr;\n}\n";
let json = {"layoutRoot":"_layoutRoot_1mc1l_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}