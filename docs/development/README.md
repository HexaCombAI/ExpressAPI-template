# 🐱 Development Guide

This guide covers development workflows, best practices, and guidelines for contributing to the Express API Template.

## Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Git**
- **VS Code** (recommended) or your preferred editor

### Initial Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/HexaCombAI/ExpressAPI-template.git
   cd ExpressAPI-template
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## Development Workflow

### Daily Development

1. **Start the dev server:**
   ```bash
   npm run dev
   ```
   - Hot reload enabled
   - TypeScript compilation on save
   - Automatic server restart

2. **Code with type safety:**
   - Use TypeScript strict mode
   - Follow existing type patterns
   - Import types explicitly

3. **Test your changes:**
   ```bash
   # Run linter
   npm run lint
   
   # Fix linting issues
   npm run lint:fix
   
   # Build to check compilation
   npm run build
   ```

### File Watching

The development server watches for changes in:
- `src/**/*.ts` - TypeScript source files
- `src/**/*.js` - JavaScript files (if any)

## Code Style Guidelines

### TypeScript Standards

#### 1. Type Imports
```typescript
// ✅ Correct - explicit type import
import type { Request, Response } from 'express';
import { Router } from 'express';

// ❌ Avoid - mixed imports
import { Router, Request, Response } from 'express';
```

#### 2. Function Signatures
```typescript
// ✅ Correct - explicit return types
export const createUser = (userData: UserData): Promise<User> => {
  // implementation
};

// ✅ Correct - void for Express handlers
router.get('/', (_req: Request, res: Response): void => {
  res.json(response);
});
```

#### 3. Response Patterns
```typescript
// ✅ Correct - use typed responses
const response: SuccessResponseBody<UserData> = {
  status: 'ok',
  statusCode: 200,
  message: 'User created successfully',
  payload: userData,
  timestamp: getCurrentISODate()
};
res.status(200).json(response);
```

### Comment Standards

All comments must start with 🐱 emoji:

```typescript
// 🐱 Main application router
const router = Router();

// 🐱 User authentication middleware
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // implementation
};
```

### Naming Conventions

#### Files
- Routes: `*.route.ts`
- Types: `*.type.ts`
- Controllers: `*.controller.ts` (future)
- Services: `*.service.ts` (future)
- Utilities: `*.utils.ts`

#### Variables and Functions
```typescript
// ✅ camelCase for variables and functions
const userController = new UserController();
const getCurrentUser = () => { /* */ };

// ✅ PascalCase for types and classes
interface UserData { }
class UserService { }

// ✅ UPPER_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;
```

## Project Structure Guidelines

### Adding New Routes

1. **Create route file:**
   ```typescript
   // src/routes/api/v1/users.route.ts
   import { Router } from 'express';
   import type { SuccessResponseBody } from '../../../types/responseBody.type.js';
   
   const usersRouter = Router();
   
   // 🐱 Get all users
   usersRouter.get('/', (_req, res) => {
     const response: SuccessResponseBody<User[]> = {
       status: 'ok',
       statusCode: 200,
       message: 'Users retrieved successfully',
       payload: users,
       timestamp: getCurrentISODate()
     };
     res.status(200).json(response);
   });
   
   export default usersRouter;
   ```

2. **Register in parent router:**
   ```typescript
   // src/routes/api/v1/index.route.ts
   import usersRouter from './users.route.js';
   
   v1ApiRoutes.use('/users', usersRouter);
   ```

### Adding New Types

1. **Create type file:**
   ```typescript
   // src/types/user.type.ts
   import type { Timestamp } from './date.type.js';
   
   export interface User {
     id: string;
     email: string;
     name: string;
     createdAt: Timestamp;
     updatedAt: Timestamp;
   }
   
   export interface CreateUserRequest {
     email: string;
     name: string;
     password: string;
   }
   ```

2. **Use in routes:**
   ```typescript
   import type { User, CreateUserRequest } from '../../../types/user.type.js';
   ```

### Adding Controllers (Future Pattern)

