import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../types';
import logger from '../config/logger';

// TODO: Replace with proper JWT verification
const verifyToken = async (token: string): Promise<User | null> => {
  try {
    // Mock user for development
    if (process.env.NODE_ENV !== 'production') {
      return {
        id: '1',
        type: 'user',
        username: 'testuser',
        email: 'test@example.com',
        role: 'student' as UserRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    // TODO: Implement actual JWT verification
    return null;
  } catch (error) {
    logger.error('Token verification failed:', error);
    return null;
  }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }

    const user = await verifyToken(token);
    if (user) {
      (req as any).user = user;
    }

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    next();
  }
};

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    next();
  } catch (error) {
    logger.error('Authorization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const requireRole = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user as User;
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      logger.error('Role verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

export const getUser = (req: Request): User | null => {
  return (req as any).user || null;
};

export default {
  authenticate,
  requireAuth,
  requireRole,
  getUser
};