export function clearActiveButton(array) {
  array.map((button) => button.classList.remove('activeButton'));
  return [];
}
