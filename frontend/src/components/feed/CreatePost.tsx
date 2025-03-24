import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Avatar,
  Box,
  Chip
} from '@mui/material';
import {
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Link as LinkIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { CreatePostProps, CreatePostData } from '../../types/feed';

const CreatePost: React.FC<CreatePostProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post: CreatePostData = {
      type: 'post',
      author: 'John Doe', // TODO: Get from auth context
      avatar: 'JD',
      title,
      content,
      tags
    };
    await onSubmit(post);
    resetForm();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setCurrentTag('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Create Post
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar>JD</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Box>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content"
              placeholder="Share your thoughts or ask a question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Add tags"
              placeholder="Press Enter to add tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleAddTag}
            />

            {tags.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {tags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}

            <Stack direction="row" spacing={1}>
              <IconButton>
                <ImageIcon />
              </IconButton>
              <IconButton>
                <VideoIcon />
              </IconButton>
              <IconButton>
                <LinkIcon />
              </IconButton>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={!title.trim() || !content.trim()}
          >
            Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreatePost;