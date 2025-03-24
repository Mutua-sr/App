import { Context, CreateClassroomInput, UpdateClassroomInput } from '../../types';
import ClassroomService from '../../services/classroom.service';
import logger from '../../config/logger';

export const classroomResolvers = {
  Query: {
    classroom: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await ClassroomService.getById(id);
      } catch (error) {
        logger.error(`Error in classroom query: ${error}`);
        throw error;
      }
    },

    classrooms: async (_: any, { page, limit }: { page?: number; limit?: number }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await ClassroomService.list(page, limit);
      } catch (error) {
        logger.error(`Error in classrooms query: ${error}`);
        throw error;
      }
    },

    myClassrooms: async (_: any, __: any, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return await ClassroomService.getByInstructor(context.user.id);
      } catch (error) {
        logger.error(`Error in myClassrooms query: ${error}`);
        throw error;
      }
    }
  },

  Mutation: {
    createClassroom: async (_: any, { input }: { input: CreateClassroomInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        if (context.user.role !== 'instructor' && context.user.role !== 'admin') {
          throw new Error('Only instructors can create classrooms');
        }
        return await ClassroomService.create({
          ...input,
          instructor: context.user
        });
      } catch (error) {
        logger.error(`Error in createClassroom mutation: ${error}`);
        throw error;
      }
    },

    updateClassroom: async (_: any, { id, input }: { id: string; input: UpdateClassroomInput }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const classroom = await ClassroomService.getById(id);
        if (!classroom) {
          throw new Error('Classroom not found');
        }
        if (classroom.instructor.id !== context.user.id && context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await ClassroomService.update(id, input);
      } catch (error) {
        logger.error(`Error in updateClassroom mutation: ${error}`);
        throw error;
      }
    },

    deleteClassroom: async (_: any, { id }: { id: string }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const classroom = await ClassroomService.getById(id);
        if (!classroom) {
          throw new Error('Classroom not found');
        }
        if (classroom.instructor.id !== context.user.id && context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await ClassroomService.delete(id);
      } catch (error) {
        logger.error(`Error in deleteClassroom mutation: ${error}`);
        throw error;
      }
    },

    updateClassroomProgress: async (_: any, { id, progress }: { id: string; progress: number }, context: Context) => {
      try {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        const classroom = await ClassroomService.getById(id);
        if (!classroom) {
          throw new Error('Classroom not found');
        }
        if (classroom.instructor.id !== context.user.id && context.user.role !== 'admin') {
          throw new Error('Not authorized');
        }
        return await ClassroomService.updateProgress(id, progress);
      } catch (error) {
        logger.error(`Error in updateClassroomProgress mutation: ${error}`);
        throw error;
      }
    }
  },

  Classroom: {
    // Field resolvers if needed
    instructor: (parent: any) => parent.instructor,
    topics: (parent: any) => parent.topics || [],
    nextClass: (parent: any) => parent.nextClass || null,
    assignments: (parent: any) => parent.assignments || 0,
    progress: (parent: any) => parent.progress || 0,
    students: (parent: any) => parent.students || 0
  }
};

export default classroomResolvers;