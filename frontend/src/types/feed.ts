import { Theme } from '@mui/material';

export interface Post {
  _id?: string;
  _rev?: string;
  type: 'post';
  author: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  files?: File[];
}

export interface CreatePostData {
  type: 'post';
  author: string;
  avatar: string;
  title: string;
  content: string;
  tags: string[];
  files?: File[];
}

export interface CreatePostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (post: CreatePostData) => Promise<void>;
}

export interface TrendingTopic {
  tag: string;
  count: number;
  category: string;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface PostCardProps {
  post: Post;
}

export interface StyleProps {
  theme: Theme;
}