import { ClassroomService } from '../classroom.service';
import { DatabaseService } from '../database';
import { createMockUser, createMockClassroom, mockDatabaseResponse } from '../../test/helpers';
import { Classroom, CreateClassroomInput } from '../../types';

// Mock the database service
jest.mock('../database');

describe('ClassroomService', () => {
  const mockInstructor = createMockUser({ 
    id: '1',
    role: 'instructor'
  });

  const mockClassroom = createMockClassroom({
    id: '1',
    instructor: mockInstructor
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new classroom', async () => {
      const input: CreateClassroomInput = {
        name: 'Test Classroom',
        description: 'Test Description',
        instructor: mockInstructor,
        topics: ['test']
      };

      (DatabaseService.create as jest.Mock).mockResolvedValue(
        mockDatabaseResponse(mockClassroom)
      );

      const result = await ClassroomService.create(input);

      expect(DatabaseService.create).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(input.name);
      expect(result.description).toBe(input.description);
      expect(result.topics).toEqual(input.topics);
    });

    it('should handle creation errors', async () => {
      const input: CreateClassroomInput = {
        name: 'Test Classroom',
        description: 'Test Description',
        instructor: mockInstructor,
        topics: ['test']
      };

      (DatabaseService.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ClassroomService.create(input)).rejects.toThrow('Failed to create classroom');
    });
  });

  describe('getById', () => {
    it('should return a classroom by id', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(mockClassroom);

      const result = await ClassroomService.getById('1');

      expect(DatabaseService.read).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockClassroom);
    });

    it('should return null for non-existent classroom', async () => {
      (DatabaseService.read as jest.Mock).mockResolvedValue(null);

      const result = await ClassroomService.getById('999');

      expect(DatabaseService.read).toHaveBeenCalledWith('999');
      expect(result).toBeNull();
    });

    it('should handle read errors', async () => {
      (DatabaseService.read as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ClassroomService.getById('1')).rejects.toThrow('Failed to get classroom');
    });
  });

  describe('list', () => {
    it('should return a list of classrooms', async () => {
      const mockClassrooms = [mockClassroom];
      (DatabaseService.find as jest.Mock).mockResolvedValue(mockClassrooms);

      const result = await ClassroomService.list();

      expect(DatabaseService.find).toHaveBeenCalled();
      expect(result).toEqual(mockClassrooms);
    });

    it('should handle pagination parameters', async () => {
      const page = 2;
      const limit = 10;
      await ClassroomService.list(page, limit);

      expect(DatabaseService.find).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: (page - 1) * limit,
          limit
        })
      );
    });

    it('should handle list errors', async () => {
      (DatabaseService.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ClassroomService.list()).rejects.toThrow('Failed to list classrooms');
    });
  });

  describe('update', () => {
    it('should update a classroom', async () => {
      const updateData = {
        name: 'Updated Classroom',
        description: 'Updated Description'
      };

      (DatabaseService.update as jest.Mock).mockResolvedValue({
        ...mockClassroom,
        ...updateData
      });

      const result = await ClassroomService.update('1', updateData);

      expect(DatabaseService.update).toHaveBeenCalledWith('1', expect.objectContaining(updateData));
      expect(result.name).toBe(updateData.name);
      expect(result.description).toBe(updateData.description);
    });

    it('should handle update errors', async () => {
      (DatabaseService.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ClassroomService.update('1', { name: 'Updated' })).rejects.toThrow('Failed to update classroom');
    });
  });

  describe('delete', () => {
    it('should delete a classroom', async () => {
      (DatabaseService.delete as jest.Mock).mockResolvedValue(true);

      const result = await ClassroomService.delete('1');

      expect(DatabaseService.delete).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });

    it('should handle delete errors', async () => {
      (DatabaseService.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(ClassroomService.delete('1')).rejects.toThrow('Failed to delete classroom');
    });
  });
});