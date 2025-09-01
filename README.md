# 🐱 Express API Template

A modern, production-ready TypeScript Express.js API template with ES2022 modules, comprehensive type safety, and standardized response structures.

## 🚀 Features

- **TypeScript ES2022** with strict type checking
- **Express.js** with modern middleware stack
- **Standardized API responses** with comprehensive type safety
- **API versioning** support (v1, v2+)
- **Security** headers with Helmet
- **CORS** support
- **Request logging** with Morgan
- **Environment configuration** with dotenv
- **ESLint** with TypeScript rules
- **Hot reload** development with tsx
- **Structured project** with clear separation of concerns

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HexaCombAI/ExpressAPI-template.git
   cd ExpressAPI-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=3000
   NODE_ENV=development
   ```

## 🏃‍♂️ Quick Start

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Testing
```bash
npm test
npm run test:watch
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── app.ts                 # Express app configuration
├── index.ts              # Application entry point
├── controllers/          # Request handlers (empty - ready for your logic)
├── routes/               # API route definitions
│   ├── index.route.ts    # Root routes
│   └── api/              # API versioned routes
│       ├── index.route.ts
│       └── v1/
│           └── index.route.ts
├── types/                # TypeScript type definitions
│   ├── date.type.ts      # Date utilities and ISO8601 types
│   ├── requestBody.type.ts   # Request body interfaces
│   └── responseBody.type.ts  # Response body interfaces
└── utils/                # Utility functions
    └── app-info.ts       # Application metadata
```

## 🌐 API Endpoints

### Root Endpoints
- `GET /` - Application information
- `GET /health` - Health check endpoint

### API Endpoints
- `GET /api` - API information and versioning
- `GET /api/v1` - Version 1 API root

## 📊 Response Format

All API responses follow a standardized format:

```typescript
{
  "status": "ok" | "error" | "warning" | "healthy" | "unhealthy",
  "statusCode": number,
  "message": string,
  "payload"?: T,
  "timestamp": string, // ISO 8601
  "metadata"?: Record<string, unknown>
}
```

### Success Response Example
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

### Error Response Example
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "The requested resource was not found",
  "payload": {
    "path": "/nonexistent"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Features

- **Helmet** for security headers
- **CORS** configuration
- **Input validation** ready (extend as needed)
- **Error masking** in production
- **Request logging** for monitoring

## 🧪 Type Safety

The template includes comprehensive TypeScript types:

### Response Types
- `SuccessResponseBody<T>` - For successful operations
- `ErrorResponseBody<T>` - For error responses
- `WarningResponseBody<T>` - For warnings
- `HealthyResponseBody<T>` - For health checks
- `UnhealthyResponseBody<T>` - For health failures

### Request Types
- `RequestBody<T>` - For incoming request payloads

### Date Types
- `Timestamp` - ISO 8601 branded type
- `getCurrentISODate()` - Utility for consistent timestamps

## 📚 Documentation

Detailed documentation is available in the `docs/` folder:

- [API Documentation](./docs/api/) - Endpoint specifications
- [Architecture Guide](./docs/architecture/) - Project structure and patterns
- [Development Guide](./docs/development/) - Setup and development workflows

## 🛠️ Development

### Adding New Routes

1. Create route files in `src/routes/api/v1/`
2. Import and use in parent route files
3. Follow the established response patterns

### Adding New Types

1. Add types to `src/types/`
2. Export from appropriate type files
3. Use in route handlers for type safety

### Environment Configuration

The template supports environment-based configuration:

- `development` - Full error details, debug logging
- `production` - Error masking, optimized logging

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run clean` | Clean build directory |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern TypeScript and Express.js
- Follows industry best practices
- Designed for scalability and maintainability

---

**🐱 Happy coding!** This template provides a solid foundation for building robust APIs with TypeScript and Express.js.