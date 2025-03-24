import axios from 'axios';

const COUCHDB_URL = 'http://localhost:5984'; // Replace with the actual remote CouchDB URL
const DB_NAME = 'eduapp';

// CouchDB authentication credentials
const AUTH = {
  username: 'Meshack',
  password: '3.FocusMode'
};

// Create axios instance with authentication
const couchdbClient = axios.create({
  baseURL: COUCHDB_URL,
  auth: AUTH,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tag categories mapping
const tagCategories: Record<string, string> = {
  'react': 'Web Development',
  'javascript': 'Web Development',
  'typescript': 'Web Development',
  'python': 'Programming',
  'java': 'Programming',
  'machine-learning': 'AI & Data Science',
  'ai': 'AI & Data Science',
  'ui': 'Design',
  'ux': 'Design',
  'design': 'Design',
  'database': 'Backend',
  'api': 'Backend',
};

const getTagCategory = (tag: string): string => {
  const lowercaseTag = tag.toLowerCase();
  return tagCategories[lowercaseTag] || 'Other';
};

// Initialize database if it doesn't exist
export const initializeDatabase = async () => {
  try {
    await couchdbClient.put(`/${DB_NAME}`);
  } catch (error: any) {
    // Database already exists (error code 412) is okay
    if (error.response?.status !== 412) {
      console.error('Error initializing database:', error);
    }
  }
};

// Feed-related functions
export const feedService = {
  // Get posts with pagination
  getPosts: async (page: number, limit: number = 10) => {
    try {
      const skip = (page - 1) * limit;
      const response = await couchdbClient.post(`/${DB_NAME}/_find`, {
        selector: {
          type: 'post',
        },
        sort: [{ timestamp: 'desc' }],
        skip,
        limit,
      });
      return response.data.docs;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Create a new post
  createPost: async (post: any) => {
    try {
      const document = {
        ...post,
        type: 'post',
        timestamp: new Date().toISOString(),
      };
      const response = await couchdbClient.post(`/${DB_NAME}`, document);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get trending topics
  getTrendingTopics: async () => {
    try {
      const response = await couchdbClient.post(`/${DB_NAME}/_find`, {
        selector: {
          type: 'post',
        },
        fields: ['tags'],
      });
      
      // Process tags to get trending topics
      const tagCounts = new Map<string, number>();
      response.data.docs.forEach((doc: any) => {
        doc.tags?.forEach((tag: string) => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });

      // Convert to array and sort by count
      const trendingTopics = Array.from(tagCounts.entries())
        .map(([tag, count]) => ({
          tag,
          count,
          category: getTagCategory(tag)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Get top 10 topics

      return trendingTopics;
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      throw error;
    }
  },

  // Search posts
  searchPosts: async (query: string) => {
    try {
      const response = await couchdbClient.post(`/${DB_NAME}/_find`, {
        selector: {
          type: 'post',
          $or: [
            { title: { $regex: `(?i)${query}` } },
            { content: { $regex: `(?i)${query}` } },
            { tags: { $elemMatch: { $regex: `(?i)${query}` } } },
          ],
        },
      });
      return response.data.docs;
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  },
};

// Initialize database when the service is imported
initializeDatabase();

export default feedService;