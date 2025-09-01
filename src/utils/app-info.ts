// 🐱 Application metadata and configuration
export const appInfo = {
  name: '🐱 Express API Template',
  version: '1.0.0',
  description: 'A modern TypeScript Express.js API template with ES2022 modules',
  author: 'HexaCombAI',
  license: 'MIT',
  repository: 'https://github.com/HexaCombAI/ExpressAPI-template',
  keywords: ['express', 'typescript', 'api', 'template', 'nodejs', 'es2022'],
  engines: {
    node: '>=18.0.0'
  }
};

// 🐱 API versioning configuration
export const apiInfo = {
  name: '🐱 Express API Template',
  version: '1.0.0',
  description: 'RESTful API with versioning support',
  baseUrl: '/api',
  versionEndpoints: {
    v1: '/v1',
    v2: '/v2' // Future version
  },
  supportedVersions: ['v1'],
  deprecatedVersions: [],
  versioningStrategy: 'URL path versioning',
  documentation: {
    swagger: '/api/docs',
    postman: '/api/postman-collection'
  }
};

// 🐱 API V1 specific configuration
export const apiInfoV1 = {
  name: '🐱 Express API Template - API V1',
  version: '1.0.0',
  rootEndpoint: '/v1',
  description: 'First version of the Express API Template',
  releaseDate: '2024-01-01',
  status: 'stable',
  endpoints: [
    {
      path: '/',
      method: 'GET',
      description: 'Root endpoint for API V1',
    },
    {
      path: '/health',
      method: 'GET',
      description: 'Health check endpoint'
    },
    {
      path: '/info',
      method: 'GET',
      description: 'API information endpoint'
    }
  ]
};