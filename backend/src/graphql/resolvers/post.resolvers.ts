import { Context, CreatePostInput, UpdatePostInput, QueryOptions } from '../../types';
import PostService from '../../services/post.service';
import logger from '../../config/logger';

export const postResolvers = {
  Query: {
    post: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await PostService.getById(id);
      } catch (error) {
        logger.error(`Error in post query: ${error}`);
        throw error;
      }
    },

    posts: async (_: any, options: QueryOptions, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await PostService.list(options);
      } catch (error) {
        logger.error(`Error in posts query: ${error}`);
        throw error;
      }
    },

    postsByTag: async (_: any, { tag, ...options }: { tag: string } & QueryOptions, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await PostService.getByTag(tag, options);
      } catch (error) {
        logger.error(`Error in postsByTag query: ${error}`);
        throw error;
      }
    },

    postsByAuthor: async (_: any, { authorId, ...options }: { authorId: string } & QueryOptions, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await PostService.getByAuthor(authorId, options);
      } catch (error) {
        logger.error(`Error in postsByAuthor query: ${error}`);
        throw error;
      }
    },

    searchPosts: async (_: any, { query, ...options }: { query: string } & QueryOptions, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await PostService.search(query, options);
      } catch (error) {
        logger.error(`Error in searchPosts query: ${error}`);
        throw error;
      }
    }
  },

  Mutation: {
    createPost: async (_: any, { input }: { input: CreatePostInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await PostService.create({
          ...input,
          author: context.user
        });
      } catch (error) {
        logger.error(`Error in createPost mutation: ${error}`);
        throw error;
      }
    },

    updatePost: async (_: any, { id, input }: { id: string; input: UpdatePostInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const post = await PostService.getById(id);
        if (!post) {
          throw new Error('Post not found');
        }
        if (post.author.id !== context.user.id && context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await PostService.update(id, input);
      } catch (error) {
        logger.error(`Error in updatePost mutation: ${error}`);
        throw error;
      }
    },

    deletePost: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const post = await PostService.getById(id);
        if (!post) {
          throw new Error('Post not found');
        }
        if (post.author.id !== context.user.id && context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await PostService.delete(id);
      } catch (error) {
        logger.error(`Error in deletePost mutation: ${error}`);
        throw error;
      }
    },

    likePost: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const post = await PostService.getById(id);
        if (!post) {
          throw new Error('Post not found');
        }
        return await PostService.like(id);
      } catch (error) {
        logger.error(`Error in likePost mutation: ${error}`);
        throw error;
      }
    },

    unlikePost: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const post = await PostService.getById(id);
        if (!post) {
          throw new Error('Post not found');
        }
        return await PostService.unlike(id);
      } catch (error) {
        logger.error(`Error in unlikePost mutation: ${error}`);
        throw error;
      }
    }
  },

  Post: {
    // Field resolvers if needed
    author: (parent: any) => parent.author,
    tags: (parent: any) => parent.tags || [],
    likes: (parent: any) => parent.likes || 0,
    comments: (parent: any) => parent.comments || 0
  }
};

export default postResolvers;