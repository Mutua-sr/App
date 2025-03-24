import config from '../config/config';
import logger from '../config/logger';
import { CouchDBDocument } from '../types';

// In-memory storage
const inMemoryDB = new Map<string, any>();
let lastId = 0;

// Mock database service
export const DatabaseService = {
  // Create a document
  async create<T extends { type: string }>(doc: T): Promise<T & CouchDBDocument> {
    try {
      const id = `doc_${++lastId}`;
      const rev = '1-' + Date.now();
      const document = {
        ...doc,
        _id: id,
        _rev: rev,
        type: doc.type,
        createdAt: new Date().toISOString()
      };
      inMemoryDB.set(id, document);
      return document as T & CouchDBDocument;
    } catch (error) {
      logger.error('Error creating document:', error);
      throw new Error('Failed to create document');
    }
  },

  // Read a document by ID
  async read<T>(id: string): Promise<T | null> {
    try {
      const doc = inMemoryDB.get(id) as T & CouchDBDocument;
      if (!doc) return null;
      return {
        ...doc,
        id: doc._id
      } as T;
    } catch (error) {
      logger.error(`Error reading document ${id}:`, error);
      throw new Error('Failed to read document');
    }
  },

  // Update a document
  async update<T extends { type: string }>(id: string, doc: Partial<T>): Promise<T> {
    try {
      const existing = inMemoryDB.get(id);
      if (!existing) throw new Error('Document not found');
      
      const updated = {
        ...existing,
        ...doc,
        _rev: existing._rev + '-' + Date.now(),
        type: existing.type,
        updatedAt: new Date().toISOString()
      };
      inMemoryDB.set(id, updated);
      return {
        ...updated,
        id: updated._id
      } as T;
    } catch (error) {
      logger.error(`Error updating document ${id}:`, error);
      throw new Error('Failed to update document');
    }
  },

  // Delete a document
  async delete(id: string): Promise<boolean> {
    try {
      const result = inMemoryDB.delete(id);
      return result;
    } catch (error) {
      logger.error(`Error deleting document ${id}:`, error);
      throw new Error('Failed to delete document');
    }
  },

  // Find documents using simple query
  async find<T>(query: any): Promise<T[]> {
    try {
      const docs = Array.from(inMemoryDB.values());
      // Basic filtering based on query
      const filtered = docs.filter(doc => {
        for (const [key, value] of Object.entries(query)) {
          if (doc[key] !== value) return false;
        }
        return true;
      });
      return filtered.map(doc => ({
        ...doc,
        id: doc._id
      })) as T[];
    } catch (error) {
      logger.error('Error finding documents:', error);
      throw new Error('Failed to find documents');
    }
  },

  // List documents with pagination
  async list<T>(options: { limit?: number; skip?: number; startkey?: string; endkey?: string } = {}): Promise<T[]> {
    try {
      let docs = Array.from(inMemoryDB.values());
      const { limit = 10, skip = 0 } = options;
      
      docs = docs.slice(skip, skip + limit);
      
      return docs.map(doc => ({
        ...doc,
        id: doc._id
      })) as T[];
    } catch (error) {
      logger.error('Error listing documents:', error);
      throw new Error('Failed to list documents');
    }
  }
};

// Initialize database
export const initializeDatabase = async (): Promise<void> => {
  try {
    logger.info('Mock in-memory database initialized');
  } catch (error) {
    logger.error('Error initializing database:', error);
    throw new Error('Failed to initialize database');
  }
};

export default DatabaseService;