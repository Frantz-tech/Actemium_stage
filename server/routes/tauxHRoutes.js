import { Router } from 'express';
import { Controller } from '../controller/tauxHController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = Router();

router.patch('/:id', authenticate, Controller.patchTaux);

export default router;
