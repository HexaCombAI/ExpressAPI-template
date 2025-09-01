// 🐱 V1 API routes
import { Router } from 'express';

const v1ApiRoutes = Router();

// 🐱 Root V1 API endpoint
v1ApiRoutes.get('/', (_req, res) => {
  res.status(200).json({
    message: '🐱 Express API Templaten - API V1',
    version: '1.0.0'
  });
});

// 🐱 Export v1 api routes
export default v1ApiRoutes;