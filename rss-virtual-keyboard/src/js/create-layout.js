import { createNode } from '../utils/create-node';
import { createButtons, addedEvent } from './create-buttons';
import { setToLocalStorage, getFromLocalStorage } from '../utils/local-storage';
import jsonButtons from '../data/keyboard.json';
import { createFooter } from './create-footer';
import { createHeader } from './create-header';
import { changeButtonsValue } from '../utils/change-buttonsValue';
import { getDataSetString } from '../utils/getDatasetString';
import { setTextArea } from '../utils/set-text-area';

const root = createNode({ className: 'root', parent: document.body });
createHeader(root);
const main = createNode({ tag: 'main', className: 'main', parent: root });
createFooter(root);

const keyboardState = {
  isCapslock: false,
  isShift: false,
  language: getFromLocalStorage('languageKeyboard') ?? setToLocalStorage('languageKeyboard', 'en'),
  ignoreAddedTextButtonsArray: [
    'Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft',
    'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight',
  ],
};

function getArrayFromJson(json, language) {
  return json[language][getDataSetString(keyboardState.isShift, keyboardState.isCapslock)];
}

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

function onClickOnButton(event) {
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
    keyboardState.isCapslock = !keyboardState.isCapslock;
    changeButtonsValue({
      buttons: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      arrayValues: getArrayFromJson(jsonButtons, keyboardState.language),
    });
    target.classList.toggle('activeButton');
  }
}

function onButtonKeyDown(event) {
  const { code } = event;

  if (!jsonButtons.keysCode.includes(code)) return;
  textArea.focus();
  let textCursor = textArea.selectionEnd;
  event.preventDefault();

  if (code === 'ShiftRight' || code === 'ShiftLeft') {
    if (keyboardState.isShift) return;
    const shiftLeft = arrayButtons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = arrayButtons.find((button) => button.dataset.keycode === 'ShiftRight');

    keyboardState.isShift = true;
    changeButtonsValue({
      buttons: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      arrayValues: getArrayFromJson(jsonButtons, keyboardState.language),
    });
    shiftLeft.classList.add('activeButton');
    shiftRight.classList.add('activeButton');
    return;
  }

  const activeButton = arrayButtons.find((button) => button.dataset.keycode === code);

  if (code === 'Tab') {
    textCursor += 4;
    setTextArea(textArea, textArea.selectionEnd, '    ', textCursor);
  }
  if (!keyboardState.ignoreAddedTextButtonsArray.includes(activeButton.dataset.keycode)) {
    textCursor += 1;
    setTextArea(textArea, textArea.selectionEnd, activeButton.textContent, textCursor);
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
    keyboardState.isCapslock = !keyboardState.isCapslock;

    changeButtonsValue({
      buttons: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      arrayValues: getArrayFromJson(jsonButtons, keyboardState.language),
    });
    activeButton.classList.toggle('activeButton');
    return;
  }
  activeButton.classList.add('activeButton');
}

function onButtonKeyUp(event) {
  const { code } = event;
  if (code === 'CapsLock') return;
  if (!jsonButtons.keysCode.includes(event.code)) return;

  event.preventDefault();

  if (code === 'ShiftRight' || code === 'ShiftLeft') {
    const shiftLeft = arrayButtons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = arrayButtons.find((button) => button.dataset.keycode === 'ShiftRight');

    if (shiftLeft && shiftRight) {
      shiftLeft.classList.remove('activeButton');
      shiftRight.classList.remove('activeButton');
    }

    keyboardState.isShift = false;
    changeButtonsValue({
      buttons: arrayButtons,
      arrayIgnoreCode: keyboardState.ignoreAddedTextButtonsArray,
      arrayValues: getArrayFromJson(jsonButtons, keyboardState.language),
    });

    return;
  }
  const activeButton = arrayButtons.find((button) => button.dataset.keycode === code);

  activeButton.classList.remove('activeButton');
  textArea.blur();
}

addedEvent({ nodesArray: arrayButtons, callback: onClickOnButton, event: 'mousedown' });
addedEvent({ nodesArray: [document.body], callback: onButtonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: onButtonKeyUp, event: 'keyup' });
