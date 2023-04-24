import { createNode } from '../utils/create-node';

export function createButtons(
  {
    arrayKeys, arrayKeysCapslock, arrayKeysShift, arrayKeysCode, arraykeysCapsAndShift, parentNode,
  },
) {
  return arrayKeys.map((_, index) => createNode({
    tag: 'button',
    className: 'keyboardBlock_key',
    textContent: arrayKeys[index],
    attr: {
      'data-key': arrayKeys[index],
      'data-keycapslock': arrayKeysCapslock[index],
      'data-keyshift': arrayKeysShift[index],
      'data-keyshiftandshift': arraykeysCapsAndShift[index],
      'data-keycode': arrayKeysCode[index],
    },
    parent: parentNode,
  }));
}

export function addedEvent({ callback, nodesArray, event }) {
  if (!nodesArray && !event) return;
  nodesArray.forEach((node) => node.addEventListener(event, callback));
}
