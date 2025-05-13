import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // ou ton mot de passe si tu en as mis un
  database: 'devis_app', // ou le nom choisi
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
