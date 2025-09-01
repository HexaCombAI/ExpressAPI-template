import { Router, type Request, type Response } from 'express';

// 🐱 Create main router
const router: Router = Router();
// 🐱 Import api routes
import apiRoutes from './api/index.route.js';

// 🐱 Root API endpoint
router.get('/api', apiRoutes);

// 🐱 Health check endpoint
router.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({
    message: '🐱 Express API Template',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// 🐱 Export router
export default router;
