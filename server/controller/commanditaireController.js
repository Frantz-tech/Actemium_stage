import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendSuccessResponse } from '../helper/responseHelper.js';
import { Service } from '../services/commanditaireService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createCommanditaire = async (req, res) => {
  try {
    const { NOM, EMAIL } = req.body;
    const logo = req.file;

    console.log('req.body', req.body);
    console.log('req.file', req.file);

    if (!NOM || !EMAIL) {
      return res.status(400).json({ message: 'Nom ou email manquant' });
    }
    console.log('donnée recu pour la création : ', req.body);

    const result = await Service.createCommanditaire(req.body, logo);

    if (result.errors && result.errors.length > 0) {
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
    const result = await Service.getAllCommanditaires();
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

    const commanditaire = await Service.getCommanditaireById(id);

    if (!commanditaire) {
      return res.status(404).json({ message: 'Commanditaire non trouvé' });
    }
    const result = await Service.deleteCommanditaire(id);

    if (commanditaire.LOGO) {
      const filePath = path.resolve(__dirname, '..', 'public', 'uploads', commanditaire.LOGO);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('logo supprimé :', filePath);
      } else {
        console.log('logo non trouvé');
      }
    }
    sendSuccessResponse(res, 200, 'Commanditaire supprimé avec succès', result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const patchCommanditaire = async (req, res) => {
  try {
    const { id } = req.params;
    const { NOM, EMAIL } = req.body;
    const logo = req.file;

    console.log('req.body', req.body);
    console.log('req.file', req.file);

    if (!NOM || !EMAIL) {
      return res.status(400).json({ message: 'Nom ou email manquant' });
    }
    req.body.CMDT_ID = id;
    console.log('donnée recu pour la création : ', req.body);

    const result = await Service.patchCommanditaire(req.body, logo);

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ message: result.errors });
    }
    sendSuccessResponse(res, 201, 'Commanditaire modifier avec succès', result);
  } catch (error) {
    console.error('Erreur lors de la modification du commanditaire', error);
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createCommanditaire,
  getAllCommanditaires,
  getCommanditaireById,
  updateCommanditaire,
  deleteCommanditaire,
  patchCommanditaire,
};
