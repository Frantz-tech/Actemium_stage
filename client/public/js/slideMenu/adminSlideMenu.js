import { tableDevisContent } from '../adminMenu/adminDevisList.js';
import { tableContent } from '../adminMenu/adminUsersList.js';
import { paramsContainer } from '../adminMenu/parametres.js';
import { statsContainer } from '../adminMenu/statistiques.js';

const h1 = document.querySelector('h1');

export const sections = {
  'Liste des utilisateurs': tableContent,
  'Liste des devis': tableDevisContent,
  Paramètres: paramsContainer,
  Statistiques: statsContainer,
};

// Menu slide de la gauche
export const slideMenu = document.createElement('div');
slideMenu.classList.add('slideMenuDashboard');
slideMenu.id = 'slideMenuDashboard';

const menuUl = document.createElement('ul');
menuUl.classList.add('ulDashboard');
slideMenu.appendChild(menuUl);

const menuItem = [
  'Liste des utilisateurs',
  'Liste des devis',
  'Statistiques',
  'Paramètres',
  'Se déconnecter',
];
menuItem.forEach(itemText => {
  const li = document.createElement('li');
  li.classList.add('listSlideMenu');
  const button = document.createElement('button');
  button.classList.add('menuBtn');
  button.textContent = itemText;
  li.appendChild(button);
  menuUl.appendChild(li);

  li.addEventListener('click', e => {
    e.preventDefault();
    // Fermer automatiquement le panneau latéral
    slideMenu.classList.remove('open');
    // Cacher toutes les sections
    Object.values(sections).forEach(section => {
      section.style.display = 'none';
    });

    // Retirer les div fraisList et segm list lorsque l'on clique sur un element du slideMenu
    const oldSegmList = document.getElementById('containerSegmList');
    const oldFraisList = document.getElementById('containerFraisList');
    const allBoxeContainers = document.querySelectorAll('.boxeContainer');

    if (oldSegmList && oldSegmList.parentNode) {
      oldSegmList.parentNode.removeChild(oldSegmList);
    }
    if (oldFraisList && oldFraisList.parentNode) {
      oldFraisList.parentNode.removeChild(oldFraisList);
    }
    // Retire également le style sur la box sélectionné auparavent
    allBoxeContainers.forEach(box => {
      box.classList.remove('active');
      box.classList.add('inactive');
    });

    if (itemText === 'Se déconnecter') {
      localStorage.removeItem('token'); // Déconnecter la session

      // Redirection vers la page signIn
      window.location.href = '../pages/signIn.html';
      return;
    }
    // Afficher la section liée au menu cliqué si elle existe
    if (sections[itemText]) {
      sections[itemText].style.display = 'flex';
      h1.textContent = [itemText];
      h1.classList.add('uppercase');
    }
  });
});
