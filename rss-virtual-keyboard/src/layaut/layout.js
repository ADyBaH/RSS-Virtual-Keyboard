import { createNode } from '../utils/create-node';
import { createButtons, addedEvent } from './keycap';
import { setToLocalStorage, getFromLocalStorage } from '../utils/local-storage';
import jsonButtons from '../data/keyboard.json';
import { createFooter } from './footer';
import { createHeader } from './header';
import { changeButtonsTextContent } from '../utils/change-buttons-text-content';
import { changeAreaValue } from '../utils/change-area-value';
import { checkActiveButtons } from '../utils/check-active-buttons';
import { getArrayFromJson } from '../utils/get-array-from-json';
import { isCommandKey } from '../utils/is-command-key';
import { clearActiveButton } from '../utils/clear-active-button';

function createLayaut() {
  const root = createNode({ className: 'root', parent: document.body });
  createHeader(root);
  const main = createNode({ tag: 'main', className: 'main wrap', parent: root });
  createFooter(root);
  return main;
}

const main = createLayaut();

const keyboardState = {
  isCapslock: false,
  isShift: false,
  isAlt: false,
  isCtrl: false,
  language: getFromLocalStorage('languageKeyboard') ?? setToLocalStorage('languageKeyboard', 'en'),
  activeCtrlButton: [],
  activeAltButton: [],
  commandKey: [
    'Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft',
    'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight',
  ],
  BUTTONS_KEYS: jsonButtons,
};

const textArea = createNode({
  tag: 'textarea',
  className: 'textarea-for-keyboard',
  parent: main,
  attr: {
    autocomplete: 'off',
    rows: 10,
  },
});

const keyboardBlock = createNode({
  className: 'keyboard-block',
  parent: main,
});

const buttons = createButtons({
  arrayKeys: keyboardState.BUTTONS_KEYS[keyboardState.language].keys,
  arrayKeysCode: keyboardState.BUTTONS_KEYS.keysCode,
  parentNode: keyboardBlock,
});

const startChangeButton = () => {
  changeButtonsTextContent({
    buttons,
    arrayIgnoreCode: keyboardState.commandKey,
    arrayValues: getArrayFromJson(keyboardState),
  });
};

function changeLanguageKeyboard() {
  keyboardState.language = keyboardState.language === 'en'
    ? setToLocalStorage('languageKeyboard', 'ru') : setToLocalStorage('languageKeyboard', 'en');

  startChangeButton();
}

function resetActiveButton() {
  changeLanguageKeyboard();
  keyboardState.isCtrl = false;
  keyboardState.isAlt = false;
  keyboardState.activeCtrlButton = clearActiveButton(keyboardState.activeCtrlButton);
  keyboardState.activeAltButton = clearActiveButton(keyboardState.activeAltButton);
}

createNode({
  tag: 'p',
  textContent: 'Клавиатура создана в операционной системе Windows.',
  className: 'main__text',
  parent: main,
});

createNode({
  tag: 'p',
  textContent: 'Для переключения языка комбинация: ctrl + alt.',
  className: 'main__text',
  parent: main,
});

function onButtonMouseDown(event) {
  event.preventDefault();
  const { target } = event;
  let textCursor = textArea.selectionEnd;
  textArea.focus();

  if (target.dataset.keycode === 'ShiftRight' || target.dataset.keycode === 'ShiftLeft') {
    const shiftLeft = buttons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = buttons.find((button) => button.dataset.keycode === 'ShiftRight');

    if (shiftLeft && shiftRight) {
      shiftLeft.classList.toggle('activeButton');
      shiftRight.classList.toggle('activeButton');
    }

    keyboardState.isShift = !keyboardState.isShift;
    startChangeButton();
    return;
  }

  if (!isCommandKey(target.dataset.keycode, keyboardState)) {
    changeAreaValue(textArea, textCursor, target.textContent, textCursor + 1);
  }

  if (target.dataset.keycode === 'Tab') {
    changeAreaValue(textArea, textCursor, '    ', textCursor + 4);
  }

  if (target.dataset.keycode === 'Enter') {
    changeAreaValue(textArea, textCursor, '\n', textCursor + 1);
  }

  if (target.dataset.keycode === 'Backspace') {
    changeAreaValue(textArea, textCursor, '', !textCursor ? 0 : textCursor -= 1, 'removeCharacterBeforeCursor');
  }

  if (target.dataset.keycode === 'Delete') {
    changeAreaValue(textArea, textCursor, '', textCursor, 'removeCharacterAfterCursor');
  }

  if (target.dataset.keycode === 'CapsLock') {
    keyboardState.isCapslock = !keyboardState.isCapslock;
    startChangeButton();
    target.classList.toggle('activeButton');
  }

  if (target.dataset.keycode === 'AltLeft' || target.dataset.keycode === 'AltRight') {
    target.classList.toggle('activeButton');
    if (!keyboardState.activeAltButton.includes(target)) {
      keyboardState.activeAltButton.push(target);
    }
    keyboardState.isAlt = checkActiveButtons(keyboardState.activeAltButton);
    if (keyboardState.isCtrl && keyboardState.isAlt) {
      resetActiveButton();
    }
  }

  if (target.dataset.keycode === 'ControlRight' || target.dataset.keycode === 'ControlLeft') {
    target.classList.toggle('activeButton');
    if (!keyboardState.activeCtrlButton.includes(target)) {
      keyboardState.activeCtrlButton.push(target);
    }
    keyboardState.isCtrl = checkActiveButtons(keyboardState.activeCtrlButton);
    if (keyboardState.isCtrl && keyboardState.isAlt) {
      resetActiveButton();
    }
  }

  textArea.blur();
}

