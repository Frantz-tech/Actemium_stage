import { Router } from 'express';
import { Controller } from '../../controller/segementationController/achatController.js';

const router = Router();

// Liste des routes de achats

router.get('/', Controller.getAllAchats);

export default router;
