import { changeString } from './change-string';

export function setTextArea(node, cursorRange, addedValue, addedRange = 0, action = 'added') {
  const textArea = node;
  const textCursor = cursorRange;
  textArea.value = changeString(textArea.value, addedValue, textCursor, action);
  textArea.setSelectionRange(addedRange, addedRange);
}
