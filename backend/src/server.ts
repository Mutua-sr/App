import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import config from './config/config';
import logger from './config/logger';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { initializeDatabase } from './services/database';
import { Context } from './types';
import { authenticate, getUser } from './middleware/auth';

// Initialize express app
const app = express();

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origin,
    credentials: config.cors.credentials
  }
});

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials
}));
app.use(authenticate);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  // Handle chat messages
  socket.on('chat:message', (message) => {
    logger.info(`Chat message received: ${JSON.stringify(message)}`);
    io.emit('chat:message', message); // Broadcast to all clients
  });

  // Handle classroom events
  socket.on('classroom:join', (classroomId: string) => {
    socket.join(`classroom:${classroomId}`);
    logger.info(`User ${socket.id} joined classroom ${classroomId}`);
  });

  socket.on('classroom:leave', (classroomId: string) => {
    socket.leave(`classroom:${classroomId}`);
    logger.info(`User ${socket.id} left classroom ${classroomId}`);
  });
});

// Start the server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    logger.info('Database initialized successfully');

    // Create Apollo Server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        // Return a sanitized error message in production
        return process.env.NODE_ENV === 'production' 
          ? { message: 'Internal server error' }
          : error;
      },
    });

    // Start Apollo Server
    await apolloServer.start();

    // Apply Apollo middleware
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          // Get authenticated user from request
          const user = getUser(req);
          
          return {
            req,
            res: req.res!,
            user: user || undefined
          };
        }
      })
    );

    // Start HTTP server
    await new Promise<void>((resolve) => httpServer.listen(config.port, resolve));
    
    logger.info(`🚀 Server ready at http://localhost:${config.port}`);
    logger.info(`🚀 GraphQL ready at http://localhost:${config.port}/graphql`);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer().catch((error) => {
  logger.error('Unhandled server error:', error);
  process.exit(1);
});

export default app;