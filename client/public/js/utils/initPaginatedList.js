export function initPaginatedList({ data, container, button, step = 5, renderItem }) {
  let visibleCount = 0;
  let forward = true;

  function render() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

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
