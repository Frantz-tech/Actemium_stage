import pool from '../config/db.js';

// créer un nouveau frais global
const createFraisGlobaux = async fraisGlobauxData => {
  const { NOM_FRAIS, POURCENTAGE } = fraisGlobauxData;
  const [result] = await pool.query(
    'INSERT INTO FRAIS_GLOBAUX (NOM_FRAIS, POURCENTAGE) VALUES (?,?)',
    [NOM_FRAIS, POURCENTAGE]
  );
  return result.insertId;
};

// Récupérer tout les frais

const getAllFraisGlobaux = async () => {
  const [rows] = await pool.query('SELECT * FROM FRAIS_GLOBAUX');
  return rows;
};

const patchFraisGlobaux = async newData => {
  const sql = `
  UPDATE FRAIS_GLOBAUX 
  SET 
    NOM_FRAIS = ?,
    POURCENTAGE = ?
  WHERE FRAIS_GLOBAUX_ID = ?
  `;

  const params = [newData.NOM_FRAIS, newData.POURCENTAGE, newData.FRAIS_GLOBAUX_ID];

  const result = await pool.query(sql, params);

  return result;
};

const deleteFraisGlobaux = async fraisId => {
  return await pool.query('DELETE FROM FRAIS_GLOBAUX WHERE FRAIS_GLOBAUX_ID = ?', [fraisId]);
};

export const Repository = {
  createFraisGlobaux,
  getAllFraisGlobaux,
  patchFraisGlobaux,
  deleteFraisGlobaux,
};
