import { Router } from 'express';
import expertiseRoute from './expertiseRoute.js';
const router = Router();

router.use(expertiseRoute);

export default router;
