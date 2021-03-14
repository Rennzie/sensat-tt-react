// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  grid-column-end: span 2;\n}\n\nh1 {\n  font-size: 24px;\n  margin-left: 20%;\n}\n\n.toggleControls {\n  display: flex;\n  flex-direction: column;\n}\n\n.toggle {\n  margin: 8px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}