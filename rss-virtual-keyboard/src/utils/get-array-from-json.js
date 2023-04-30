import { getDataSetString } from './get-dataset-string';

export function getArrayFromJson({
  isCapslock, isShift, BUTTONS_KEYS, language,
}) {
  return BUTTONS_KEYS[language][getDataSetString(isShift, isCapslock)];
}
