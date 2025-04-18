import { Router } from 'express';
import contratRoutes from './contratRoute.js';
import expertiseRoute from './expertiseRoute.js';

const router = Router();

router.use(contratRoutes);

router.use(expertiseRoute);

export default router;
