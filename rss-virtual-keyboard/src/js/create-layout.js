import { createNode } from '../utils/create-node';
import { createButtons, addedEvent } from './create-buttons';
import {
  // setToLocalStorage,
  getLanguageToLocalStorage,
} from '../utils/local-storage';
import jsonButtons from '../data/keyboard.json';
import { createFooter } from './create-footer';
import { createHeader } from './create-header';

const root = createNode({ className: 'root', parent: document.body });
createHeader(root);
const main = createNode({ tag: 'main', className: 'main', parent: root });
createFooter(root);

const keyboardState = {
  languageKeyboard: getLanguageToLocalStorage(),
  capslock: false,
  ignoreAddedTextButton: [
    'Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft',
    'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight',
  ],
};

const textArea = createNode({
  tag: 'textarea',
  className: 'main__textBlock',
  parent: main,
});

const keyboardBlock = createNode({
  tag: 'div',
  className: 'main__keyboardBlock',
  parent: main,
});

const arrayButtons = createButtons({
  arrayKeys: jsonButtons.en.keys,
  arrayKeysCapslock: jsonButtons.en.keysCapslock,
  arrayKeysShift: jsonButtons.en.keysShift,
  arrayKeysCode: jsonButtons.keysCode,
  parentNode: keyboardBlock,
});

function clickOnButton(event) {
  if (!keyboardState.ignoreAddedTextButton.includes(event.target.dataset.keycode)) {
    textArea.textContent += event.target.textContent;
  }
}

function buttonKeyDown(event) {
  if (!jsonButtons.keysCode.includes(event.code)) return;

  const node = arrayButtons.find((button) => button.dataset.keycode === event.code);

  if (!keyboardState.ignoreAddedTextButton.includes(node.dataset.keycode)) {
    textArea.textContent += node.textContent;
  }
  if (event.code === 'Tab') {
    event.preventDefault();
    textArea.textContent += '    ';
  }

  node.classList.add('activeButton');
}

function buttonKeyUp(event) {
  if (!jsonButtons.keysCode.includes(event.code)) return;
  const node = arrayButtons.find((button) => button.dataset.keycode === event.code);
  node.classList.remove('activeButton');
}

addedEvent({ nodesArray: arrayButtons, callback: clickOnButton, event: 'click' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyUp, event: 'keyup' });
