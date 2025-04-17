import { Router } from 'express';
import { Controller } from '../controller/expertiseController.js';

const router = Router();

router.post('/expertise', Controller.createExpertise);
router.get('/expertise', Controller.getExpertise);
router.get('/expertise/:id', Controller.getExpertiseId);

export default router;
