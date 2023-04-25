export function createNode({
  tag = 'div', className, textContent = '', attr = '', parent = '',
}) {
  const node = document.createElement(tag);

  if (className) node.className = className;

  node.textContent = textContent;
  if (attr) {
    Object.keys(attr)
      .forEach((key) => node.setAttribute(key, attr[key]));
  }
  if (parent) parent.appendChild(node);
  return node;
}
