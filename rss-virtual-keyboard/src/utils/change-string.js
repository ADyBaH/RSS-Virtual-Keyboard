export function changeString(string, value, position, action = 'added') {
  const currectPosition = !position ? 0 : position - 1;
  if (action === 'removeBefore') return `${string.slice(0, currectPosition)}${string.slice(position)}`;
  if (action === 'removeAfter') {
    const array = string.split('');
    array.splice(position, 1);
    return array.join('');
  }
  return `${string.slice(0, position)}${value}${string.slice(position)}`;
}
