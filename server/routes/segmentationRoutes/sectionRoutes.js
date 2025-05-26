import { Router } from 'express';
import { Controller } from '../../controller/segementationController/sectionController.js';

const router = Router();

// Liste des routes de sections

router.get('/', Controller.getAllSections);

export default router;
