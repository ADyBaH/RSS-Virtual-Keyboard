import { createNode } from '../utils/create-node';

export function createButtons({
  arrayKeys, arrayKeysCode, parentNode,
}) {
  return arrayKeys.map((_, index) => createNode({
    tag: 'button',
    className: 'keyboard-block__key',
    textContent: arrayKeys[index],
    attr: {
      'data-keycode': arrayKeysCode[index],
    },
    parent: parentNode,
  }));
}

export function addedEvent({ callback, nodesArray, event }) {
  if (!nodesArray && !event) return;
  nodesArray.forEach((node) => node.addEventListener(event, callback));
}
