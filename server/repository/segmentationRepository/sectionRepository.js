// Repository pour les clients

import pool from '../../config/db.js';

// Récupérer toutes les sections selon un contexte donné
const getAllSections = async context => {
  const sql =
    'SELECT c.CODE_ID, c.LIBELLE, c.CONTEXT,  h.TAUX, h.ANNEE FROM CODE c LEFT JOIN HEURES_POSTE h ON c.CODE_ID = h.CODE_ID WHERE c.CONTEXT = ? AND (c.CODE_ID BETWEEN 1 and 11 OR c.CODE_ID = 14) ';
  const [rows] = await pool.query(sql, [context]);
  console.log('Donnée bdd ', rows);

  return rows;
};

export const Repository = {
  getAllSections,
};
