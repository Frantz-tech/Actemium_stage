import { Router } from 'express';
import { Controller } from '../controller/detailModalController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = Router();

// Liste des routes de postes detail

router.get('/', authenticate, Controller.getDetailPostes);

export default router;
