export function deleteLastCharacter(length, string) {
  if (length === 1) return '';
  return string.slice(0, length - 1);
}
