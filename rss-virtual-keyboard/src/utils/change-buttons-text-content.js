export function changeButtonsTextContent({
  buttons,
  arrayIgnoreCode,
  arrayValues,
}) {
  if (!buttons) return;
  buttons.forEach((button, index) => {
    if (!arrayIgnoreCode.includes(button.dataset.keycode)) {
      Object.assign(button, { textContent: arrayValues[index] });
    }
  });
}
