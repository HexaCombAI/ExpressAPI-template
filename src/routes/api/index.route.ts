// 🐱 API routes
import { Router } from 'express';

const apiRoutes = Router();

// 🐱 Import api routes
import v1ApiRoutes from './v1/index.route.js';

// 🐱 API root endpoint
apiRoutes.get('/', (_req, res) => {
  res.status(200).json({
    message: '🐱 Express API Template',
    version: '1.0.0',
    endpoints: {
      v1: '/v1'
    }
  });
});

// 🐱 V1 API endpoint
apiRoutes.use('/v1', v1ApiRoutes);

// 🐱 Export api route
export default apiRoutes;