function onButtonKeyDown(event) {
  const { code } = event;
  if (!keyboardState.BUTTONS_KEYS.keysCode.includes(code)) return;
  const textCursor = textArea.selectionEnd;
  event.preventDefault();
  textArea.focus();

  if (code === 'ShiftRight' || code === 'ShiftLeft') {
    if (keyboardState.isShift) return;
    const shiftLeft = buttons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = buttons.find((button) => button.dataset.keycode === 'ShiftRight');

    if (shiftLeft && shiftRight) {
      shiftLeft.classList.add('activeButton');
      shiftRight.classList.add('activeButton');
    }

    keyboardState.isShift = true;
    startChangeButton();
    return;
  }

  const activeButton = buttons.find((button) => button.dataset.keycode === code);

  if (!isCommandKey(activeButton.dataset.keycode, keyboardState)) {
    changeAreaValue(textArea, textCursor, activeButton.textContent, textCursor + 1);
  }

  if (code === 'Tab') {
    changeAreaValue(textArea, textCursor, '    ', textCursor + 4);
  }

  if (code === 'Enter') {
    changeAreaValue(textArea, textCursor, '\n', textCursor + 1);
  }

  if (code === 'Backspace') {
    changeAreaValue(textArea, textCursor, '', !textCursor ? 0 : textCursor - 1, 'removeCharacterBeforeCursor');
  }

  if (code === 'Delete') {
    changeAreaValue(textArea, textArea.selectionEnd, '', textCursor, 'removeCharacterAfterCursor');
  }

  if (code === 'CapsLock') {
    keyboardState.isCapslock = !keyboardState.isCapslock;
    startChangeButton();
    activeButton.classList.toggle('activeButton');
    return;
  }

  if (code === 'AltLeft' || code === 'AltRight') {
    if (keyboardState.isCtrl && keyboardState.isAlt) return;
    keyboardState.isAlt = true;
    if (keyboardState.isCtrl && keyboardState.isAlt) {
      changeLanguageKeyboard();
    }
  }

  if (code === 'ControlRight' || code === 'ControlLeft') {
    if (keyboardState.isCtrl && keyboardState.isAlt) return;
    keyboardState.isCtrl = true;
    if (keyboardState.isCtrl && keyboardState.isAlt) {
      changeLanguageKeyboard();
    }
  }
  activeButton.classList.add('activeButton');
}

function onButtonKeyUp(event) {
  const { code } = event;
  if (code === 'CapsLock') return;
  if (!keyboardState.BUTTONS_KEYS.keysCode.includes(event.code)) return;
  event.preventDefault();

  if (code === 'ShiftRight' || code === 'ShiftLeft') {
    const shiftLeft = buttons.find((button) => button.dataset.keycode === 'ShiftLeft');
    const shiftRight = buttons.find((button) => button.dataset.keycode === 'ShiftRight');

    if (shiftLeft && shiftRight) {
      shiftLeft.classList.remove('activeButton');
      shiftRight.classList.remove('activeButton');
    }

    keyboardState.isShift = false;
    startChangeButton();

    return;
  }

  if (code === 'AltLeft' || code === 'AltRight') {
    keyboardState.isAlt = false;
  }

  if (code === 'ControlRight' || code === 'ControlLeft') {
    keyboardState.isCtrl = false;
  }

  const activeButton = buttons.find((button) => button.dataset.keycode === code);

  activeButton.classList.remove('activeButton');
  textArea.blur();
}

addedEvent({ nodesArray: buttons, callback: onButtonMouseDown, event: 'mousedown' });
addedEvent({ nodesArray: [document.body], callback: onButtonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: onButtonKeyUp, event: 'keyup' });
