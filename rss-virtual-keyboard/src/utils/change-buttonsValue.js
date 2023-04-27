export function changeButtonsValue({
  buttons,
  arrayIgnoreCode,
  arrayValues,
}) {
  if (!buttons) return;
  buttons.forEach((button, index) => {
    const currentButton = button;
    if (!arrayIgnoreCode.includes(button.dataset.keycode)) {
      currentButton.textContent = arrayValues[index];
    }
  });
}
