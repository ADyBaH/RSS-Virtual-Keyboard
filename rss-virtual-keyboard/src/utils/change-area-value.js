import { changeString } from './change-string';

export function changeAreaValue(node, cursorRange, addedValue, addedRange = 0, action = 'addCharacter') {
  Object.assign(node, { value: changeString(node.value, addedValue, cursorRange, action) });
  node.setSelectionRange(addedRange, addedRange);
}
