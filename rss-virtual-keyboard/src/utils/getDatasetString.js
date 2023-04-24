export function getDataSetString(booleanShift, booleanCapslock) {
  if (booleanShift && booleanCapslock) return 'keyshiftandshift';
  if (booleanCapslock) return 'keycapslock';
  if (booleanShift) return 'keyshift';
  return 'key';
}
