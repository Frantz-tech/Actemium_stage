import { getDetailPostData } from './getDetailPostData.js';

export async function detailModal(devis_id, ra_id, context) {
  const detail = await getDetailPostData(devis_id, ra_id);

  const postesContext = detail[context];

  console.log('Nom du context :', context, '& détail : ', postesContext);

  const modal = document.createElement('div');
  modal.classList.add('modalDetail');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');

  const overlay = document.createElement('div');
  overlay.classList.add('modalDetail-overlay');
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.classList.add('close-btnDetail');
  closeBtn.textContent = 'x';

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

  const titleModal = document.createElement('h2');
  titleModal.classList.add('titleModalDetail');
  titleModal.textContent =
    context.toLowerCase() === 'main_doeuvre'
      ? "Main d'œuvre"
      : context.charAt(0).toUpperCase() + context.slice(1).toLowerCase();

  // regroupement titre et btn en haut

  const grpHeadModal = document.createElement('div');
  grpHeadModal.classList.add('grpHeadModal');
  grpHeadModal.append(titleModal, closeBtn);

  grpHeadModal.append(titleModal, closeBtn);

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalDetail_content');
  modal.appendChild(modalContent);
  modalContent.appendChild(grpHeadModal);

  postesContext.forEach(p => {
    const data = document.createElement('div');
    data.classList.add('dataDetail');

    const libelle = document.createElement('p');
    libelle.classList.add('libelleDetail');
    libelle.textContent = p.LIBELLE;

    const total = document.createElement('div');
    total.classList.add('totalDetail');
    total.textContent = `${parseFloat(p.TOTAL).toLocaleString('fr-FR')} €`;
    data.append(libelle, total);
    modalContent.appendChild(data);
  });

  document.body.appendChild(overlay);
  overlay.appendChild(modal);
  modal.appendChild(modalContent);
}
