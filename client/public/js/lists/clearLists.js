export function clearAllLists() {
  const ids = ['containerFraisList', 'containerSegmList', 'containerTauxHList'];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}
