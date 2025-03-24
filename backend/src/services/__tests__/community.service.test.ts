import { CommunityService } from '../community.service';
import { DatabaseService } from '../database';
import { createMockCommunity } from '../../test/helpers';
import { Community, CreateCommunityInput } from '../../types';

// Mock the database service
jest.mock('../database');

describe('CommunityService', () => {
  const mockCommunity = createMockCommunity({
    id: '1'
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new community', async () => {
      const input: CreateCommunityInput = {
        name: 'Test Community',
        description: 'Test Description',
        topics: ['test']
      };

      (DatabaseService.create as jest.Mock).mockResolvedValue({
        _id: '1',
        _rev: '1-123',
        ...input
      });

      const result = await CommunityService.create(input);

      expect(DatabaseService.create).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(input.name);
      expect(result.description).toBe(input.description);
      expect(result.topics).toEqual(input.topics);
      expect(result.members).toBe(1); // Should start with 1 member
    });

    it('should handle creation errors', async () => {
      const input: CreateCommunityInput = {
        name: 'Test Community',
        description: 'Test Description',
        topics: ['test']
      };

      (DatabaseService.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.create(input)).rejects.toThrow('Failed to create community');
    });
  });

  describe('getById', () => {
    it('should return a community by id', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(mockCommunity);

      const result = await CommunityService.getById('1');

      expect(DatabaseService.read).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCommunity);
    });

    it('should return null for non-existent community', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(null);

      const result = await CommunityService.getById('999');

      expect(DatabaseService.read).toHaveBeenCalledWith('999');
      expect(result).toBeNull();
    });

    it('should handle read errors', async () => {
      (DatabaseService.read as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.getById('1')).rejects.toThrow('Failed to get community');
    });
  });

  describe('list', () => {
    it('should return a list of communities', async () => {
      const mockCommunities = [mockCommunity];
      (DatabaseService.find as jest.Mock).mockResolvedValue(mockCommunities);

      const result = await CommunityService.list();

      expect(DatabaseService.find).toHaveBeenCalled();
      expect(result).toEqual(mockCommunities);
    });

    it('should handle pagination parameters', async () => {
      const page = 2;
      const limit = 10;
      await CommunityService.list(page, limit);

      expect(DatabaseService.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: (page - 1) * limit,
          limit
        })
      );
    });

    it('should handle list errors', async () => {
      (DatabaseService.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.list()).rejects.toThrow('Failed to list communities');
    });
  });

  describe('update', () => {
    it('should update a community', async () => {
      const updateData = {
        name: 'Updated Community',
        description: 'Updated Description'
      };

      (DatabaseService.update as jest.Mock).mockResolvedValue({
        ...mockCommunity,
        ...updateData
      });

      const result = await CommunityService.update('1', updateData);

      expect(DatabaseService.update).toHaveBeenCalledWith('1', expect.objectContaining(updateData));
      expect(result.name).toBe(updateData.name);
      expect(result.description).toBe(updateData.description);
    });

    it('should handle update errors', async () => {
      (DatabaseService.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.update('1', { name: 'Updated' })).rejects.toThrow('Failed to update community');
    });
  });

  describe('delete', () => {
    it('should delete a community', async () => {
      (DatabaseService.delete as jest.Mock).mockResolvedValue(true);

      const result = await CommunityService.delete('1');

      expect(DatabaseService.delete).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });

    it('should handle delete errors', async () => {
      (DatabaseService.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.delete('1')).rejects.toThrow('Failed to delete community');
    });
  });

  describe('getByTopic', () => {
    it('should return communities by topic', async () => {
      const mockCommunities = [mockCommunity];
      (DatabaseService.find as jest.Mock).mockResolvedValue(mockCommunities);

      const result = await CommunityService.getByTopic('test');

      expect(DatabaseService.find).toHaveBeenCalledWith(
        expect.objectContaining({
          selector: {
            type: 'community',
            topics: { $elemMatch: { $eq: 'test' } }
          }
        })
      );
      expect(result).toEqual(mockCommunities);
    });

    it('should handle getByTopic errors', async () => {
      (DatabaseService.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.getByTopic('test')).rejects.toThrow('Failed to get communities by topic');
    });
  });

  describe('searchByName', () => {
    it('should search communities by name', async () => {
      const mockCommunities = [mockCommunity];
      (DatabaseService.find as jest.Mock).mockResolvedValue(mockCommunities);

      const result = await CommunityService.searchByName('test');

      expect(DatabaseService.find).toHaveBeenCalledWith(
        expect.objectContaining({
          selector: {
            type: 'community',
            name: {
              $regex: '(?i)test'
            }
          }
        })
      );
      expect(result).toEqual(mockCommunities);
    });

    it('should handle search errors', async () => {
      (DatabaseService.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CommunityService.searchByName('test')).rejects.toThrow('Failed to search communities');
    });
  });
});