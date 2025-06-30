import { Repository } from '../repository/tauxHRepository.js';

const patchTaux = async newData => {
  const errors = [];

  if (!newData.TAUX) {
    errors.push('Le taux est obligatoire !');
  }

  if (parseFloat(newData.TAUX) <= 0) {
    errors.push('Le taux doit être supérieur à 0 € / H');
  }

  if (!newData.ANNEE) {
    errors.push("L'année est obligatoire");
  }
  if (errors.length > 0) {
    return { errors };
  }

  const updateTaux = await Repository.patchTaux(newData);
  console.log('Service || ✅ Taux modifié : ', newData);

  return updateTaux;
};

export const Service = {
  patchTaux,
};
