import { createNode } from '../utils/create-node';
import { createButtons, addedEvent } from './create-buttons';
import { setToLocalStorage, getFromLocalStorage } from '../utils/local-storage';
import jsonButtons from '../data/keyboard.json';
import { createFooter } from './create-footer';
import { createHeader } from './create-header';
import { deleteLastCharacter } from '../utils/delete-lastCharacter';
import { changeButtonValue } from '../utils/change-buttonsValue';
import { getDataSetString } from '../utils/getDatasetString';
import { changeString } from '../utils/change-string';

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
    textArea
      .value = changeString(textArea.value, target.textContent, textArea.selectionStart);
    textCursor += 1;
    textArea.setSelectionRange(textCursor, textCursor);
  }

  if (target.dataset.keycode === 'Tab') {
    textArea
      .value = changeString(textArea.value, '    ', textArea.selectionStart);
    textCursor += 4;
    textArea.setSelectionRange(textCursor, textCursor);
  }

  if (target.dataset.keycode === 'Enter') {
    textArea
      .value = changeString(textArea.value, '\n', textArea.selectionStart);
    textCursor += textArea.value.length;
    textArea.setSelectionRange(textCursor, textCursor);
  }

  if (target.dataset.keycode === 'Backspace') {
    textArea.value = changeString(textArea.value, '', textArea.selectionStart, 'removeBefore');
    textCursor = !textCursor ? 0 : textCursor -= 1;
    textArea.setSelectionRange(textCursor, textCursor);
  }

  if (target.dataset.keycode === 'Delete') {
    textArea.value = changeString(textArea.value, '', textArea.selectionStart, 'removeAfter');
    textCursor = !textCursor ? 0 : textCursor += 1;
    textArea.setSelectionRange(textCursor, textCursor);
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

  textArea.blur();
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
    event.preventDefault();
    textArea.textContent += '    ';
  }
  if (!keyboardState.ignoreAddedTextButtonsArray.includes(node.dataset.keycode)) {
    textArea.textContent += node.textContent;
  }

  if (code === 'Enter') {
    textArea.textContent += '\n';
  }

  if (code === 'Backspace') {
    textArea.textContent = deleteLastCharacter(textArea.textContent);
  }

  // if (event.code === 'Delete') {
  // console.log(textArea.selectionStart);
  // textArea.textContent = '';
  // }

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
}

addedEvent({ nodesArray: arrayButtons, callback: clickOnButton, event: 'mousedown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyUp, event: 'keyup' });
