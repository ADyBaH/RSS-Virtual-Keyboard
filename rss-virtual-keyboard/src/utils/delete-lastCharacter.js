export function deleteLastCharacter(string) {
  if (string.length === 1) return '';
  return string.slice(0, string.length - 1);
}
