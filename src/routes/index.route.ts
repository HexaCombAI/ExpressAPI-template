import { Router, type Request, type Response } from 'express';
import type { HealthyResponseBody, SuccessResponseBody } from '../types/responseBody.type.js';

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
  const response: HealthyResponseBody<{ version: string; endpoints: Record<string, string> }> = {
    status: 'healthy',
    statusCode: 200,
    message: appInfo.name,
    payload: {
      version: appInfo.version,
      endpoints: appInfo.endpoints
    },
    timestamp: getCurrentISODate()
  };
  res.status(200).json(response);
});

// 🐱 Root App endpoint
router.get('/', (_req: Request, res: Response): void => {
  const response: SuccessResponseBody<{ version: string; endpoints: Record<string, string> }> = {
    status: 'ok',
    statusCode: 200,
    message: appInfo.name,
    payload: {
      version: appInfo.version,
      endpoints: appInfo.endpoints
    },
    timestamp: getCurrentISODate()
  };
  res.status(200).json(response);
});

// 🐱 Export router
export default router;
