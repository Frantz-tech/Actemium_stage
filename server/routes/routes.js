import { Router } from 'express';
import contratRoutes from './contratRoute.js';
const router = Router();

router.use(contratRoutes);

export default router;
