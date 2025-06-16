import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/db.js';
import routes from './routes/routes.js';
dotenv.config();

const app = e();

app.use(e.json());

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/upload', e.static(path.resolve(__dirname, 'public', 'uploads')));
// Vérification la connexion de MYSQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error(' ❌ Erreur lors de la connexion à MYSQL : ', err.message);
  } else {
    console.log('✅ Connecté à la base de donnée MYSQL');
    connection.release();
  }
});
app.use((req, res, next) => {
  console.log(`➡️ Requête reçue : ${req.method}-${req.url}`);
  next();
});
app.use('/api', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
