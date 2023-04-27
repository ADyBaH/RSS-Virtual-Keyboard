export function changeString(string, value, position, action = 'addCharacter') {
  const splitString = string.split('');
  if (action === 'addCharacter') splitString.splice(position, 0, value);
  if (action === 'removeCharacterBeforeCursor') splitString.splice(position - 1, 1);
  if (action === 'removeCharacterAfterCursor') splitString.splice(position, 1);
  return splitString.join('');
}
