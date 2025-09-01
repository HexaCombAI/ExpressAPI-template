import { Router, type Request, type Response } from 'express';

// 🐱 Create main router
const router: Router = Router();
// 🐱 Import api routes
import apiRoutes from './api/index.route.js';

// 🐱 API routes
router.use('/api', apiRoutes);

// 🐱 Import app info
import { appInfo } from '../utils/app-info.js';
// 🐱 Import date utilities
import { getCurrentISODate } from '../types/date.type.js';

// 🐱 Health check endpoint
router.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    statusCode: 200,
    message: appInfo.name,
    version: appInfo.version,
    endpoints: appInfo.endpoints,
    timestamp: getCurrentISODate()
  });
});

// 🐱 Root App endpoint
router.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    statusCode: 200,
    message: appInfo.name,
    version: appInfo.version,
    endpoints: appInfo.endpoints
  });
});

// 🐱 Export router
export default router;
