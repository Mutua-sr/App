import { User, Classroom, Community, Post, UserRole } from '../types';

export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'test-user-id',
  type: 'user',
  username: 'testuser',
  email: 'test@example.com',
  role: 'student' as UserRole,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
});

export const createMockClassroom = (overrides: Partial<Classroom> = {}): Classroom => ({
  id: 'test-classroom-id',
  type: 'classroom',
  name: 'Test Classroom',
  description: 'Test Description',
  instructor: createMockUser({ role: 'instructor' }),
  students: 0,
  progress: 0,
  assignments: 0,
  topics: ['test-topic'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
});

export const createMockCommunity = (overrides: Partial<Community> = {}): Community => ({
  id: 'test-community-id',
  type: 'community',
  name: 'Test Community',
  description: 'Test Description',
  members: 1,
  topics: ['test-topic'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
});

export const createMockPost = (overrides: Partial<Post> = {}): Post => ({
  id: 'test-post-id',
  type: 'post',
  author: createMockUser(),
  title: 'Test Post',
  content: 'Test Content',
  tags: ['test-tag'],
  likes: 0,
  comments: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
});

export const mockDatabaseResponse = <T extends { id: string }>(data: T) => ({
  _id: data.id,
  _rev: 'test-rev',
  ...data
});

export const mockError = (message: string = 'Database error') => new Error(message);

// Mock CouchDB view functions
export const mockViewFunction = (fn: string) => ({
  toString: () => fn
});

// Mock CouchDB emit function for view testing
export const mockEmit = (key: any, value: any) => ({ key, value });