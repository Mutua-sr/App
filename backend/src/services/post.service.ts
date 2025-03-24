import { Post, CreatePostInput, UpdatePostInput, QueryOptions } from '../types';
import { DatabaseService } from './database';
import logger from '../config/logger';

export class PostService {
  private static readonly TYPE = 'post';

  static async create(input: CreatePostInput): Promise<Post> {
    try {
      const now = new Date().toISOString();
      const post = {
        ...input,
        type: this.TYPE,
        likes: 0,
        comments: 0,
        createdAt: now,
        updatedAt: now
      };

      const result = await DatabaseService.create(post);
      return {
        ...post,
        id: result._id
      } as Post;
    } catch (error) {
      logger.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  static async getById(id: string): Promise<Post | null> {
    try {
      const post = await DatabaseService.read<Post>(id);
      return post;
    } catch (error) {
      logger.error(`Error getting post ${id}:`, error);
      throw new Error('Failed to get post');
    }
  }

  static async list(options: QueryOptions = {}): Promise<Post[]> {
    try {
      const { page = 1, limit = 10 } = options;
      const skip = (page - 1) * limit;
      const query = {
        selector: {
          type: this.TYPE
        },
        sort: [{ createdAt: 'desc' }],
        skip,
        limit
      };

      return await DatabaseService.find<Post>(query);
    } catch (error) {
      logger.error('Error listing posts:', error);
      throw new Error('Failed to list posts');
    }
  }

  static async update(id: string, data: UpdatePostInput): Promise<Post> {
    try {
      const updated = await DatabaseService.update<Post>(id, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return updated;
    } catch (error) {
      logger.error(`Error updating post ${id}:`, error);
      throw new Error('Failed to update post');
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return await DatabaseService.delete(id);
    } catch (error) {
      logger.error(`Error deleting post ${id}:`, error);
      throw new Error('Failed to delete post');
    }
  }

  static async getByTag(tag: string, options: QueryOptions = {}): Promise<Post[]> {
    try {
      const { page = 1, limit = 10 } = options;
      const skip = (page - 1) * limit;
      const query = {
        selector: {
          type: this.TYPE,
          tags: { $elemMatch: { $eq: tag } }
        },
        sort: [{ createdAt: 'desc' }],
        skip,
        limit
      };

      return await DatabaseService.find<Post>(query);
    } catch (error) {
      logger.error(`Error getting posts for tag ${tag}:`, error);
      throw new Error('Failed to get posts by tag');
    }
  }

  static async getByAuthor(authorId: string, options: QueryOptions = {}): Promise<Post[]> {
    try {
      const { page = 1, limit = 10 } = options;
      const skip = (page - 1) * limit;
      const query = {
        selector: {
          type: this.TYPE,
          'author.id': authorId
        },
        sort: [{ createdAt: 'desc' }],
        skip,
        limit
      };

      return await DatabaseService.find<Post>(query);
    } catch (error) {
      logger.error(`Error getting posts for author ${authorId}:`, error);
      throw new Error('Failed to get posts by author');
    }
  }

  static async like(id: string): Promise<Post> {
    try {
      const post = await this.getById(id);
      if (!post) {
        throw new Error('Post not found');
      }

      return await this.update(id, {
        likes: (post.likes || 0) + 1
      });
    } catch (error) {
      logger.error(`Error liking post ${id}:`, error);
      throw new Error('Failed to like post');
    }
  }

  static async unlike(id: string): Promise<Post> {
    try {
      const post = await this.getById(id);
      if (!post) {
        throw new Error('Post not found');
      }

      return await this.update(id, {
        likes: Math.max(0, (post.likes || 0) - 1)
      });
    } catch (error) {
      logger.error(`Error unliking post ${id}:`, error);
      throw new Error('Failed to unlike post');
    }
  }

  static async search(query: string, options: QueryOptions = {}): Promise<Post[]> {
    try {
      const { page = 1, limit = 10 } = options;
      const skip = (page - 1) * limit;
      const searchQuery = {
        selector: {
          type: this.TYPE,
          $or: [
            { title: { $regex: `(?i)${query}` } },
            { content: { $regex: `(?i)${query}` } },
            { tags: { $elemMatch: { $regex: `(?i)${query}` } } }
          ]
        },
        sort: [{ createdAt: 'desc' }],
        skip,
        limit
      };

      return await DatabaseService.find<Post>(searchQuery);
    } catch (error) {
      logger.error(`Error searching posts with query "${query}":`, error);
      throw new Error('Failed to search posts');
    }
  }
}

export default PostService;