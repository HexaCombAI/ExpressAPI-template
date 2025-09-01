import { Router, type Request, type Response } from 'express';

// 🐱 Create main router
const router: Router = Router();
// 🐱 Import api routes
import apiRoutes from './api/index.route.js';

// 🐱 API routes
router.use('/api', apiRoutes);

// 🐱 Import app info
import { appInfo } from '../utils/app-info.js';

// 🐱 Health check endpoint
router.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    message: appInfo.name,
    version: appInfo.version,
    endpoints: appInfo.endpoints
  });
});

// 🐱 Root App endpoint
router.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    message: appInfo.name,
    version: appInfo.version,
    endpoints: appInfo.endpoints
  });
});

// 🐱 Export router
export default router;
