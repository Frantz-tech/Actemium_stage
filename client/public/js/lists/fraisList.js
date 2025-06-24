import { modalFraisAdmin } from '../adminMenu/modal/modalFrais.js';
import { initPaginatedList } from '../utils/initPaginatedList.js';
import { clearAllLists } from './clearLists.js';

export function fraisList(frais) {
  clearAllLists();
  const existList = document.getElementById('containerFraisList');
  if (existList) {
    existList.remove();
  }

  const containerFraisTitle = document.createElement('h2');
  containerFraisTitle.id = 'containerFraisTitle';

  const containerFraisList = document.createElement('div');
  containerFraisList.id = 'containerFraisList';

  const fraisList = document.createElement('div');
  fraisList.id = 'segList';

  initPaginatedList({
    data: frais,
    container: fraisList,
    button: null,
    step: null,
    renderItem: function (s) {
      s.NOM_FRAIS = s.NOM_FRAIS.toLowerCase();

      const fraisContent = document.createElement('div');
      fraisContent.classList.add('fraisContent');

      const fraisItem = document.createElement('div');
      fraisItem.classList.add('fraisItem');

      const fraisInfo = document.createElement('div');
      fraisInfo.classList.add('fraisInfo');

      const fraisNom = document.createElement('p');
      fraisNom.classList.add('fraisNom');
      fraisNom.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Nom : ' })
      );
      fraisNom.appendChild(document.createTextNode(s.NOM_FRAIS.replaceAll('_', ' ')));

      const fraisPourcentage = document.createElement('p');
      fraisPourcentage.classList.add('fraisPourcentage');
      fraisPourcentage.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Taux : ' })
      );
      fraisPourcentage.appendChild(document.createTextNode(`${s.POURCENTAGE} %`));

      const btnUpdateFrais = document.createElement('div');
      btnUpdateFrais.classList.add('btnUpdateFrais');
      btnUpdateFrais.textContent = '✎';

      btnUpdateFrais.addEventListener('click', () => {
        modalFraisAdmin(s);
      });

      const btnDeleteFrais = document.createElement('button');
      btnDeleteFrais.classList.add('deletebtn');

      btnDeleteFrais.addEventListener('click', async () => {
        // Fonctionnalité non disponible car cela comprommet toute la logique des devis
        alert('Fonctionnalité non disponible');
      });

      fraisInfo.append(fraisNom, fraisPourcentage);
      fraisItem.appendChild(fraisInfo);
      fraisContent.append(btnUpdateFrais, fraisItem, btnDeleteFrais);

      return fraisContent;
    },
  });

  containerFraisList.append(containerFraisTitle, fraisList);
  const main = document.querySelector('main');
  main.appendChild(containerFraisList);
}
