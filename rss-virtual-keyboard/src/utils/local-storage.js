export function setToLocalStorage(key, language) {
  localStorage.setItem(key, language);
  return language;
}

export function getLanguageToLocalStorage() {
  const language = localStorage.getItem('languageKeyboard');
  if (language) { return language; }
  return setToLocalStorage('languageKeyboard', 'en');
}
