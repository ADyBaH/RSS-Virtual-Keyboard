export default function createNode(
  {
    tag = 'div', className, textContent = '', attr = '', parrent = '',
  },
) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = textContent;
  if (attr) {
    Object.keys(attr)
      .forEach((key) => node.setAttribute(key, attr[key]));
  }
  if (parrent) parrent.appendChild(node);
  return node;
}
