import { PostService } from '../post.service';
import { DatabaseService } from '../database';
import { createMockPost, createMockUser } from '../../test/helpers';
import { Post, CreatePostInput } from '../../types';

// Mock the database service
jest.mock('../database');

describe('PostService', () => {
  const mockAuthor = createMockUser({
    id: '1',
    role: 'student'
  });

  const mockPost = createMockPost({
    id: '1',
    author: mockAuthor
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const input: CreatePostInput = {
        title: 'Test Post',
        content: 'Test Content',
        tags: ['test'],
        author: mockAuthor
      };

      (DatabaseService.create as jest.Mock).mockResolvedValue({
        _id: '1',
        _rev: '1-123',
        ...input
      });

      const result = await PostService.create(input);

      expect(DatabaseService.create).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(input.title);
      expect(result.content).toBe(input.content);
      expect(result.tags).toEqual(input.tags);
      expect(result.likes).toBe(0);
      expect(result.comments).toBe(0);
    });

    it('should handle creation errors', async () => {
      const input: CreatePostInput = {
        title: 'Test Post',
        content: 'Test Content',
        tags: ['test'],
        author: mockAuthor
      };

      (DatabaseService.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(PostService.create(input)).rejects.toThrow('Failed to create post');
    });
  });

  describe('getById', () => {
    it('should return a post by id', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(mockPost);

      const result = await PostService.getById('1');

      expect(DatabaseService.read).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPost);
    });

    it('should return null for non-existent post', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(null);

      const result = await PostService.getById('999');

      expect(DatabaseService.read).toHaveBeenCalledWith('999');
      expect(result).toBeNull();
    });

    it('should handle read errors', async () => {
      (DatabaseService.read as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(PostService.getById('1')).rejects.toThrow('Failed to get post');
    });
  });

  describe('list', () => {
    it('should return a list of posts', async () => {
      const mockPosts = [mockPost];
      (DatabaseService.find as jest.Mock).mockResolvedValue(mockPosts);

      const result = await PostService.list();

      expect(DatabaseService.find).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });

    it('should handle pagination parameters', async () => {
      const options = { page: 2, limit: 10 };
      await PostService.list(options);

      expect(DatabaseService.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: (options.page - 1) * options.limit,
          limit: options.limit
        })
      );
    });

    it('should handle list errors', async () => {
      (DatabaseService.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(PostService.list()).rejects.toThrow('Failed to list posts');
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const updateData = {
        title: 'Updated Post',
        content: 'Updated Content'
      };

      (DatabaseService.update as jest.Mock).mockResolvedValue({
        ...mockPost,
        ...updateData
      });

      const result = await PostService.update('1', updateData);

      expect(DatabaseService.update).toHaveBeenCalledWith('1', expect.objectContaining(updateData));
      expect(result.title).toBe(updateData.title);
      expect(result.content).toBe(updateData.content);
    });

    it('should handle update errors', async () => {
      (DatabaseService.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(PostService.update('1', { title: 'Updated' })).rejects.toThrow('Failed to update post');
    });
  });

  describe('like and unlike', () => {
    it('should increment likes count', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(mockPost);
      (DatabaseService.update as jest.Mock).mockResolvedValue({
        ...mockPost,
        likes: 1
      });

      const result = await PostService.like('1');

      expect(result.likes).toBe(1);
    });

    it('should decrement likes count', async () => {
      const postWithLikes = { ...mockPost, likes: 1 };
      (DatabaseService.read as jest.Mock).mockResolvedValue(postWithLikes);
      (DatabaseService.update as jest.Mock).mockResolvedValue({
        ...postWithLikes,
        likes: 0
      });

      const result = await PostService.unlike('1');

      expect(result.likes).toBe(0);
    });

    it('should not allow negative likes', async () => {
      const postWithNoLikes = { ...mockPost, likes: 0 };
      (DatabaseService.read as jest.Mock).mockResolvedValue(postWithNoLikes);
      (DatabaseService.update as jest.Mock).mockResolvedValue(postWithNoLikes);

      const result = await PostService.unlike('1');

      expect(result.likes).toBe(0);
    });
  });

  describe('search', () => {
    it('should search posts by query', async () => {
      const mockPosts = [mockPost];
      (DatabaseService.find as jest.Mock).mockResolvedValue(mockPosts);

      const result = await PostService.search('test');

      expect(DatabaseService.find).toHaveBeenCalledWith(
        expect.objectContaining({
          selector: {
            type: 'post',
            $or: expect.any(Array)
          }
        })
      );
      expect(result).toEqual(mockPosts);
    });

    it('should handle search errors', async () => {
      (DatabaseService.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(PostService.search('test')).rejects.toThrow('Failed to search posts');
    });
  });
});