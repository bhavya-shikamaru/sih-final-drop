import { Request, Response, NextFunction } from 'express';
// Assuming `ApiError` and `sendError` are available from `utils` or globally
// For now, using direct response for simplicity.
// TODO: Integrate with actual error handling middleware and User model for roles.

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for actual authentication logic (e.g., JWT verification)
  // In a real app, req.user would be populated by a prior auth middleware
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
  }
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for actual role checking
  // Assuming req.user exists and has a 'role' property (e.g., from JWT payload)
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } });
  }
  next();
};
