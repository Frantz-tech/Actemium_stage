export function openPostModal(p, postes) {
  const modal = document.createElement('div');
  modal.classList.add('modalPost');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');

  // Bouton fermeture du modal
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  closeBtn.classList.add('close-btn');

  // Modifier le poste
  const editPost = document.createElement('button');
  editPost.textContent = '✎';
  editPost.classList.add('edit-btn');

  // Regroupement des btns du modal
  const divBtns = document.createElement('div');
  divBtns.classList.add('divBtns');
  divBtns.append(closeBtn, editPost);

  // overlay ( blur ) du poste
  const overlay = document.createElement('div');
  overlay.classList.add('modalPost-overlay');
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalPost_content');
  modal.appendChild(modalContent);

  // Div section achat fourniture
  const saf = document.createElement('div');
  saf.classList.add('saf');
  //Libelle du post
  const postLibelle = document.createElement('div');
  postLibelle.textContent = `${p.POSTE_LIBELLE}`;
  postLibelle.classList.add('modalPostLibelle');
  // Container Section
  const containerSection = document.createElement('div');
  containerSection.classList.add('containerSection');
  const contextSection = document.createElement('div');
  contextSection.textContent = "MAIN D'OEUVRE";
  contextSection.classList.add('contextTitle');

  const sectionData = document.createElement('div');
  sectionData.classList.add('sectionData');

  const postAssocies = postes.filter(
    post => post.DEVIS_ID === p.DEVIS_ID && post.POSTE_LIBELLE === p.POSTE_LIBELLE
  );
  console.log('postAssocies:', postAssocies);
  const section = postAssocies.filter(post => post.CONTEXT === 'MAIN_DOEUVRE');

  let totalMainDvre = 0;

  section.forEach(post => {
    const divBloc = document.createElement('div');
    divBloc.classList.add('sectionsBloc');

    const codeLibelleDiv = document.createElement('div');
    codeLibelleDiv.textContent = post.CODE_LIBELLE;
    codeLibelleDiv.classList.add('codeLibelle');

    const nbHDiv = document.createElement('div');
    nbHDiv.textContent = `${post.NB_H}h`;
    nbHDiv.classList.add('quantite');

    const tauxDiv = document.createElement('div');
    tauxDiv.textContent = `${post.TAUX} €/h`;
    tauxDiv.classList.add('prixUnitaire');

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `${parseFloat(post.TOTAL || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    totalDiv.classList.add('total');

    const totalMdvr = document.createElement('div');
    totalMdvr.textContent = "total main d'oeuvre";
    totalMdvr.classList.add('totalMdvr');

    divBloc.append(codeLibelleDiv, nbHDiv, tauxDiv, totalDiv);
    sectionData.appendChild(divBloc);

    totalMainDvre += parseFloat(post.TOTAL || 0);
  });

  const totalMdvr = document.createElement('div');
  totalMdvr.classList.add('totalMdvr');

  const totalMdvrP = document.createElement('p');
  totalMdvrP.classList.add('totalMdvrP');
  totalMdvrP.textContent = "Total main d'oeuvre";

  const tMd = document.createElement('div');
  tMd.classList.add('totalMd');
  tMd.textContent = `${totalMainDvre.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  totalMdvr.append(totalMdvrP, tMd);
  containerSection.append(contextSection, sectionData, totalMdvr);

  // Container Achat
  const containerAchat = document.createElement('div');
  containerAchat.classList.add('containerAchat');
  const contextAchat = document.createElement('div');
  contextAchat.textContent = 'ACHATS';

  contextAchat.classList.add('contextTitle');

  const achatsData = document.createElement('div');
  achatsData.classList.add('achatsData');

  const achats = postAssocies.filter(post => post.CONTEXT === 'ACHATS');

  let totalAchats = 0;
  achats.forEach(post => {
    const achatDiv = document.createElement('div');
    achatDiv.classList.add('achatsBloc');

    const codeLibelleDiv = document.createElement('div');
    codeLibelleDiv.textContent = post.CODE_LIBELLE;
    codeLibelleDiv.classList.add('codeLibelle');

    const produitDiv = document.createElement('div');
    produitDiv.textContent = post.PRODUIT || '-';
    produitDiv.classList.add('produit');

    const qteDiv = document.createElement('div');
    qteDiv.textContent = post.QTE;
    qteDiv.classList.add('quantite');

    const uniteDiv = document.createElement('div');
    uniteDiv.textContent = post.UNITE || '-';
    uniteDiv.classList.add('unite');

    const prixUDiv = document.createElement('div');
    prixUDiv.textContent = `${post.PRIX_U} €`;
    prixUDiv.classList.add('prixUnitaire');

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `${parseFloat(post.TOTAL || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

    totalDiv.classList.add('total');

    achatDiv.append(codeLibelleDiv, produitDiv, qteDiv, uniteDiv, prixUDiv, totalDiv);
    achatsData.appendChild(achatDiv);
    totalAchats += parseFloat(post.TOTAL || 0);
  });

  const totalA = document.createElement('div');
  totalA.classList.add('totalA');

  const totalAchatsP = document.createElement('p');
  totalAchatsP.classList.add('totalAchatsP');
  totalAchatsP.textContent = 'Total achats';

  const tA = document.createElement('div');
  tA.classList.add('tA');
  tA.textContent = `${totalAchats.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  totalA.append(totalAchatsP, tA);
  containerAchat.append(contextAchat, achatsData, totalA);

  // Container Fournitures
  const containerFourniture = document.createElement('div');
  containerFourniture.classList.add('containerFourniture');

  const contextFourniture = document.createElement('div');
  contextFourniture.textContent = 'CHANTIER';

  contextFourniture.classList.add('contextTitle');

  const fournituresData = document.createElement('div');
  fournituresData.classList.add('fournituresData');

  const fournitures = postAssocies.filter(post => post.CONTEXT === 'CHANTIER');

  let totalFournitures = 0;
  fournitures.forEach(post => {
    const fournitureDiv = document.createElement('div');
    fournitureDiv.classList.add('fournituresBloc');

    const codeLibelleDiv = document.createElement('div');
    codeLibelleDiv.textContent = post.CODE_LIBELLE;
    codeLibelleDiv.classList.add('codeLibelle');

    const produitDiv = document.createElement('div');
    produitDiv.textContent = post.PRODUIT || '-';
    produitDiv.classList.add('produit');

    const qteDiv = document.createElement('div');
    qteDiv.textContent = post.QTE;
    qteDiv.classList.add('quantite');

    const uniteDiv = document.createElement('div');
    uniteDiv.textContent = post.UNITE || '-';
    uniteDiv.classList.add('unite');

    const prixUDiv = document.createElement('div');
    prixUDiv.textContent = `${parseFloat(post.PRIX_U || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    prixUDiv.classList.add('prixUnitaire');

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `${parseFloat(post.TOTAL || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

    totalDiv.classList.add('total');

    fournitureDiv.append(codeLibelleDiv, produitDiv, qteDiv, uniteDiv, prixUDiv, totalDiv);
    fournituresData.appendChild(fournitureDiv);

    totalFournitures += parseFloat(post.TOTAL || 0);
  });

  const totalF = document.createElement('div');
  totalF.classList.add('totalF');

  const totalFournituresP = document.createElement('p');
  totalFournituresP.classList.add('totalFournituresP');
  totalFournituresP.textContent = 'Total Chantier';

  const tF = document.createElement('div');
  tF.classList.add('tF');
  tF.textContent = `${totalFournitures.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  totalF.append(totalFournituresP, tF);

  const totalGlobal = document.createElement('div');
  totalGlobal.classList.add('totalGlobal');

  const totalG = totalMainDvre + totalAchats + totalFournitures;

  const totalGlobalP = document.createElement('p');
  totalGlobalP.textContent = `Total Global`;
  totalGlobalP.classList.add('totalGlobalP');

  const totalGDiv = document.createElement('div');
  totalGDiv.classList.add('totalGDiv');
  totalGDiv.textContent = `${totalG.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  totalGlobal.append(totalGlobalP, totalGDiv);

  containerFourniture.append(contextFourniture, fournituresData, totalF);

  modalContent.append(postLibelle, saf);
  saf.append(containerSection, containerAchat, containerFourniture, totalGlobal);
  modalContent.prepend(divBtns);

  // Fermer le modal avec la touche Échap
  const handleEscape = e => {
    if (e.key === 'Escape') {
      modal.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
        document.body.removeChild(modal);
      }, 300);
      document.body.classList.remove('noscroll');
      document.removeEventListener('keydown', handleEscape); // Nettoyage du listener
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Modal action btn close
  modal.classList.remove('hidden');
  document.body.classList.add('noscroll');
  closeBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('hide');
    setTimeout(() => {
      overlay.remove();
      document.body.removeChild(modal); // Ferme le modal
    }, 300);
    document.body.classList.remove('noscroll');
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      modal.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
        document.body.removeChild(modal); // Ferme le modal
      }, 300);
      document.body.classList.remove('noscroll');
    }
  });
}
