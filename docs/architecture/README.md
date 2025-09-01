# 🐱 Architecture Guide

This document explains the architecture, design patterns, and project structure of the Express API Template.

## Overview

The Express API Template follows a **layered architecture** with clear separation of concerns, promoting maintainability, testability, and scalability.

## Architecture Layers

```
┌─────────────────────────────────────┐
│             Presentation            │
│         (Routes & Middleware)       │
├─────────────────────────────────────┤
│              Business               │
│            (Controllers)            │
├─────────────────────────────────────┤
│               Data                  │
│          (Models & Types)           │
├─────────────────────────────────────┤
│             Utilities               │
│        (Helpers & Config)           │
└─────────────────────────────────────┘
```

## Project Structure

### Root Level
```
ExpressAPI-template/
├── src/                    # Source code
├── dist/                   # Compiled JavaScript (build output)
├── docs/                   # Documentation
├── node_modules/           # Dependencies
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── .eslintignore          # ESLint ignore patterns
├── .gitignore             # Git ignore patterns
└── README.md              # Main documentation
```

### Source Structure
```
src/
├── app.ts                 # Express application setup
├── index.ts              # Application entry point
├── controllers/          # Business logic handlers
├── routes/               # API route definitions
│   ├── index.route.ts    # Root routes
│   └── api/              # Versioned API routes
├── types/                # TypeScript type definitions
├── utils/                # Utility functions and configs
└── middleware/           # Custom middleware (future)
```

## Design Patterns

### 1. Layered Architecture

**Presentation Layer (Routes)**
- Handle HTTP requests/responses
- Route definitions and middleware
- Input validation and sanitization

**Business Layer (Controllers)**
- Business logic implementation
- Data processing and transformation
- Service orchestration

**Data Layer (Types & Models)**
- Data structures and interfaces
- Type definitions and validation
- Future: Database models and repositories

**Utility Layer**
- Cross-cutting concerns
- Configuration management
- Helper functions

### 2. Dependency Injection

The template is structured to support dependency injection:

```typescript
// Future pattern for controllers
export class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger
  ) {}
}
```

### 3. Factory Pattern

Used for creating consistent responses:

```typescript
// Response factory pattern
const createSuccessResponse = <T>(
  message: string,
  payload: T
): SuccessResponseBody<T> => ({
  status: 'ok',
  statusCode: 200,
  message,
  payload,
  timestamp: getCurrentISODate()
});
```

## Core Components

### Application Bootstrap (app.ts)

```typescript
// 🐱 Application setup and configuration
├── Environment loading
├── Middleware registration
├── Route mounting
├── Error handling
└── Server startup
```

**Responsibilities:**
- Express app configuration
- Middleware stack setup
- Global error handling
- Route registration

### Routes (routes/)

```typescript
// 🐱 Route organization
routes/
├── index.route.ts        # Root application routes
└── api/                  # API-specific routes
    ├── index.route.ts    # API root and versioning
    └── v1/               # Version 1 routes
        └── index.route.ts
```

**Design Principles:**
- **Versioning**: URL path-based versioning (`/api/v1`)
- **Modularity**: Each route file handles specific concerns
- **Consistency**: All routes use standardized response types

### Type System (types/)

```typescript
// 🐱 Type organization
types/
├── date.type.ts          # Date utilities and ISO8601 types
├── requestBody.type.ts   # Request payload interfaces
└── responseBody.type.ts  # Response payload interfaces
```

**Type Safety Features:**
- **Branded Types**: ISO8601 dates with compile-time validation
- **Generic Interfaces**: Flexible payload typing
- **Status Types**: Type-safe response status handling

### Utilities (utils/)

```typescript
// 🐱 Utility organization
utils/
└── app-info.ts           # Application metadata and configuration
```

**Configuration Management:**
- Centralized app information
- API versioning configuration
- Feature flags and settings

## Data Flow

### Request Flow
```
HTTP Request
    ↓
Middleware Stack
    ↓
Route Handler
    ↓
Controller (future)
    ↓
Service Layer (future)
    ↓
Response Formation
    ↓
HTTP Response
```

