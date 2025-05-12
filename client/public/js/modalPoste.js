export function afficherModalPoste(poste, options = { lectureSeule: true }) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal_body');
  const closeBtn = document.querySelector('.close-btn');

  modalBody.innerHTML = '';

  const posteTitle = document.createElement('div');
  posteTitle.classList.add('modalPostTitle');
  posteTitle.textContent = poste.nom;
  modalBody.appendChild(posteTitle);

  // SECTION
  const sectionTitle = document.createElement('div');
  sectionTitle.textContent = 'SECTION';
  sectionTitle.classList.add('modalSectionAchatFraisTitle');
  modalBody.appendChild(sectionTitle);

  const sectionList = document.createElement('ul');
  poste.section.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.poste_occupe} - ${s.code_section} - ${s.nb_heures} x ${s.taux_horaire}€/h = ${s.total}€`;
    li.classList.add('liModal');
    sectionList.appendChild(li);
  });
  modalBody.appendChild(sectionList);

  // ACHATS
  const achatTitle = document.createElement('div');
  achatTitle.textContent = 'ACHAT';
  achatTitle.classList.add('modalSectionAchatFraisTitle');
  modalBody.appendChild(achatTitle);

  const achatList = document.createElement('ul');
  poste.achats.forEach(a => {
    const liAchat = document.createElement('li');
    liAchat.classList.add('liModal');
    achatList.appendChild(liAchat);
    liAchat.textContent = `${a.code_achat} - ${a.nom_produit} - ${a.quantite}${a.unite} x ${a.prix_unitaire}€ = ${a.total}€`;
  });
  modalBody.appendChild(achatList);

  // FRAIS DE CHANTIER
  const fraisTitle = document.createElement('div');
  fraisTitle.textContent = 'FRAIS DE CHANTIER';
  fraisTitle.classList.add('modalSectionAchatFraisTitle');
  modalBody.appendChild(fraisTitle);

  const fraisList = document.createElement('ul');
  poste.frais_chantier.forEach(f => {
    const liFrais = document.createElement('li');
    liFrais.classList.add('liModal');
    fraisList.appendChild(liFrais);
    liFrais.textContent = `${f.code_frais} - ${f.nom_produit} - ${f.quantite}${f.unite} x ${f.prix_unitaire}€ = ${f.total}€`;
  });
  modalBody.appendChild(fraisList);

  // Bouton modifier seulement si lectureSeule = false
  if (!options.lectureSeule) {
    const btnModifier = document.querySelector('.btnModal');
    btnModifier.textContent = 'Modifier';
    btnModifier.onclick = () => {
      alert('Modifier ce poste');
    };
  }

  modal.classList.remove('hidden');
  document.body.classList.add('noscroll');
  closeBtn.onclick = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('noscroll');
  };
}
