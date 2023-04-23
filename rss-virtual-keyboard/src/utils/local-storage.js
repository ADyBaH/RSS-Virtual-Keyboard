export function setToLocalStorage(key, language) {
  localStorage.setItem(`${key}(ADyBaH4uK)`, language);
  return language;
}

export function getToLocalStorage(key) {
  return localStorage.getItem(`${key}(ADyBaH4uK)`);
}