### Error Flow
```
Error Occurrence
    ↓
Error Handler
    ↓
Error Response Formation
    ↓
Client Response
```

## Type Safety Strategy

### 1. Strict TypeScript Configuration

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noImplicitReturns": true
}
```

### 2. Branded Types

```typescript
// ISO8601 branded type prevents string misuse
type ISO8601String = string & { __brand: "ISO8601" };
```

### 3. Generic Response Types

```typescript
// Flexible, type-safe responses
interface ResponseBody<T = unknown, M = Record<string, unknown>> {
  payload?: T;
  metadata?: M;
}
```

## Middleware Stack

### Current Middleware (in order)
1. **Helmet** - Security headers
2. **CORS** - Cross-origin resource sharing
3. **Morgan** - Request logging
4. **Express.json** - JSON body parsing
5. **Express.urlencoded** - URL-encoded body parsing

### Future Middleware Considerations
- Authentication middleware
- Rate limiting
- Request validation
- Compression
- API documentation middleware

## Error Handling Strategy

### Global Error Handler
```typescript
// Centralized error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error
  // Format response
  // Send standardized error response
});
```

### Error Response Structure
- **Development**: Full error details for debugging
- **Production**: Sanitized error messages for security

## API Versioning Strategy

### URL Path Versioning
```
/api/v1/users    # Version 1
/api/v2/users    # Version 2 (future)
```

**Benefits:**
- Clear version identification
- Easy routing and middleware application
- Backward compatibility support

### Version Lifecycle
1. **Development** → **Stable** → **Deprecated** → **Retired**
2. Minimum 6-month deprecation notice
3. Clear migration documentation

## Security Considerations

### Headers
- **X-Content-Type-Options**: Prevent MIME sniffing
- **X-Frame-Options**: Prevent clickjacking
- **X-XSS-Protection**: XSS filtering
- **Strict-Transport-Security**: HTTPS enforcement

### Input Validation
- Type-safe request interfaces
- Runtime validation (future enhancement)
- Sanitization middleware

### Error Handling
- No sensitive information in production errors
- Proper error logging for debugging
- Rate limiting for abuse prevention

## Performance Considerations

### Response Optimization
- Consistent response structure
- Minimal payload overhead
- Efficient JSON serialization

### Caching Strategy (Future)
- Response caching headers
- API response caching
- Static asset optimization

### Monitoring (Future)
- Request/response metrics
- Error rate monitoring
- Performance profiling

## Scalability Patterns

### Horizontal Scaling
- Stateless application design
- Environment-based configuration
- Load balancer friendly

### Vertical Scaling
- Efficient memory usage
- Optimized request handling
- Resource pooling (future)

## Testing Strategy (Future)

### Unit Tests
- Controller logic testing
- Utility function testing
- Type validation testing

### Integration Tests
- Route endpoint testing
- Middleware integration
- Error handling validation

### End-to-End Tests
- Full request/response cycle
- API contract validation
- Performance benchmarking

## Deployment Architecture

### Development
```
Developer Machine
    ↓
npm run dev (tsx watch)
    ↓
Hot Reload Server
```

### Production
```
Source Code
    ↓
TypeScript Compilation
    ↓
Optimized JavaScript
    ↓
Production Server
```

## Future Enhancements

### Planned Features
- [ ] Database integration layer
- [ ] Authentication middleware
- [ ] API documentation generation
- [ ] Request validation middleware
- [ ] Rate limiting implementation
- [ ] Monitoring and metrics
- [ ] Automated testing suite
- [ ] Docker containerization
- [ ] CI/CD pipeline integration

### Extension Points
- **Controllers**: Business logic implementation
- **Services**: External service integration
- **Models**: Data persistence layer
- **Middleware**: Custom request processing
- **Validators**: Input validation logic

---

**🐱 This architecture provides a solid foundation for building scalable, maintainable APIs while remaining flexible for future enhancements.**
