import { tableDevisContent } from './slideMenu/adminDevisList.js';
import { tableContent } from './slideMenu/adminUsersList.js';

document.querySelector('h1').textContent = 'DASHBOARD';
const main = document.querySelector('main');

const h1 = document.querySelector('h1');

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
  'Configuration',
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

    // Afficher la section liée au menu cliqué si elle existe
    if (sections[itemText]) {
      sections[itemText].style.display = 'flex';
      h1.textContent = [itemText];
      h1.classList.add('uppercase');
    }
  });
});

// Main tableau au centre de la page pour afficher la liste des utilisateurs apres le click
main.append(tableContent, tableDevisContent, slideMenu);

const sections = {
  'Liste des utilisateurs': tableContent,
  'Liste des devis': tableDevisContent,
  // Tu pourras ajouter d'autres sections ici plus tard, comme 'Liste des devis': tableDevisContent, etc.
};

sections['Liste des utilisateurs'].style.display = 'none'; // par défaut on montre la liste des utilisateurs
