import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/tauxHService.js';
const patchTaux = async (req, res, next) => {
  try {
    const result = await Service.patchTaux(req.body);
    console.log(('Résultat controller.patchTaux.js : ', result));

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
    sendSuccessResponse(res, 200, 'Taux modifié avec succès', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  patchTaux,
};
