import { Services } from '../services/expertiseService.js';

const createExpertise = async (req, res) => {
  try {
    const expertise = await Services.createExpertise(req, res);
    if (expertise.errors) {
      return res.status(400).json({
        status: 'error',
        message: 'Erreur lors de la création de l expertise',
        error: expertise.errors,
      });
    }
    return res
      .status(201)
      .json({ status: 'success', message: 'Expertise crée avec succès !', data: expertise });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExpertise = async (_, res) => {
  try {
    const expertise = await Services.getExpertise();
    if (expertise.errors) {
      return res.status(400).json({
        status: 'error',
        message: 'Erreur lors de la récupération des expertises',
        error: expertise.errors,
      });
    }
    return res
      .status(200)
      .json({ status: 'succes', message: 'Expertises récupérées avec succès !', data: expertise });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExpertiseId = async (req, res) => {
  try {
    const { id } = req.params;
    const expertise = await Services.getExpertiseId(id);
    if (expertise.errors) {
      return res.status(400).json({
        status: 'error',
        message: 'Erreur lors de la récupération de l expertise',
        error: expertise.errors,
      });
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Expertise récupérée avec succès !', data: expertise });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const Controller = {
  createExpertise,
  getExpertise,
  getExpertiseId,
};
