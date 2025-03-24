import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip
} from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';

export interface TrendingTopic {
  tag: string;
  count: number;
  category: string;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  onTopicClick: (tag: string) => void;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics, onTopicClick }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingIcon color="primary" />
        Trending Topics
      </Typography>

      <List>
        {topics.map((topic, index) => (
          <ListItem 
            key={topic.tag}
            onClick={() => onTopicClick(topic.tag)}
            sx={{ 
              px: 0,
              '&:hover': {
                backgroundColor: 'action.hover',
                cursor: 'pointer',
                borderRadius: 1
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Typography 
                color="text.secondary" 
                variant="body2"
                sx={{ fontWeight: 500 }}
              >
                {index + 1}
              </Typography>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  #{topic.tag}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="text.secondary" component="span">
                    {topic.count} posts
                  </Typography>
                  <Chip
                    label={topic.category}
                    size="small"
                    sx={{ ml: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TrendingTopics;