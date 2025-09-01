// 🐱 V1 API routes
import { Router } from 'express';
import type { SuccessResponseBody } from '../../../types/responseBody.type.js';
// 🐱 Import app info
import { apiInfoV1 } from '../../../utils/app-info.js';
// 🐱 Import date utilities
import { getCurrentISODate } from '../../../types/date.type.js';

const v1ApiRoutes = Router();

// 🐱 Root V1 API endpoint
v1ApiRoutes.get('/', (_req, res) => {
    const response: SuccessResponseBody<{ version: string }> = {
        status: 'ok',
        statusCode: 200,
        message: apiInfoV1.name,
        payload: {
            version: apiInfoV1.version
        },
        timestamp: getCurrentISODate()
    };
    res.status(200).json(response);
});

// 🐱 Export v1 api routes
export default v1ApiRoutes;