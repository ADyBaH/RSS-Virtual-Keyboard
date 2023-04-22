import { createNode } from '../utils/create-node';

export function createButtons(
  {
    jsonKey, jsonKeyCapslock, jsonKeyShift, jsonKeyCode, parentNode,
  },
) {
  return jsonKey.map((_, index) => createNode({
    tag: 'button',
    className: 'keyboardBlock_key',
    textContent: jsonKey[index],
    attr: {
      'data-key': jsonKey[index],
      'data-keycapslock': jsonKeyCapslock[index],
      'data-keyshift': jsonKeyShift[index],
      'data-keycode': jsonKeyCode[index],
    },
    parent: parentNode,
  }));
}

export function addedEvent({ callback, nodesArray, event }) {
  if (!nodesArray && !event) return;
  nodesArray.forEach((node) => node.addEventListener(event, callback));
}
