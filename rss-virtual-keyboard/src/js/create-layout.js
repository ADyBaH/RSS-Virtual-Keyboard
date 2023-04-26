import { createNode } from '../utils/create-node';
import { createButtons, addedEvent } from './create-buttons';
import { setToLocalStorage, getFromLocalStorage } from '../utils/local-storage';
import jsonButtons from '../data/keyboard.json';
import { createFooter } from './create-footer';
import { createHeader } from './create-header';
import { changeButtonValue } from '../utils/change-buttonsValue';
import { getDataSetString } from '../utils/getDatasetString';
import { setTextArea } from '../utils/set-text-area';

const root = createNode({ className: 'root', parent: document.body });
createHeader(root);
const main = createNode({ tag: 'main', className: 'main', parent: root });
createFooter(root);

const keyboardState = {
  capslock: false,
  shift: false,
  language: getFromLocalStorage('languageKeyboard') || setToLocalStorage('languageKeyboard', 'en'),
  ignoreAddedTextButtonsArray: [
    'Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft',
    'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight',
  ],
};

const textArea = createNode({
  tag: 'textarea',
  className: 'textarea-for-keyboard',
  parent: main,
  attr: {
    autocomplete: 'off',
    rows: 20,
    cols: 70,
  },
});

const keyboardBlock = createNode({
  className: 'keyboard-block',
  parent: main,
});

const arrayButtons = createButtons({
  arrayKeys: jsonButtons.en.keys,
  arrayKeysCode: jsonButtons.keysCode,
  parentNode: keyboardBlock,
});

function clickOnButton(event) {
  event.preventDefault();
  const { target } = event;
  let textCursor = textArea.selectionEnd;
  textArea.focus();

  if (!keyboardState.ignoreAddedTextButtonsArray.includes(target.dataset.keycode)) {
    textCursor += 1;
    setTextArea(textArea, textArea.selectionEnd, target.textContent, textCursor);
  }

  if (target.dataset.keycode === 'Tab') {
    textCursor += 4;
    setTextArea(textArea, textArea.selectionEnd, '    ', textCursor);
  }

  if (target.dataset.keycode === 'Enter') {
    textCursor += 1;
    setTextArea(textArea, textArea.selectionEnd, '\n', textCursor);
  }

  if (target.dataset.keycode === 'Backspace') {
    textCursor = !textCursor ? 0 : textCursor -= 1;
    setTextArea(textArea, textArea.selectionEnd, '', textCursor, 'removeBefore');
  }

  if (target.dataset.keycode === 'Delete') {
    setTextArea(textArea, textArea.selectionEnd, '', textCursor, 'removeAfter');
  }

  if (target.dataset.keycode === 'CapsLock') {
    keyboardState.capslock = !keyboardState.capslock;
    changeButtonValue({
      arrayNodes: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      json: jsonButtons,
      lang: keyboardState.language,
      statusKeyboard: getDataSetString(keyboardState.shift, keyboardState.capslock),
    });
    target.classList.toggle('activeButton');
  }
}

function buttonKeyDown(event) {
  const { code } = event;

  if (!jsonButtons.keysCode.includes(code)) return;
  textArea.focus();
  let textCursor = textArea.selectionEnd;
  event.preventDefault();

  if (code === 'ShiftRight' || code === 'ShiftLeft') {
    const shiftLeft = arrayButtons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = arrayButtons.find((button) => button.dataset.keycode === 'ShiftRight');
    if (keyboardState.shift) return;
    keyboardState.shift = !keyboardState.shift;
    changeButtonValue({
      arrayNodes: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      json: jsonButtons,
      lang: keyboardState.language,
      statusKeyboard: getDataSetString(keyboardState.shift, keyboardState.capslock),
    });
    shiftLeft.classList.add('activeButton');
    shiftRight.classList.add('activeButton');
    return;
  }

  const node = arrayButtons.find((button) => button.dataset.keycode === code);

  if (code === 'Tab') {
    textCursor += 4;
    setTextArea(textArea, textArea.selectionEnd, '    ', textCursor);
  }
  if (!keyboardState.ignoreAddedTextButtonsArray.includes(node.dataset.keycode)) {
    textCursor += 1;
    setTextArea(textArea, textArea.selectionEnd, node.textContent, textCursor);
  }

  if (code === 'Enter') {
    textCursor += 1;
    setTextArea(textArea, textArea.selectionEnd, '\n', textCursor);
  }

  if (code === 'Backspace') {
    textCursor = !textCursor ? 0 : textCursor -= 1;
    setTextArea(textArea, textArea.selectionEnd, '', textCursor, 'removeBefore');
  }

  if (event.code === 'Delete') {
    setTextArea(textArea, textArea.selectionEnd, '', textCursor, 'removeAfter');
  }

  if (code === 'CapsLock') {
    keyboardState.capslock = !keyboardState.capslock;

    changeButtonValue({
      arrayNodes: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      json: jsonButtons,
      lang: keyboardState.language,
      statusKeyboard: getDataSetString(keyboardState.shift, keyboardState.capslock),
    });
    node.classList.toggle('activeButton');
    return;
  }
  node.classList.add('activeButton');
}

function buttonKeyUp(event) {
  const { code } = event;
  if (!jsonButtons.keysCode.includes(event.code)) return;
  event.preventDefault();

  if (code === 'ShiftRight' || code === 'ShiftLeft') {
    const shiftLeft = arrayButtons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = arrayButtons.find((button) => button.dataset.keycode === 'ShiftRight');
    keyboardState.shift = !keyboardState.shift;
    changeButtonValue({
      arrayNodes: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      json: jsonButtons,
      lang: keyboardState.language,
      statusKeyboard: getDataSetString(keyboardState.shift, keyboardState.capslock),
    });
    shiftLeft.classList.remove('activeButton');
    shiftRight.classList.remove('activeButton');
    return;
  }
  const node = arrayButtons.find((button) => button.dataset.keycode === code);

  if (code === 'CapsLock') return;

  node.classList.remove('activeButton');
  textArea.blur();
}

addedEvent({ nodesArray: arrayButtons, callback: clickOnButton, event: 'mousedown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyUp, event: 'keyup' });
