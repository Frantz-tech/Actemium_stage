export function initPaginatedList({ data, container, button, step = 5, renderItem }) {
  let visibleCount = 0;
  let forward = true;

  if (!button || !step) {
    data.forEach(item => {
      const element = renderItem(item);
      container.appendChild(element);
    });
    return;
  }

  function render() {
    for (let i = 0; i < visibleCount && i < data.length; i++) {
      const element = renderItem(data[i]);
      container.appendChild(element);
    }

    // Mise à jour du bouton
    if (visibleCount >= data.length) {
      button.textContent = 'Afficher moins';
      forward = false;
    } else if (visibleCount <= step) {
      button.textContent = 'Afficher plus';
      forward = true;
    } else {
      button.textContent = forward ? 'Afficher plus' : 'Afficher moins';
    }
  }

  visibleCount = step;
  render();

  button.addEventListener('click', () => {
    if (forward) {
      visibleCount += step;
    } else {
      visibleCount -= step;
    }

    if (visibleCount < step) visibleCount = step;
    if (visibleCount > data.length) visibleCount = data.length;
    render();
  });
}
