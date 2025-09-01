# 🐱 API Documentation

This document provides comprehensive documentation for all available API endpoints in the Express API Template.

## Base URL

```
http://localhost:3000
```

## Response Format

All API responses follow a standardized format defined by the `ResponseBody` interface:

```typescript
interface ResponseBody<T = unknown, M = Record<string, unknown>> {
  status: 'ok' | 'error' | 'warning' | 'healthy' | 'unhealthy';
  statusCode: number;
  message: string;
  payload?: T;
  timestamp: string; // ISO 8601
  metadata?: M;
}
```

## Authentication

Currently, no authentication is required. This template is ready for you to add authentication middleware as needed.

## Rate Limiting

Rate limiting is configured but not yet implemented. The configuration is available in `src/utils/app-info.ts`.

## Endpoints

### Root Endpoints

#### GET /

Get application information.

**Response:**
```json
{
  "status": "ok",
  "statusCode": 200,
  "message": "🐱 Express API Template",
  "payload": {
    "version": "1.0.0",
    "endpoints": {
      "health": "/health",
      "api": "/api"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### GET /health

Health check endpoint for monitoring and load balancers.

**Response:**
```json
{
  "status": "healthy",
  "statusCode": 200,
  "message": "🐱 Express API Template",
  "payload": {
    "version": "1.0.0",
    "endpoints": {
      "health": "/health",
      "api": "/api"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### API Endpoints

#### GET /api

Get API information, versioning details, and available endpoints.

**Response:**
```json
{
  "status": "ok",
  "statusCode": 200,
  "message": "🐱 Express API Template",
  "payload": {
    "version": "1.0.0",
    "endpoints": {
      "v1": "/v1",
      "v2": "/v2"
    },
    "supportedVersions": ["v1"],
    "deprecatedVersions": [],
    "versioningStrategy": "URL path versioning",
    "documentation": {
      "swagger": "/api/docs",
      "postman": "/api/postman-collection"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### GET /api/v1

Get Version 1 API information.

**Response:**
```json
{
  "status": "ok",
  "statusCode": 200,
  "message": "🐱 Express API Template - API V1",
  "payload": {
    "version": "1.0.0"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Responses

### 404 Not Found

When a resource is not found:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "The requested resource was not found",
  "payload": {
    "path": "/nonexistent-endpoint"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 500 Internal Server Error

When an internal server error occurs:

**Development:**
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Detailed error message",
  "payload": {
    "error": "TypeError",
    "stack": "Error stack trace..."
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Production:**
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Something went wrong",
  "payload": {
    "error": "InternalServerError"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Request Headers

### Content-Type

For requests with body data:
```
Content-Type: application/json
```

### User-Agent

Recommended to include:
```
User-Agent: YourApp/1.0.0
```

## Response Headers

### Security Headers

The API includes security headers via Helmet:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (HTTPS only)

### CORS Headers

CORS is enabled for all origins in development:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Versioning

The API uses URL path versioning:

- `v1` - Current stable version
- `v2` - Future version (placeholder)

### Version Lifecycle

1. **Development** - New features added to current version
2. **Stable** - Version is production-ready
3. **Deprecated** - Version marked for removal (6-month notice)
4. **Retired** - Version no longer available

## Examples

### Using curl

**Get application info:**
```bash
curl -X GET http://localhost:3000/ \
  -H "Content-Type: application/json"
```

**Health check:**
```bash
curl -X GET http://localhost:3000/health \
  -H "Content-Type: application/json"
```

**API information:**
```bash
curl -X GET http://localhost:3000/api \
  -H "Content-Type: application/json"
```

### Using JavaScript/TypeScript

```typescript
// Using fetch API
const response = await fetch('http://localhost:3000/api/v1');
const data = await response.json();

// Using axios
import axios from 'axios';
const { data } = await axios.get('http://localhost:3000/api/v1');
```

### Using Python

```python
import requests

response = requests.get('http://localhost:3000/api/v1')
data = response.json()
```

## SDKs and Tools

### Postman Collection

Import the Postman collection (when available) from:
```
GET /api/postman-collection
```

### OpenAPI/Swagger

API documentation (when available) at:
```
GET /api/docs
```

## Support

For API support and questions:

1. Check this documentation
2. Review the [Architecture Guide](../architecture/)
3. Check the source code in `src/routes/`
4. Open an issue in the repository

---

**🐱 Ready to build amazing APIs!**
