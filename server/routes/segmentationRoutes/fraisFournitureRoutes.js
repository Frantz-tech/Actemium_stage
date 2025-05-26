import { Router } from 'express';
import { Controller } from '../../controller/segementationController/fraisFournitureController.js';

const router = Router();

// Liste des routes de fraisFournitures

router.get('/', Controller.getAllFraisFournitures);

export default router;
