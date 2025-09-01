// 🐱 V1 API routes
import { Router } from 'express';
// 🐱 Import app info
import { apiInfoV1 } from '../../../utils/app-info.js';

const v1ApiRoutes = Router();

// 🐱 Root V1 API endpoint
v1ApiRoutes.get('/', (_req, res) => {
    res.status(200).json({
        message: apiInfoV1.name,
        version: apiInfoV1.version
    });
});

// 🐱 Export v1 api routes
export default v1ApiRoutes;