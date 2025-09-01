import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 🐱 Load environment variables
dotenv.config();

// 🐱 Import routes
import rootRouter from './routes/index.js';

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
  res.status(404).json({ 
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// 🐱 Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('🐱 Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// 🐱 Start server function
export const startServer = (): void => {
  app.listen(PORT, (): void => {
    console.log(`🐱 Server running on http://localhost:${PORT}`);
    console.log(`🐱 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

export default app;
