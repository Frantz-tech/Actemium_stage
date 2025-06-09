// Recuperer l'admin
import pool from '../config/db.js';

// Recup les poste par id de devis
const getDetailPostes = async (devis_id, ra_id) => {
  const [rows] = await pool.query(
    `SELECT p.CODE_ID, c.LIBELLE AS LIBELLE, c.CONTEXT AS CONTEXT, p.TOTAL FROM postes p
JOIN CODE c ON p.CODE_ID = c.CODE_ID
WHERE DEVIS_ID = ?
ORDER BY p.CODE_ID`,
    [devis_id, ra_id]
  );
  console.log('Postes libelle context et total : ', rows);

  return rows;
};

export const Repository = {
  getDetailPostes,
};
