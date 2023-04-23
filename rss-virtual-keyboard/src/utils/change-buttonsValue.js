export function changeButtonValue({ arrayNodes, arrayIgnoreCode, nameDataset }) {
  if (!arrayNodes) return;
  arrayNodes.forEach((v) => {
    const button = v;
    if (!arrayIgnoreCode.includes(v.dataset.keycode)) {
      button.textContent = v.dataset[nameDataset];
    }
  });
}
