// Repository pour les devis

import pool from '../config/db.js';

// Créer une nouveau devis :

const createDevis = async devisData => {
  const { LIBELLE, RA_ID, CMDT_ID, CLIENT_ID, EXP_ID, DOM_ID, CONTRAT_ID } = devisData;
  const [result] = await pool.query(
    'INSERT INTO DEVIS (LIBELLE, RA_ID, CMDT_ID, CLIENT_ID, EXP_ID, DOM_ID, CONTRAT_ID) VALUES (?,?,?,?,?,?,?)',
    [LIBELLE, RA_ID, CMDT_ID, CLIENT_ID, EXP_ID, DOM_ID, CONTRAT_ID]
  );
  return result.insertId;
};

// Récuperer tous les devis
const getAllDevis = async () => {
  const [rows] = await pool.query('SELECT * FROM DEVIS');
  return rows;
};

// Récuperer un devis par son ID
const getDevisById = async id => {
  const [rows] = await pool.query('SELECT * FROM DEVIS WHERE DEVIS_ID = ?', [id]);
  return rows[0];
};

// Mettre à jour un devis
const updateDevis = async (id, devisData) => {
  const { code, type } = devisData;
  return await pool.query('UPDATE DEVIS SET CODE = ?, TYPE = ? WHERE DEVIS_ID = ? ', [
    code,
    type,
    id,
  ]);
};

// Supprimer un devis
const deleteDevis = async id => {
  return await pool.query('DELETE FROM DEVIS WHERE DEVIS_ID = ?', [id]);
};
export const Repository = {
  createDevis,
  getAllDevis,
  getDevisById,
  updateDevis,
  deleteDevis,
};
