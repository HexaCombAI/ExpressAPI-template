import { Router, type Request, type Response } from 'express';

// 🐱 Create main router
const router: Router = Router();
// 🐱 Import api routes
import apiRoutes from './api/index.route.js';

// 🐱 Root API endpoint
router.get('/api', apiRoutes);

// 🐱 Import app info
import { appInfo } from '../utils/app-info.js';

// 🐱 Health check endpoint
router.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({
    message: appInfo.name,
    version: appInfo.version,
    endpoints: appInfo.endpoints
  });
});

// 🐱 Export router
export default router;
