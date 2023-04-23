export function setToLocalStorage(key, language) {
  localStorage.setItem(`${key}(ADyBaH4uK)`, language);
  return language;
}

export function getLanguageToLocalStorage() {
  const language = localStorage.getItem('languageKeyboard(ADyBaH4uK)');
  if (language) { return language; }
  return setToLocalStorage('languageKeyboard', 'en');
}
