import { Router } from 'express';
import { Controller } from '../controller/posteController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = Router();

// Liste des routes de postes

router.post('/', authenticate, Controller.createPoste);
router.get('/', authenticate, Controller.getAllPostes);
router.delete('/', authenticate, Controller.deletePoste);

export default router;
