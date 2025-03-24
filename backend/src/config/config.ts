import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 3000,
  couchdb: {
    url: process.env.COUCHDB_URL || 'https://couchdb.blackbox.ai',
    username: process.env.COUCHDB_USERNAME || 'Meshack',
    password: process.env.COUCHDB_PASSWORD || '3.FocusMode',
    dbName: process.env.DB_NAME || 'eduapp'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  }
};

export default config;