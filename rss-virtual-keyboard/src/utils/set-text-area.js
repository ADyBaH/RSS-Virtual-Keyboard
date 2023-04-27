import { changeString } from './change-string';

export function setTextArea(node, cursorRange, addedValue, addedRange = 0, action = 'added') {
  const textArea = node;
  textArea.value = changeString(textArea.value, addedValue, cursorRange, action);
  textArea.setSelectionRange(addedRange, addedRange);
}
