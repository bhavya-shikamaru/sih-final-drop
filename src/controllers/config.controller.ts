import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '../services/config.service';
import { sendSuccess, sendError } from '../utils/response.utils';

// A basic async handler wrapper to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export class ConfigController {
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  createThreshold = asyncHandler(async (req: Request, res: Response) => {
    const threshold = await this.configService.createThreshold(req.body);
    sendSuccess(res, threshold, 201, 'Threshold created successfully.');
  });

  updateThreshold = asyncHandler(async (req: Request, res: Response) => {
    const { factor } = req.params;
    const updatedThreshold = await this.configService.updateThresholdByFactor(factor, req.body);

    if (!updatedThreshold) {
      return sendError(res, 'Threshold not found', 404);
    }

    sendSuccess(res, updatedThreshold, 200, 'Threshold updated successfully.');
  });

  getAllThresholds = asyncHandler(async (req: Request, res: Response) => {
    const thresholds = await this.configService.getAllThresholds();
    sendSuccess(res, thresholds, 200, 'Thresholds retrieved successfully.');
  });

  resetAllThresholds = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.configService.resetAllThresholds();
    sendSuccess(res, result, 200, 'All thresholds reset successfully.');
  });
}
