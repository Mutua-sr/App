import { Context, CreateCommunityInput, UpdateCommunityInput } from '../../types';
import CommunityService from '../../services/community.service';
import logger from '../../config/logger';

export const communityResolvers = {
  Query: {
    community: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await CommunityService.getById(id);
      } catch (error) {
        logger.error(`Error in community query: ${error}`);
        throw error;
      }
    },

    communities: async (_: any, { page, limit }: { page?: number; limit?: number }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await CommunityService.list(page, limit);
      } catch (error) {
        logger.error(`Error in communities query: ${error}`);
        throw error;
      }
    },

    searchCommunities: async (_: any, { query, page, limit }: { query: string; page?: number; limit?: number }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await CommunityService.searchByName(query, page, limit);
      } catch (error) {
        logger.error(`Error in searchCommunities query: ${error}`);
        throw error;
      }
    }
  },

  Mutation: {
    createCommunity: async (_: any, { input }: { input: CreateCommunityInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await CommunityService.create(input);
      } catch (error) {
        logger.error(`Error in createCommunity mutation: ${error}`);
        throw error;
      }
    },

    updateCommunity: async (_: any, { id, input }: { id: string; input: UpdateCommunityInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const community = await CommunityService.getById(id);
        if (!community) {
          throw new Error('Community not found');
        }
        // TODO: Add proper authorization check based on community roles
        if (context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await CommunityService.update(id, input);
      } catch (error) {
        logger.error(`Error in updateCommunity mutation: ${error}`);
        throw error;
      }
    },

    deleteCommunity: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const community = await CommunityService.getById(id);
        if (!community) {
          throw new Error('Community not found');
        }
        // TODO: Add proper authorization check based on community roles
        if (context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await CommunityService.delete(id);
      } catch (error) {
        logger.error(`Error in deleteCommunity mutation: ${error}`);
        throw error;
      }
    },

    addCommunityTopic: async (_: any, { id, topic }: { id: string; topic: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const community = await CommunityService.getById(id);
        if (!community) {
          throw new Error('Community not found');
        }
        // TODO: Add proper authorization check based on community roles
        if (context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await CommunityService.addTopic(id, topic);
      } catch (error) {
        logger.error(`Error in addCommunityTopic mutation: ${error}`);
        throw error;
      }
    },

    removeCommunityTopic: async (_: any, { id, topic }: { id: string; topic: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const community = await CommunityService.getById(id);
        if (!community) {
          throw new Error('Community not found');
        }
        // TODO: Add proper authorization check based on community roles
        if (context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await CommunityService.removeTopic(id, topic);
      } catch (error) {
        logger.error(`Error in removeCommunityTopic mutation: ${error}`);
        throw error;
      }
    }
  },

  Community: {
    // Field resolvers if needed
    topics: (parent: any) => parent.topics || [],
    members: (parent: any) => parent.members || 0
  }
};

export default communityResolvers;