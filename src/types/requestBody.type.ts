// 🐱 Request body type

// 🐱 Import Timestamp type
import { Timestamp } from './date.type.js';

// 🐱 Request body type
export interface RequestBody<T = unknown, M = Record<string, unknown>> {
    payload: T;              // always required, keeps it simple
    timestamp?: Timestamp;   // optional, server can add if needed
    metadata?: M;            // optional extra info
  }