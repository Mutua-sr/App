import { Request, Response } from 'express';

// Base document type for all entities
export interface BaseDocument {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User extends BaseDocument {
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

// Classroom types
export interface Classroom extends BaseDocument {
  name: string;
  instructor: User;
  description: string;
  students: number;
  progress: number;
  nextClass?: string;
  assignments: number;
  topics: string[];
}

export interface CreateClassroomInput {
  name: string;
  description: string;
  topics: string[];
  instructor: User;
}

export interface UpdateClassroomInput {
  name?: string;
  description?: string;
  topics?: string[];
  progress?: number;
  nextClass?: string;
  assignments?: number;
  students?: number;
}

// Community types
export interface Community extends BaseDocument {
  name: string;
  description: string;
  members: number;
  topics: string[];
}

export interface CreateCommunityInput {
  name: string;
  description: string;
  topics: string[];
}

export interface UpdateCommunityInput {
  name?: string;
  description?: string;
  topics?: string[];
  members?: number;
}

// Post types
export interface Post extends BaseDocument {
  author: User;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
}

export interface CreatePostInput {
  title: string;
  content: string;
  tags: string[];
  author: User;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
}

// Chat types
export interface ChatMessage extends BaseDocument {
  sender: User;
  content: string;
  communityId?: string;
  classroomId?: string;
}

// Database types
export interface CouchDBDocument {
  _id: string;
  _rev: string;
  type: string;
}

export interface DatabaseConfig {
  url: string;
  username: string;
  password: string;
  dbName: string;
}

// Query options
export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 'asc' | 'desc'>;
}

// Context type for Apollo Server
export interface Context {
  req: Request;
  res: Response;
  user?: User;
}

// View functions for CouchDB
export type ViewFunction = (doc: any) => void;

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
}