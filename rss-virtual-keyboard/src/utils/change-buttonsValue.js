export function changeButtonValue({
  arrayNodes, arrayIgnoreCode, json, lang, statusKeyboard,
}) {
  if (!arrayNodes) return;
  arrayNodes.forEach((v, index) => {
    const button = v;
    if (!arrayIgnoreCode.includes(v.dataset.keycode)) {
      button.textContent = json[lang][statusKeyboard][index];
    }
  });
}
