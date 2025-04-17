import { Router } from 'express';
import { Controller } from '../controller/contratController.js';

const router = Router();

router.post('/contrat', Controller.createContrat);

export default router;
