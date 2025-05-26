// Repository pour les clients

import pool from '../../config/db.js';

// Récupérer toutes les sections selon un contexte donné
const getAllSections = async context => {
  const sql = 'SELECT SECTION, LIBELLE FROM CODE WHERE UPPER(CONTEXT) = UPPER(?)';
  const [rows] = await pool.query(sql, [context]);
  console.log('Donnée bdd ', rows);

  return rows;
};

export const Repository = {
  getAllSections,
};
