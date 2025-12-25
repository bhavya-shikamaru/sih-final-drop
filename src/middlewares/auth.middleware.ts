import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.utils';

// TODO: Integrate with actual error handling middleware and User model for roles.

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for actual authentication logic (e.g., JWT verification)
  // In a real app, req.user would be populated by a prior auth middleware
  if (!req.user) {
    return sendError(res, 'Authentication required', 401);
  }
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for actual role checking
  // Assuming req.user exists and has a 'role' property (e.g., from JWT payload)
  if (!req.user || (req.user as any).role !== 'admin') {
    return sendError(res, 'Admin access required', 403);
  }
  next();
};
