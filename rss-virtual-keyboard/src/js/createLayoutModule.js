import createNode from './utils/createNodeModule';
import { createButtons, addedEvent } from './createButtonsModule';
// import {
//   setLanguageToLocalStorage,
//   getLanguageToLocalStorage,
// } from './utils/getLocalStorage';
import jsonButtons from './keyboard.json';

const root = createNode({ className: 'root', parent: document.body });
const header = createNode({ tag: 'header', className: 'header', parent: root });

// const keyboardState = {
//   languageKeyboard: getLanguageToLocalStorage(),
//   capslock: false,
// };

createNode({
  tag: 'h1',
  textContent: 'RSS Virtual Keyboard',
  className: 'header__logo',
  parent: header,
});

const main = createNode({ tag: 'main', className: 'main', parent: root });

// const textarea =
createNode({
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
// const arrayButtons =
createButtons({
  jsonKey: jsonButtons.en.keys,
  jsonKeyCapslock: jsonButtons.en.keysCapslock,
  jsonKeyShift: jsonButtons.en.keysShift,
  jsonKeyCode: jsonButtons.en.keysCode,
  parentNode: keyboardBlock,
});

// function buttonLog(event) {
//   console.log(event);
// }
function buttonKeyDown(event) {
  const node = document.querySelector(`[data-keycode = "${event.code}"]`);
  node.classList.add('activeButton');
}
function buttonKeyUp(event) {
  const node = document.querySelector(`[data-keycode = "${event.code}"]`);
  node.classList.remove('activeButton');
}
// addedEvent({ nodesArray: arrayButtons, callback: buttonLog, event: 'click' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyDown, event: 'keydown' });
addedEvent({ nodesArray: [document.body], callback: buttonKeyUp, event: 'keyup' });
