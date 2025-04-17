import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';
import connectDB from './config/db.js';
import routes from './routes/routes.js';
dotenv.config();

const app = e();

connectDB();
app.use(cors());

app.use(e.json());

app.use(routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server back listening on http://localhost:${PORT}`);
});

export default app;
