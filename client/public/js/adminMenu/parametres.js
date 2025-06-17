import { fetchFraisGlobaux } from '../fap/fetchFrais.js';
import { fetchClients } from '../get_devis_segm/getClients.js';
import { fetchContrats } from '../get_devis_segm/getContrats.js';
import { fetchDomaines } from '../get_devis_segm/getDomines.js';
import { fetchExpertises } from '../get_devis_segm/getExpertises.js';

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
  'Gérer les Utilisateurs',
];

boxes.forEach(b => {
  const boxeContainer = document.createElement('div');
  boxeContainer.classList.add('boxeContainer');
  boxeContainer.textContent = b;

  boxeContainer.addEventListener('click', () => {
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
