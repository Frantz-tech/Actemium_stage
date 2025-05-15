// Repository pour les expertises

import pool from '../config/db.js';

// Créer une nouvelle expertise :

const createExpertise = async expertiseData => {
  const { code, type } = expertiseData;
  const [result] = await pool.query('INSERT INTO EXPERTISE (CODE, TYPE) VALUES (?,?)', [
    code,
    type,
  ]);
  return result.insertId;
};

// Récuperer toutes les expertises
const getAllExpertises = async () => {
  const [rows] = await pool.query('SELECT * FROM EXPERTISE');
  return rows;
};

// Récuperer une expertise par ID
const getExpertiseById = async id => {
  const [rows] = await pool.query('SELECT * FROM EXPERTISE WHERE EXP_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour une expertise
const updateExpertise = async (id, expertiseData) => {
  const { code, type } = expertiseData;
  return await pool.query('UPDATE EXPERTISE SET CODE = ?, TYPE = ? WHERE EXP_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer une expertise
const deleteExpertise = async id => {
  return await pool.query('DELETE FROM EXPERTISE WHERE EXP_ID = ?', [id]);
};
export const Repository = {
  createExpertise,
  getAllExpertises,
  getExpertiseById,
  updateExpertise,
  deleteExpertise,
};
