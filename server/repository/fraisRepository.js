// Repository pour les frais

import pool from '../config/db.js';

// Créer une nouvelle frais :

// const createFrais = async fraisData => {};

// Récuperer toutes les frais
const getAllFrais = async () => {
  const [rows] = await pool.query('SELECT * FROM FRAIS_GLOBAUX');
  return rows;
};

// // Récuperer une frais par ID
// const getFraisById = async id => {
//   const [rows] = await pool.query('SELECT * FROM FRAIS WHERE FRAIS_ID = ?', [id]);
//   return rows[0];
// };

// // Mettre à jour une frais
// const updateFrais = async (id, fraisData) => {};

// // Supprimer une frais
// const deleteFrais = async id => {
//   return await pool.query('DELETE FROM FRAIS WHERE FRAIS_ID = ?', [id]);
// };
export const Repository = {
  // createFrais,
  getAllFrais,
  // getFraisById,
  // updateFrais,
  // deleteFrais,
};
