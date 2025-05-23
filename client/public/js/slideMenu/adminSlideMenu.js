import { tableDevisContent } from '../adminMenu/adminDevisList.js';
import { tableContent } from '../adminMenu/adminUsersList.js';

const h1 = document.querySelector('h1');

export const sections = {
  'Liste des utilisateurs': tableContent,
  'Liste des devis': tableDevisContent,
  // Tu pourras ajouter d'autres sections ici plus tard, comme 'Liste des devis': tableDevisContent, etc.
};

// Menu slide de la gauche
export const slideMenu = document.createElement('div');
slideMenu.classList.add('slideMenuDashboard');
slideMenu.id = 'slideMenuDashboard';

const menuUl = document.createElement('ul');
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
