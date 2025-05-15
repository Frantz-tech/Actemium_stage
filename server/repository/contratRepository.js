// Repository pour les contrats

import pool from '../config/db.js';

// Créer un nouveau contrat :

const createContrat = async contratData => {
  const { code, type } = contratData;
  const [result] = await pool.query('INSERT INTO CONTRAT (CODE, TYPE) VALUES (?,?)', [code, type]);
  return result.insertId;
};

// Récuperer tout les contrats
const getAllContrats = async () => {
  const [rows] = await pool.query('SELECT * FROM CONTRAT');
  return rows;
};

// Récuperer un contrat par ID
const getContratById = async id => {
  const [rows] = await pool.query('SELECT * FROM CONTRAT WHERE CONTRAT_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour un contrat
const updateContrat = async (id, contratData) => {
  const { code, type } = contratData;
  return await pool.query('UPDATE CONTRAT SET CODE = ?, TYPE = ? WHERE ID = ? ', [code, type, id]);
};

// Supprimer un contrat
const deleteContrat = async id => {
  return await pool.query('DELETE FROM CONTRAT WHERE id = ?', [id]);
};
export const Repository = {
  createContrat,
  getAllContrats,
  getContratById,
  updateContrat,
  deleteContrat,
};
