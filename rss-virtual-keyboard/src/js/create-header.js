import { createNode } from '../utils/create-node';

export function createHeader(node) {
  const header = createNode({ tag: 'header', className: 'header', parent: node });

  createNode({
    tag: 'h1',
    textContent: 'RSS Virtual Keyboard',
    className: 'header__logo',
    parent: header,
  });

  return header;
}
