import type { Config } from '@jest/types';
import { jest } from '@jest/globals';
import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.test') });

// Extend timeout
jest.setTimeout(10000);

// Mock CouchDB client
jest.mock('nano', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    use: jest.fn().mockReturnValue({
      insert: jest.fn(),
      get: jest.fn(),
      find: jest.fn(),
      list: jest.fn(),
      destroy: jest.fn()
    }),
    db: {
      create: jest.fn(),
      list: jest.fn()
    }
  })
}));

// Mock logger to prevent console output during tests
jest.mock('../config/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

// Global test configuration
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setup.ts']
};

export default config;