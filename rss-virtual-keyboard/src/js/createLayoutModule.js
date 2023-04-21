import createNode from './utils/createNodeModule';
import { createButtons, addedEvent } from './createButtonsModule';
import {
  // setLanguageToLocalStorage,
  getLanguageToLocalStorage,
} from './utils/getLocalStorageModule';
import jsonButtons from './keyboard.json';

const root = createNode({ className: 'root', parent: document.body });
const header = createNode({ tag: 'header', className: 'header', parent: root });

const keyboardState = {
  languageKeyboard: getLanguageToLocalStorage(),
  capslock: false,
  ignoreAddedTextButton: [
    'Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft',
    'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight',
  ],
};

createNode({
  tag: 'h1',
  textContent: 'RSS Virtual Keyboard',
  className: 'header__logo',
  parent: header,
});

const main = createNode({ tag: 'main', className: 'main', parent: root });

const divForText = createNode({
  tag: 'div',
  className: 'main__textBlock',
  // attr: {
  // },
  parent: main,
});

const keyboardBlock = createNode({
  tag: 'div',
  className: 'main__keyboardBlock',
  parent: main,
});
const arrayButtons = createButtons({
  jsonKey: jsonButtons.en.keys,
  jsonKeyCapslock: jsonButtons.en.keysCapslock,
  jsonKeyShift: jsonButtons.en.keysShift,
  jsonKeyCode: jsonButtons.keysCode,
  parentNode: keyboardBlock,
});

function clickOnButton(event) {
  if (!keyboardState.ignoreAddedTextButton.includes(event.target.dataset.keycode)) {
    divForText.textContent += event.target.textContent;
  }
}
function buttonKeyDown(event) {
  if (!jsonButtons.keysCode.includes(event.code)) return;

  const node = document.querySelector(`[data-keycode = '${event.code}']`);
  if (!keyboardState.ignoreAddedTextButton.includes(node.dataset.keycode)) {
    divForText.textContent += node.textContent;
  }

  node.classList.add('activeButton');
}
function buttonKeyUp(event) {
  if (!jsonButtons.keysCode.includes(event.code)) return;

  const node = document.querySelector(`[data-keycode = '${event.code}']`);
  node.classList.remove('activeButton');
}
addedEvent({ nodesArray: arrayButtons, callback: clickOnButton, event: 'click' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyUp, event: 'keyup' });
