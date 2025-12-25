import { Router } from 'express';
import { ConfigController } from '../controllers/config.controller';

const router = Router();
const configController = new ConfigController();

// Define routes for User Story 1 (T008)
router.post('/thresholds', configController.createThreshold);
router.put('/thresholds/:factor', configController.updateThreshold);

// TODO: Add routes for config management (T019)

export default router;
