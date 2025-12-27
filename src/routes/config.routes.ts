import { Router } from 'express';
import { ConfigController } from '../controllers/config.controller';
import { requireAdmin } from '../middlewares/auth.middleware';
import { validate, validateMultiple } from '../middlewares/validation.middleware';
import { 
  createThresholdBodySchema, 
  updateThresholdBodySchema,
  thresholdParamsSchema
} from '../validation/schemas/config.schema';


const router = Router();
const configController = new ConfigController();

/**
 * @swagger
 * tags:
 *   name: Config
 *   description: API for managing configuration
 */

// Define routes for User Story 1 (T008)
router.post(
  '/thresholds',
  requireAdmin,
  validate(createThresholdBodySchema, 'body'),
  configController.createThreshold
);

router.put(
  '/thresholds/:factor',
  requireAdmin,
  validateMultiple({
    params: thresholdParamsSchema,
    body: updateThresholdBodySchema,
  }),
  configController.updateThreshold
);

/**
 * @swagger
 * /api/config/thresholds:
 *   get:
 *     summary: Retrieve all thresholds
 *     tags: [Config]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of thresholds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Threshold'
 */
router.get('/thresholds', requireAdmin, configController.getAllThresholds);
router.delete('/thresholds', requireAdmin, configController.resetAllThresholds);

export default router;

