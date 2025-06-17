export function fraisList(frais) {
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

  const showMoreBtn = document.createElement('button');
  showMoreBtn.classList.add('showMoreBtn');
  showMoreBtn.textContent = 'Afficher plus';

  frais.forEach(s => {
    s.NOM_FRAIS = s.NOM_FRAIS.toUpperCase();

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
    fraisNom.appendChild(document.createTextNode(s.NOM_FRAIS));

    const fraisPourcentage = document.createElement('p');
    fraisPourcentage.classList.add('fraisPourcentage');
    fraisPourcentage.appendChild(
      Object.assign(document.createElement('strong'), { textContent: 'Pourcentage : ' })
    );
    fraisPourcentage.appendChild(document.createTextNode(s.POURCENTAGE));

    const btnUpdateFrais = document.createElement('div');
    btnUpdateFrais.classList.add('btnUpdateFrais');
    btnUpdateFrais.textContent = '✎';

    const btnDeleteFrais = document.createElement('button');
    btnDeleteFrais.classList.add('deletebtn');

    btnDeleteFrais.addEventListener('click', async () => {
      // const confirmation = confirm(
      //   `Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.`
      // );
      // TODO: Delete action
    });

    fraisInfo.append(fraisNom, fraisPourcentage);
    fraisItem.appendChild(fraisInfo);
    fraisContent.append(btnUpdateFrais, fraisItem, btnDeleteFrais);
    fraisList.appendChild(fraisContent);
  });

  containerFraisList.append(containerFraisTitle, fraisList, showMoreBtn);
  const main = document.querySelector('main');
  main.appendChild(containerFraisList);
}
