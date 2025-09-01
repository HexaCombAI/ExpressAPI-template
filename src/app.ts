import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import type { ErrorResponseBody } from './types/responseBody.type.js';
import { getCurrentISODate } from './types/date.type.js';

// 🐱 Load environment variables
dotenv.config();

// 🐱 Import routes
import rootRouter from './routes/index.route.js';

// 🐱 Create Express app
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// 🐱 Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS support
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // JSON parsing
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // URL encoding

// 🐱 API routes
app.use('/', rootRouter);

// 🐱 404 handler
app.use('*', (_req: Request, res: Response): void => {
  const response: ErrorResponseBody<{ path: string }> = {
    status: 'error',
    statusCode: 404,
    message: 'The requested resource was not found',
    payload: {
      path: _req.originalUrl
    },
    timestamp: getCurrentISODate()
  };
  res.status(404).json(response);
});

// 🐱 Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('🐱 Error:', err);
  const response: ErrorResponseBody<{ error: string; stack?: string }> = {
    status: 'error',
    statusCode: 500,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    payload: {
      error: err.name,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    },
    timestamp: getCurrentISODate()
  };
  res.status(500).json(response);
});

// 🐱 Start server function
export const startServer = (): void => {
  app.listen(PORT, (): void => {
    console.log(`🐱 Server running on http://localhost:${PORT}`);
    console.log(`🐱 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

export default app;
