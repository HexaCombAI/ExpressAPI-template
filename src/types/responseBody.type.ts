// 🐱 Standardized API response body types
// Provides consistent response structure across all API endpoints

// 🐱 Import Timestamp type
import { Timestamp } from './date.type.js';

// 🐱 Base response body interface with generic payload and metadata
export interface ResponseBody<T = unknown, M = Record<string, unknown>> {
  status: 'ok' | 'error' | 'warning' | 'healthy' | 'unhealthy';
  statusCode: number; // HTTP status code (200, 400, 500, etc.)
  message: string;    // Human-readable response message
  payload?: T;        // Optional response data (generic type)
  timestamp: Timestamp;  // ISO 8601 timestamp (use getCurrentISODate() from date.utils.ts)
  metadata?: M;       // Optional additional response metadata
}

// 🐱 Extract status type for type-safe status-specific responses
type Status = ResponseBody['status'];

// 🐱 Type utility to create status-specific response types
// Ensures type safety when creating responses with specific status values
export type ResponseByStatus<S extends Status, T = unknown, M = Record<string, unknown>> =
  ResponseBody<T, M> & { status: S };

// 🐱 Success response type (status: 'ok')
// Used for successful operations (GET, POST, PUT, DELETE)
export type SuccessResponseBody<T = unknown, M = Record<string, unknown>> =
  ResponseByStatus<'ok', T, M>;

// 🐱 Error response type (status: 'error')
// Used for client errors (4xx) and server errors (5xx)
export type ErrorResponseBody<T = unknown, M = Record<string, unknown>> =
  ResponseByStatus<'error', T, M>;

// 🐱 Warning response type (status: 'warning')
// Used for successful operations with warnings or deprecation notices
export type WarningResponseBody<T = unknown, M = Record<string, unknown>> =
  ResponseByStatus<'warning', T, M>;

// 🐱 Health check success type (status: 'healthy')
// Used specifically for health check endpoints
export type HealthyResponseBody<T = unknown, M = Record<string, unknown>> =
  ResponseByStatus<'healthy', T, M>;

// 🐱 Health check failure type (status: 'unhealthy')
// Used when health checks fail or services are down
export type UnhealthyResponseBody<T = unknown, M = Record<string, unknown>> =
  ResponseByStatus<'unhealthy', T, M>;

// 🐱 Union type of all possible response body types
// Useful for function parameters that accept any response type
export type AnyResponseBody<T = unknown, M = Record<string, unknown>> =
  | SuccessResponseBody<T, M>
  | ErrorResponseBody<T, M>
  | WarningResponseBody<T, M>
  | HealthyResponseBody<T, M>
  | UnhealthyResponseBody<T, M>;