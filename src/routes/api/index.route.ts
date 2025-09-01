// 🐱 API routes
import { Router } from 'express';

const apiRoutes = Router();

// 🐱 Import api routes
import v1ApiRoutes from './v1/index.route.js';

// 🐱 Import api info
import { apiInfo } from '../../utils/app-info.js';

// 🐱 API root endpoint
apiRoutes.get('/', (_req, res) => {
  res.status(200).json({
    message: apiInfo.name,
    version: apiInfo.version,
    endpoints: apiInfo.versionEndpoints,
    supportedVersions: apiInfo.supportedVersions,
    deprecatedVersions: apiInfo.deprecatedVersions,
    versioningStrategy: apiInfo.versioningStrategy,
    documentation: apiInfo.documentation
  });
});

// 🐱 V1 API endpoint
apiRoutes.use('/v1', v1ApiRoutes);

// 🐱 Export api route
export default apiRoutes;