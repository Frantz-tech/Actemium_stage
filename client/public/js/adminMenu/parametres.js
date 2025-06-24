import { fetchClients } from '../devis/get_devis_segm/getClients.js';
import { fetchContrats } from '../devis/get_devis_segm/getContrats.js';
import { fetchDomaines } from '../devis/get_devis_segm/getDomaines.js';
import { fetchExpertises } from '../devis/get_devis_segm/getExpertises.js';
import { fetchFraisGlobaux } from '../fap/get/fetchFrais.js';

export const paramsContainer = document.createElement('div');

paramsContainer.classList.add('paramsContainer');

const sectionsParams = {
  Paramètres: paramsContainer,
};

sectionsParams['Paramètres'].style.display = 'none'; // par défaut

const boxes = [
  'Gérer les Frais',
  'Gérer les Domaines',
  'Gérer les Expertises',
  'Gérer les Clients',
  'Gérer les Contrats',
];

boxes.forEach(b => {
  const boxeContainer = document.createElement('div');
  boxeContainer.classList.add('boxeContainer');
  boxeContainer.classList.add('inactive');
  boxeContainer.textContent = b;

  boxeContainer.addEventListener('click', () => {
    const allBoxes = document.querySelectorAll('.boxeContainer');

    // Par défaut chaque box a la classe inactive donc fond noir avec bordure
    allBoxes.forEach(box => {
      box.classList.remove('active');
      box.classList.add('inactive');
    });

    // Lors du clic sur une boxe on retire la classe inactive et on ajoute la classe active
    boxeContainer.classList.remove('inactive');
    boxeContainer.classList.add('active');

    if (b === 'Gérer les Clients') fetchClients();
    else if (b === 'Gérer les Expertises') fetchExpertises();
    else if (b === 'Gérer les Contrats') fetchContrats();
    else if (b === 'Gérer les Domaines') fetchDomaines();
    else if (b === 'Gérer les Frais') fetchFraisGlobaux();
  });

  paramsContainer.appendChild(boxeContainer);
});
const main = document.querySelector('main');

main.appendChild(paramsContainer);
