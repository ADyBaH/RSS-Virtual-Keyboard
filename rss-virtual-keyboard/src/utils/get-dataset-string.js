export function getDataSetString(booleanShift, booleanCapslock) {
  if (booleanShift && booleanCapslock) return 'keysCapslockAndShift';
  if (booleanCapslock) return 'keysCapslock';
  if (booleanShift) return 'keysShift';
  return 'keys';
}
