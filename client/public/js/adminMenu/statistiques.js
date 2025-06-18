export const statsContainer = document.createElement('div');
statsContainer.classList.add('statsContainer');

const sectionsParams = {
  Statistiques: statsContainer,
};

sectionsParams['Statistiques'].style.display = 'none'; // Par défaut

const main = document.querySelector('main');

main.appendChild(statsContainer);