```typescript
// src/controllers/user.controller.ts
import type { Request, Response } from 'express';
import type { SuccessResponseBody } from '../types/responseBody.type.js';
import type { User } from '../types/user.type.js';

export class UserController {
  // 🐱 Get all users
  public async getUsers(_req: Request, res: Response): Promise<void> {
    const users = await this.userService.findAll();
    
    const response: SuccessResponseBody<User[]> = {
      status: 'ok',
      statusCode: 200,
      message: 'Users retrieved successfully',
      payload: users,
      timestamp: getCurrentISODate()
    };
    
    res.status(200).json(response);
  }
}
```

## Error Handling Patterns

### Custom Error Types
```typescript
// src/types/error.type.ts
export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### Error Response Handling
```typescript
// In route handlers
try {
  // operation
} catch (error) {
  if (error instanceof ValidationError) {
    const response: ErrorResponseBody<{ field: string; code: string }> = {
      status: 'error',
      statusCode: 400,
      message: error.message,
      payload: {
        field: error.field,
        code: error.code
      },
      timestamp: getCurrentISODate()
    };
    res.status(400).json(response);
  } else {
    // Let global error handler deal with it
    throw error;
  }
}
```

## Testing Guidelines (Future)

### Unit Tests
```typescript
// src/controllers/__tests__/user.controller.test.ts
import { UserController } from '../user.controller.js';

describe('UserController', () => {
  describe('getUsers', () => {
    it('should return users successfully', async () => {
      // Test implementation
    });
  });
});
```

### Integration Tests
```typescript
// src/routes/__tests__/users.route.test.ts
import request from 'supertest';
import app from '../../app.js';

describe('GET /api/v1/users', () => {
  it('should return users list', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect(200);
    
    expect(response.body.status).toBe('ok');
    expect(response.body.payload).toBeInstanceOf(Array);
  });
});
```

## Environment Configuration

### Environment Variables
```bash
# .env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

### Configuration Management
```typescript
// src/config/index.ts
export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret'
  }
};
```

## Build and Deployment

### Development Build
```bash
npm run build
```
- Compiles TypeScript to JavaScript
- Outputs to `dist/` directory
- Includes source maps for debugging

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Support (Future)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## Debugging

### VS Code Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Express App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.ts",
      "runtimeArgs": ["--loader", "tsx/esm"],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

### Debug Logging
```typescript
// Add debug logging
console.log('🐱 Debug:', { variable, context });

// Use structured logging (future)
logger.debug('Operation completed', { userId, operation: 'create' });
```

## Performance Optimization

### TypeScript Compilation
- Use `tsc --build` for incremental compilation
- Configure `tsconfig.json` for optimal performance
- Use project references for large codebases

### Runtime Performance
- Minimize middleware stack
- Use efficient JSON serialization
- Implement response caching where appropriate

## Git Workflow

### Branch Naming
- `feature/user-authentication`
- `bugfix/response-type-error`
- `hotfix/security-vulnerability`

### Commit Messages
```
feat: add user authentication middleware
fix: correct response type for error handlers
docs: update API documentation
refactor: restructure route handlers
```

### Pull Request Process
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Run linting and build
5. Submit PR with clear description

## Common Issues and Solutions

### TypeScript Errors

**Issue: Module not found**
```
Cannot find module './utils/date.utils.js'
```
**Solution:** Use `.js` extension in imports for ES modules:
```typescript
import { getCurrentISODate } from './utils/date.utils.js';
```

**Issue: Type compatibility**
```
Type 'string' is not assignable to type 'ISO8601String'
```
**Solution:** Use the proper utility function:
```typescript
timestamp: getCurrentISODate() // instead of new Date().toISOString()
```

### ESLint Errors

**Issue: Unused variables**
```typescript
// ✅ Prefix with underscore for intentionally unused
const handler = (_req: Request, res: Response) => { };
```

**Issue: Missing return type**
```typescript
// ✅ Add explicit return type
const getUser = (): Promise<User> => { };
```

## Best Practices Summary

### 🐱 Do's
- Use explicit type imports
- Follow the established response patterns
- Add 🐱 comments to all major code blocks
- Use branded types for domain-specific values
- Handle errors consistently
- Write self-documenting code

### 🐱 Don'ts
- Mix type and value imports
- Use `any` type (use `unknown` instead)
- Skip error handling
- Hardcode configuration values
- Ignore TypeScript compiler warnings
- Forget to update documentation

---

**🐱 Happy coding! Follow these guidelines to maintain code quality and consistency across the project.**
