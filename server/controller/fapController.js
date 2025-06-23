import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/fapService.js';

const createFap = async (req, res, next) => {
  console.log('Requete recu par fap body ', req.body);

  try {
    const result = await Service.createFap(req.body);
    console.log('Résultat controller.createFap : ', result);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }

    sendSuccessResponse(res, 201, 'Fap envoyé en base de donné avec succès', result);
  } catch (err) {
    next(err);
  }
};

const getFapById = async (req, res, next) => {
  try {
    const devis_id = req.params.devis_id;

    console.log('Params reçus:', devis_id);

    const result = await Service.getFapById(devis_id);
    sendSuccessResponse(res, 200, `Fap avec ID ${devis_id} récupéré avec succès`, result);
  } catch (err) {
    next(err);
  }
};

const patchFap = async (req, res, next) => {
  try {
    const newData = req.body;
    const devis_id = req.params.devis_id;

    console.log('Données patch : ', newData);

    console.log('Params reçus:', devis_id);

    const result = await Service.patchFap(newData);
    sendSuccessResponse(
      res,
      200,
      `Fap avec le devis qui a pour ID ${devis_id} mis à jour avec succès`,
      result
    );
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  createFap,
  getFapById,
  patchFap,
};
