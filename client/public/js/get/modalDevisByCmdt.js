import { getDevisByCmdtId } from '../get/fetchDevisByCmdt.js';
import { formatDate } from '../utils/formatDate.js';

export async function devisByCmdtModal(c) {
  const devis = await getDevisByCmdtId(c.CMDT_ID);
  const main = document.querySelector('main');

  const modal = document.createElement('div');
  modal.classList.add('modalDevisByCmdt');
  document.body.classList.add('noscroll');
  modal.style.display = 'flex';
  modal.classList.add('show');

  // Btn fermeture modal
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  closeBtn.classList.add('close-btn');
  closeBtn.classList.add('close-btnClient');

  // overlay ( blur ) du poste
  const overlay = document.createElement('div');
  overlay.classList.add('modalDevisByCmdt-overlay');
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Contenu du modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modalDevisByCmdt_content');

  // Modal title
  const modalTitle = document.createElement('h3');
  modalTitle.classList.add('modalTitle');
  modalTitle.textContent = 'Devis associés';

  const listContainer = document.createElement('ul');
  listContainer.classList.add('listContainer');

  if (!devis.data || devis.data.length === 0) {
    const li = document.createElement('li');
    li.classList.add('list');
    li.textContent = `Aucun devis n'est associé à ce client`;
    listContainer.appendChild(li);
  }
  devis.data.forEach(elem => {
    const li = document.createElement('li');
    li.classList.add('list');
    li.textContent = `
      ${elem.DEVIS_REF} |
      ${elem.LIBELLE} | 
      ${formatDate(elem.DATE_CREATION)} `;
    listContainer.appendChild(li);
  });

  // Fermer le modal avec la touche Échap
  const handleEscape = e => {
    if (e.key === 'Escape') {
      modal.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
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
    }, 300);
    document.body.classList.remove('noscroll');
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      modal.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
      }, 300);
      document.body.classList.remove('noscroll');
    }
  });
  // AppendChild
  main.appendChild(overlay);
  overlay.appendChild(modal);
  modal.append(modalContent, closeBtn);
  modalContent.append(modalTitle, listContainer);

  return devis;
}
