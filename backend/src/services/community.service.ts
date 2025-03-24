import { Community, CreateCommunityInput, UpdateCommunityInput } from '../types';
import { DatabaseService } from './database';
import logger from '../config/logger';

export class CommunityService {
  private static readonly TYPE = 'community';

  static async create(input: CreateCommunityInput): Promise<Community> {
    try {
      const now = new Date().toISOString();
      const community = {
        ...input,
        type: this.TYPE,
        members: 1, // Start with creator as first member
        createdAt: now,
        updatedAt: now
      };

      const result = await DatabaseService.create(community);
      return {
        ...community,
        id: result._id
      } as Community;
    } catch (error) {
      logger.error('Error creating community:', error);
      throw new Error('Failed to create community');
    }
  }

  static async getById(id: string): Promise<Community | null> {
    try {
      const community = await DatabaseService.read<Community>(id);
      return community;
    } catch (error) {
      logger.error(`Error getting community ${id}:`, error);
      throw new Error('Failed to get community');
    }
  }

  static async list(page: number = 1, limit: number = 10): Promise<Community[]> {
    try {
      const skip = (page - 1) * limit;
      const query = {
        selector: {
          type: this.TYPE
        },
        sort: [{ createdAt: 'desc' }],
        skip,
        limit
      };

      return await DatabaseService.find<Community>(query);
    } catch (error) {
      logger.error('Error listing communities:', error);
      throw new Error('Failed to list communities');
    }
  }

  static async update(id: string, data: UpdateCommunityInput): Promise<Community> {
    try {
      const updated = await DatabaseService.update<Community>(id, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return updated;
    } catch (error) {
      logger.error(`Error updating community ${id}:`, error);
      throw new Error('Failed to update community');
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return await DatabaseService.delete(id);
    } catch (error) {
      logger.error(`Error deleting community ${id}:`, error);
      throw new Error('Failed to delete community');
    }
  }

  static async getByTopic(topic: string): Promise<Community[]> {
    try {
      const query = {
        selector: {
          type: this.TYPE,
          topics: { $elemMatch: { $eq: topic } }
        },
        sort: [{ createdAt: 'desc' }]
      };

      return await DatabaseService.find<Community>(query);
    } catch (error) {
      logger.error(`Error getting communities for topic ${topic}:`, error);
      throw new Error('Failed to get communities by topic');
    }
  }

  static async updateMembers(id: string, members: number): Promise<Community> {
    try {
      return await this.update(id, { members });
    } catch (error) {
      logger.error(`Error updating members count for community ${id}:`, error);
      throw new Error('Failed to update community members');
    }
  }

  static async searchByName(query: string, page: number = 1, limit: number = 10): Promise<Community[]> {
    try {
      const skip = (page - 1) * limit;
      const searchQuery = {
        selector: {
          type: this.TYPE,
          name: {
            $regex: `(?i)${query}`
          }
        },
        sort: [{ createdAt: 'desc' }],
        skip,
        limit
      };

      return await DatabaseService.find<Community>(searchQuery);
    } catch (error) {
      logger.error(`Error searching communities with query "${query}":`, error);
      throw new Error('Failed to search communities');
    }
  }

  static async addTopic(id: string, topic: string): Promise<Community> {
    try {
      const community = await this.getById(id);
      if (!community) {
        throw new Error('Community not found');
      }

      const updatedTopics = [...new Set([...community.topics, topic])];
      return await this.update(id, { topics: updatedTopics });
    } catch (error) {
      logger.error(`Error adding topic to community ${id}:`, error);
      throw new Error('Failed to add topic to community');
    }
  }

  static async removeTopic(id: string, topic: string): Promise<Community> {
    try {
      const community = await this.getById(id);
      if (!community) {
        throw new Error('Community not found');
      }

      const updatedTopics = community.topics.filter(t => t !== topic);
      return await this.update(id, { topics: updatedTopics });
    } catch (error) {
      logger.error(`Error removing topic from community ${id}:`, error);
      throw new Error('Failed to remove topic from community');
    }
  }
}

export default CommunityService;