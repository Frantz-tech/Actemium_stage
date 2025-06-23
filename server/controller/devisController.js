import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/devisService.js';

const createDevis = async (req, res, next) => {
  try {
    const result = await Service.createDevis(req.body);
    console.log('Résultat controller.createDevis :', result);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
    sendSuccessResponse(res, 201, 'Devis créer avec succès', result);
  } catch (err) {
    next(err);
  }
};

const getAllDevis = async (req, res, next) => {
  try {
    const result = await Service.getAllDevis();
    sendSuccessResponse(res, 200, 'Devis récupérés avec succès', result);
  } catch (err) {
    next(err);
  }
};
const getDevisById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.getDevisById(id);
    sendSuccessResponse(res, 200, `Devis avec ID ${id} récupéré avec succès`, result);
  } catch (err) {
    next(err);
  }
};

const getDevisByCmdt = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Id du commanditaire : ', id);

    const result = await Service.getDevisByCmdt(id);
    if (result.length > 0) {
      sendSuccessResponse(
        res,
        200,
        `Liste des devis associé au commanditaire Id : ${id} récupérés avec succès`,
        result
      );
    } else {
      sendSuccessResponse(res, 200, `Aucun devis trouvé pour le commanditaire Id : ${id}`, []);
    }
  } catch (err) {
    next(err);
  }
};
const updateDevis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.updateDevis(id, req.body);
    sendSuccessResponse(res, 200, 'Devis mis à jour avec succès', result);
  } catch (err) {
    next(err);
  }
};
const deleteDevis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteDevis(id);
    sendSuccessResponse(res, 200, 'Devis supprimé avec succès', result);
  } catch (err) {
    next(err);
  }
};

const getDevisByRaId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.RA_ID;

    if (id !== userId) {
      return res.status(403).json({ error: '❌ Accès interdit : RA_ID non autorisé.' });
    }

    const result = await Service.getDevisByRaId(id);
    if (result.length > 0) {
      sendSuccessResponse(res, 200, 'Liste des devis récupérés avec succès', result);
    } else {
      sendSuccessResponse(res, 200, 'Aucun devis trouvé', []);
    }
  } catch (err) {
    next(err);
  }
};

const patchDevis = async (req, res, next) => {
  try {
    const result = await Service.patchDevis(req.body);
    console.log('Résultat controller.patchDevis :', result);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
    sendSuccessResponse(res, 200, 'Devis modifié avec succès', result);
  } catch (err) {
    next(err);
  }
};

export const Controller = {
  createDevis,
  getAllDevis,
  getDevisById,
  getDevisByCmdt,
  updateDevis,
  deleteDevis,
  getDevisByRaId,
  patchDevis,
};
