import { tableDevisContent } from './adminMenu/adminDevisList.js';
import { tableContent } from './adminMenu/adminUsersList.js';
import { sections, slideMenu } from './slideMenu/adminSlideMenu.js';

// document.querySelector('h1').textContent = 'DASHBOARD';

const main = document.querySelector('main');

// Main tableau au centre de la page pour afficher la liste des utilisateurs apres le click
main.append(tableContent, tableDevisContent, slideMenu);

// sections['Liste des utilisateurs'].style.display = 'none'; // par défaut on montre rien ou la liste des

sections['Liste des utilisateurs'].style.display = 'flex'; // par défaut on la liste des utilisateurs ?

// Si ca va pas on remet H1 dhasboard et display none

// Du coup il faudra rajouter en premier, dashboard dans le slideMenu
