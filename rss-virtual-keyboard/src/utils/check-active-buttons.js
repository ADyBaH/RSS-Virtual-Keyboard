export function checkActiveButtons(arrayButton) {
  return arrayButton.some((v) => v.classList.contains('activeButton'));
}
