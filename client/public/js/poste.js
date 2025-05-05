// const btnCreerPoste = document.querySelector('.btnCreer');
// const btnAddSection = document.getElementById('ajouterGroupeSection');
// const btnAddAchat = document.getElementById('ajouterGroupeAchat');
// const btnAddFraisChantier = document.getElementById('ajouterGroupeFraisChantier');
// const btnDeleteSection = document.querySelector('.supprimerGroupeSection');
// const btnDeleteAchat = document.querySelector('.supprimerGroupeAchat');
// const btnDeleteFraisChantier = document.querySelector('.supprimerGroupeFraisChantier');
// document.querySelector('h1').innerText = 'POSTE';
// btnCreerPoste.innerText = 'Créer';

// btnAddSection.addEventListener('click', () => {
//   const contenuSection = document.querySelector('.contenuSection');
//   const cloneSection = contenuSection.cloneNode(true);
//   cloneSection.style.display = 'flex';
//   const hiddenSection = document.getElementById('hidden');
//   hiddenSection.classList.remove('hidden');
//   document.querySelector('.groupePoste').appendChild(cloneSection);
// });

// const groupeSection = document.querySelector('.groupeSection');

// groupeSection.addEventListener('click', e => {
//   if (e.target && e.target.classList.contains('supprimerGroupeSection')) {
//     const deleteSection = e.target.closest('.contenuSection');
//     if (deleteSection) {
//       const confirmation = confirm('Es-tu sûr de vouloir supprimer cette section ?');
//       if (confirmation) {
//         deleteSection.remove();
//       }
//     }
//   }
// });

// btnAddAchat.addEventListener('click', () => {
//   const contenuAchat = document.querySelector('.contenuAchat');
//   const cloneAchat = contenuAchat.cloneNode(true);
//   cloneAchat.style.display = 'flex';
//   const hiddenSection = document.getElementById('hidden');
//   hiddenSection.classList.remove('hidden');

//   const groupeAchat = document.querySelector('.groupeAchat');
//   groupeAchat.appendChild(cloneAchat);
//   groupeAchat.addEventListener('click', e => {
//     if (e.target && e.target.classList.contains('supprimerGroupeAchat')) {
//       const deleteAchat = e.target.closest('.contenuAchat');
//       if (deleteAchat) {
//         const confirmation = confirm('Es-tu sûr de vouloir supprimer cette achat ?');
//         if (confirmation) {
//           deleteAchat.remove();
//         }
//       }
//     }
//   });
// });

// btnAddFraisChantier.addEventListener('click', () => {
//   const contenuFraisChantier = document.querySelector('.contenuFraisChantier');
//   const cloneFraisChantier = contenuFraisChantier.cloneNode(true);
//   cloneFraisChantier.style.display = 'flex';
//   const hiddenSection = document.getElementById('hidden');
//   hiddenSection.classList.remove('hidden');

//   const groupeFraisChantier = document.querySelector('.groupeFraisChantier');
//   groupeFraisChantier.appendChild(cloneFraisChantier);
//   groupeFraisChantier.addEventListener('click', e => {
//     if (e.target && e.target.classList.contains('supprimerGroupeFraisChantier')) {
//       const deleteFraisChantier = e.target.closest('.contenuFraisChantier');
//       if (deleteFraisChantier) {
//         const confirmation = confirm('Es-tu sur de vouloir supprimer le frais de chantier ? ');
//         if (confirmation) {
//           deleteFraisChantier.remove();
//         }
//       }
//     }
//   });
// });

// btnCreerPoste.addEventListener('click', () => {
//   alert('ajout d un poste dans la liste des post + envoie vers cette page ');
//   window.location.href = '../pages/postesList.html';
// });

// ----------------------------------------------

// ✅ Nouvelle version générique

const btnCreerPoste = document.querySelector('.btnCreer');
const btnAddSection = document.getElementById('ajouterGroupeSection');
const btnAddAchat = document.getElementById('ajouterGroupeAchat');
const btnAddFraisChantier = document.getElementById('ajouterGroupeFraisChantier');
document.querySelector('h1').innerText = 'POSTE';
btnCreerPoste.innerText = 'Créer';

function ajouterBloc(modeleSelector, containerSelector) {
  const modele = document.querySelector(modeleSelector);
  if (!modele) return;

  const clone = modele.cloneNode(true);
  clone.classList.remove('hidden');
  clone.style.display = 'flex';
  clone.removeAttribute('id');

  clone.querySelectorAll('input').forEach(input => (input.value = ''));
  clone.querySelectorAll('select').forEach(select => (select.selectedIndex = 0));

  document.querySelector(containerSelector).appendChild(clone);
}

// Ajout des blocs
btnAddSection.addEventListener('click', () => ajouterBloc('.contenuSection', '.groupePoste'));
btnAddAchat.addEventListener('click', () => ajouterBloc('.contenuAchat', '.groupeAchat'));
btnAddFraisChantier.addEventListener('click', () =>
  ajouterBloc('.contenuFraisChantier', '.groupeFraisChantier')
);

// ----------------------------------------------
// Suppression (event delegation)
document.addEventListener('click', e => {
  // Supprimer une section
  if (e.target.classList.contains('supprimerGroupeSection')) {
    const bloc = e.target.closest('.contenuSection');
    if (bloc && confirm('Es-tu sûr de vouloir supprimer cette section ?')) {
      bloc.remove();
    }
  }

  // Supprimer un achat
  if (e.target.classList.contains('supprimerGroupeAchat')) {
    const bloc = e.target.closest('.contenuAchat');
    if (bloc && confirm('Es-tu sûr de vouloir supprimer cet achat ?')) {
      bloc.remove();
    }
  }

  // Supprimer un frais de chantier
  if (e.target.classList.contains('supprimerGroupeFraisChantier')) {
    const bloc = e.target.closest('.contenuFraisChantier');
    if (bloc && confirm('Es-tu sûr de vouloir supprimer ce frais de chantier ?')) {
      bloc.remove();
    }
  }
});

// ----------------------------------------------
// Navigation après création
btnCreerPoste.addEventListener('click', () => {
  alert('ajout d un poste dans la liste des post + envoie vers cette page ');
  window.location.href = '../pages/postesList.html';
});
