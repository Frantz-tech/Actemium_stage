// Repository pour les clients

import pool from '../../config/db.js';

// Récupérer tous les fraisFournitures selon un contexte donné
const getAllFraisFournitures = async context => {
  const sql = 'SELECT SECTION, LIBELLE FROM CODE WHERE UPPER(CONTEXT) = UPPER(?)';
  const [rows] = await pool.query(sql, [context]);
  console.log('Donnée bdd ', rows);

  return rows;
};

export const Repository = {
  getAllFraisFournitures,
};
