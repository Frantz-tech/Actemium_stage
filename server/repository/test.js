import pool from '../config/db.js';

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('La connexion est réussie, résultat:', rows[0].solution);
  } catch (err) {
    console.error('Erreur de connexion à la base de données', err);
  }
}

testConnection();
