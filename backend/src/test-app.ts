import express from 'express';
import { createMockUser, createMockClassroom, createMockCommunity, createMockPost } from './test/helpers';
import logger from './config/logger';

const app = express();
app.use(express.json());

// Create mock data
const mockInstructor = createMockUser({
  role: 'instructor',
  username: 'test.instructor',
  email: 'instructor@test.com'
});

const mockClassroom = createMockClassroom({
  instructor: mockInstructor
});

const mockCommunity = createMockCommunity();

const mockPost = createMockPost({
  author: mockInstructor
});

// Test routes
app.get('/test/classroom', (req, res) => {
  try {
    // Return mock classroom data
    res.json({
      created: mockClassroom,
      retrieved: mockClassroom,
      updated: {
        ...mockClassroom,
        description: 'Updated description',
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Classroom test failed:', error);
    res.status(500).json({ error: 'Classroom test failed' });
  }
});

app.get('/test/community', (req, res) => {
  try {
    // Return mock community data
    res.json({
      created: mockCommunity,
      retrieved: mockCommunity,
      updated: {
        ...mockCommunity,
        description: 'Updated description',
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Community test failed:', error);
    res.status(500).json({ error: 'Community test failed' });
  }
});

app.get('/test/post', (req, res) => {
  try {
    // Return mock post data
    res.json({
      created: mockPost,
      retrieved: mockPost,
      liked: {
        ...mockPost,
        likes: mockPost.likes + 1,
        updatedAt: new Date().toISOString()
      },
      unliked: {
        ...mockPost,
        likes: mockPost.likes,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Post test failed:', error);
    res.status(500).json({ error: 'Post test failed' });
  }
});

// Add a root route for easy testing
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Test App</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
          .endpoint h2 { margin-top: 0; }
          button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
          button:hover { background: #0056b3; }
          pre { background: #eee; padding: 10px; border-radius: 5px; }
          #result { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Educational Platform Test App</h1>
        <div class="endpoint">
          <h2>Test Classroom Service</h2>
          <button onclick="testEndpoint('/test/classroom')">Test Classroom</button>
        </div>
        <div class="endpoint">
          <h2>Test Community Service</h2>
          <button onclick="testEndpoint('/test/community')">Test Community</button>
        </div>
        <div class="endpoint">
          <h2>Test Post Service</h2>
          <button onclick="testEndpoint('/test/post')">Test Post</button>
        </div>
        <div id="result"></div>
        <script>
          async function testEndpoint(endpoint) {
            try {
              const response = await fetch(endpoint);
              const data = await response.json();
              document.getElementById('result').innerHTML = '<h3>Result:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
              document.getElementById('result').innerHTML = '<h3>Error:</h3><pre>' + error.message + '</pre>';
            }
          }
        </script>
      </body>
    </html>
  `);
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  logger.info(`Test app running at http://localhost:${PORT}`);
  logger.info('Visit http://localhost:8000 to test the services');
});