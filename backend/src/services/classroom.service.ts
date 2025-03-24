import { Classroom, CreateClassroomInput, UpdateClassroomInput } from '../types';
import DatabaseService from './database';
import logger from '../config/logger';

export class ClassroomService {
  private static readonly TYPE = 'classroom';

  static async create(input: CreateClassroomInput): Promise<Classroom> {
    try {
      const now = new Date().toISOString();
      const classroom = {
        ...input,
        type: this.TYPE,
        students: 0,
        progress: 0,
        assignments: 0,
        createdAt: now,
        updatedAt: now
      };

      const result = await DatabaseService.create(classroom);
      return {
        ...classroom,
        id: result._id
      } as Classroom;
    } catch (error) {
      logger.error('Error creating classroom:', error);
      throw new Error('Failed to create classroom');
    }
  }

  static async getById(id: string): Promise<Classroom | null> {
    try {
      const classroom = await DatabaseService.read<Classroom>(id);
      return classroom;
    } catch (error) {
      logger.error(`Error getting classroom ${id}:`, error);
      throw new Error('Failed to get classroom');
    }
  }

  static async list(page: number = 1, limit: number = 10): Promise<Classroom[]> {
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

      return await DatabaseService.find<Classroom>(query);
    } catch (error) {
      logger.error('Error listing classrooms:', error);
      throw new Error('Failed to list classrooms');
    }
  }

  static async update(id: string, data: UpdateClassroomInput): Promise<Classroom> {
    try {
      const updated = await DatabaseService.update<Classroom>(id, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return updated;
    } catch (error) {
      logger.error(`Error updating classroom ${id}:`, error);
      throw new Error('Failed to update classroom');
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return await DatabaseService.delete(id);
    } catch (error) {
      logger.error(`Error deleting classroom ${id}:`, error);
      throw new Error('Failed to delete classroom');
    }
  }

  static async getByInstructor(instructorId: string): Promise<Classroom[]> {
    try {
      const query = {
        selector: {
          type: this.TYPE,
          'instructor.id': instructorId
        },
        sort: [{ createdAt: 'desc' }]
      };

      return await DatabaseService.find<Classroom>(query);
    } catch (error) {
      logger.error(`Error getting classrooms for instructor ${instructorId}:`, error);
      throw new Error('Failed to get classrooms by instructor');
    }
  }

  static async getByTopic(topic: string): Promise<Classroom[]> {
    try {
      const query = {
        selector: {
          type: this.TYPE,
          topics: { $elemMatch: { $eq: topic } }
        },
        sort: [{ createdAt: 'desc' }]
      };

      return await DatabaseService.find<Classroom>(query);
    } catch (error) {
      logger.error(`Error getting classrooms for topic ${topic}:`, error);
      throw new Error('Failed to get classrooms by topic');
    }
  }

  static async updateProgress(id: string, progress: number): Promise<Classroom> {
    try {
      return await this.update(id, { progress });
    } catch (error) {
      logger.error(`Error updating progress for classroom ${id}:`, error);
      throw new Error('Failed to update classroom progress');
    }
  }

  static async updateAssignments(id: string, assignments: number): Promise<Classroom> {
    try {
      return await this.update(id, { assignments });
    } catch (error) {
      logger.error(`Error updating assignments for classroom ${id}:`, error);
      throw new Error('Failed to update classroom assignments');
    }
  }

  static async updateNextClass(id: string, nextClass: string): Promise<Classroom> {
    try {
      return await this.update(id, { nextClass });
    } catch (error) {
      logger.error(`Error updating next class for classroom ${id}:`, error);
      throw new Error('Failed to update next class');
    }
  }
}

export default ClassroomService;