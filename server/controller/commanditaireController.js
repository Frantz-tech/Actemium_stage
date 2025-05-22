import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/commanditaireService.js';

const createCommanditaire = async (req, res) => {
  try {
    const { NOM, EMAIL } = req.body;
    if (!NOM || !EMAIL) {
      return res.status(400).json({ message: 'Nom ou email manquant' });
    }
    console.log('donnée recu pour la création : ', req.body);

    const result = await Service.createCommanditaire(req.body);

    if (result.errors || result.errors.length > 0) {
      return res.status(400).json({ message: result.errors });
    }
    sendSuccessResponse(res, 201, 'Commanditaire créer avec succès', result);
  } catch (error) {
    console.error('Erreur lors de la création du commanditaire', error);
    return res.status(500).json({ error: error.message });
  }
};
const getAllCommanditaires = async (req, res) => {
  try {
    const result = await Service.getAllCommanditaires(req.body);
    sendSuccessResponse(res, 200, 'Commanditaires récupérés avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getCommanditaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getCommanditaireById(id);
    sendSuccessResponse(res, 200, `Commanditaire avec ID ${id} récupéré avec succès`, result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateCommanditaire = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.updateCommanditaire(id, req.body);
    sendSuccessResponse(res, 200, 'Commanditaire mis à jour avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteCommanditaire = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.deleteCommanditaire(id);
    sendSuccessResponse(res, 200, 'Commanditaire supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createCommanditaire,
  getAllCommanditaires,
  getCommanditaireById,
  updateCommanditaire,
  deleteCommanditaire,
};
