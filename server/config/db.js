import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // ou ton mot de passe si tu en as mis un
  database: process.env.DB_NAME, // ou le nom choisi
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// console.log('🔐 Password from env :', process.env.DB_PASSWORD);

export default pool;
