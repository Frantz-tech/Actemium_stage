import { Router } from 'express';
import { Controller } from '../controller/contratController.js';

const router = Router();

router.post('/contrat', Controller.createContrat);
router.get('/contrat', Controller.getContrat);

export default router;
