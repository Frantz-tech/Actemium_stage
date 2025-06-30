import pool from '../config/db.js';

const patchTaux = async newData => {
  const sql = `
  UPDATE HEURES_POSTE
  SET
    TAUX = ?,
    ANNEE = ?
  WHERE CODE_ID = ?;
  `;

  const params = [newData.TAUX, newData.ANNEE, newData.CODE_ID];

  const [result] = await pool.query(sql, params);
  return result;
};

export const Repository = {
  patchTaux,
};
