import { initPaginatedList } from '../utils/initPaginatedList.js';
import { clearAllLists } from './clearLists.js';

export function tauxHList(tauxH) {
  clearAllLists();

  const existList = document.getElementById('containerTauxHList');
  if (existList) {
    existList.remove();
  }

  const containerTauxHTitle = document.createElement('h2');
  containerTauxHTitle.id = 'containerTauxHTitle';

  const containerTauxHList = document.createElement('div');
  containerTauxHList.id = 'containerTauxHList';

  const tauxHList = document.createElement('div');
  tauxHList.id = 'tauxHList';

  initPaginatedList({
    data: tauxH,
    container: tauxHList,
    button: null,
    step: null,
    renderItem: function (s) {
      const tauxHContent = document.createElement('div');
      tauxHContent.classList.add('tauxHContent');

      const tauxHItem = document.createElement('div');
      tauxHItem.classList.add('tauxHItem');

      const tauxHInfo = document.createElement('div');
      tauxHInfo.classList.add('tauxHInfo');

      const codeTauxH = document.createElement('p');
      codeTauxH.classList.add('codeTauxH');

      codeTauxH.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Code : ' })
      );
      codeTauxH.appendChild(document.createTextNode(s.CODE_ID));

      const libelleTauxH = document.createElement('p');
      libelleTauxH.classList.add('libelleTauxH');

      libelleTauxH.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Libellé : ' })
      );
      libelleTauxH.appendChild(document.createTextNode(s.LIBELLE));

      const tauxHPourcentage = document.createElement('p');
      tauxHPourcentage.classList.add('tauxHPourcentage');

      tauxHPourcentage.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Taux : ' })
      );
      tauxHPourcentage.appendChild(document.createTextNode(`${s.TAUX} € / H`));

      const btnUpdateTauxH = document.createElement('div');
      btnUpdateTauxH.classList.add('btnUpdateTauxH');
      btnUpdateTauxH.textContent = '✎';

      btnUpdateTauxH.addEventListener('click', () => {
        // modalTauxH(s)
      });

      const btnDeleteTauxH = document.createElement('button');
      btnDeleteTauxH.classList.add('deletebtn');

      btnDeleteTauxH.addEventListener('click', () => {
        // Fonctionnalité non disponible pour le moment, uniquement la mise a jour des taux horaires sera disponible
        alert('Fonctionnalité non disponible');
      });

      tauxHInfo.append(codeTauxH, libelleTauxH, tauxHPourcentage);
      tauxHItem.appendChild(tauxHInfo);
      tauxHContent.append(btnUpdateTauxH, tauxHItem, btnDeleteTauxH);

      return tauxHContent;
    },
  });

  containerTauxHList.append(containerTauxHTitle, tauxHList);
  const main = document.querySelector('main');
  main.appendChild(containerTauxHList);
}
