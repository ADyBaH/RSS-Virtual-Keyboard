export default function createNode(
  {
    tag = 'div', className, textContent = '', attr = '', parent = '',
  },
) {
  const node = document.createElement(tag);
  if (className) {
    if (typeof className === 'string') {
      node.className = className;
    } else {
      className.forEach((string) => node.classList.add(string));
    }
  }
  node.textContent = textContent;
  if (attr) {
    Object.keys(attr)
      .forEach((key) => node.setAttribute(key, attr[key]));
  }
  if (parent) parent.appendChild(node);
  return node;
}
