import { Service } from '../services/contratService.js';

const createContrat = async (req, res) => {
  try {
    const data = req.body;
    const contrat = await Service.createContrat(data);

    if (contrat.errors) {
      return res.status(400).json({
        status: 'error',
        message: ' Des erreurs ont été rencontrées lors de la création du contrat ',
        error: contrat.errors,
      });
    }
    res
      .status(201)
      .json({ status: 'succes', message: ' Contrat crée avec succès : ', data: contrat });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Une erreur interne est survenue', error: error.message });
  }
};

const getContrat = async (req, res) => {
  try {
    const contrats = await Service.getContrat();
    if (contrats.errors) {
      return res.status(400).json({
        status: 'error',
        message: 'Des erreurs ont été rencontrées lors de la récupérations des contrats',
        error: contrats.errors,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Une erreur interne est survenue', error: error.message });
  }
};

export const Controller = {
  createContrat,
  getContrat,
};
