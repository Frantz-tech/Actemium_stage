import { tableDevisContent } from './adminMenu/adminDevisList.js';
import { tableContent } from './adminMenu/adminUsersList.js';
import { sections, slideMenu } from './slideMenu/adminSlideMenu.js';

document.querySelector('h1').textContent = 'LISTE DES UTILISATEURS';

const main = document.querySelector('main');

// Main tableau au centre de la page pour afficher la liste des utilisateurs apres le click
main.append(tableContent, tableDevisContent, slideMenu);

sections['Liste des utilisateurs'].style.display = 'flex'; // par défaut on met la liste des utilisateurs ?

// Ajouter dashboard dans le slideMenu ou autre chose histore de montrer un grafique du tableau ou autre
