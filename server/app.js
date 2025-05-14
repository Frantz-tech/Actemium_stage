import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';
import pool from './config/db.js';
import routes from './routes/routes.js';
dotenv.config();

const app = e();

app.use(cors());
app.use(e.json());

// Vérification la connexion de MYSQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error(' ❌ Erreur lors de la connexion à MYSQL : ', err.message);
  } else {
    console.log('✅ Connecté à la base de donnée MYSQL');
    connection.release();
  }
});

app.use('/api', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
