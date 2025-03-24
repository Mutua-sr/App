import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  EmojiEmotions as EmojiIcon
} from '@mui/icons-material';

interface ChatRoomProps {
  type?: 'direct' | 'group';  // Make type optional with default value
}

const ChatRoom: React.FC<ChatRoomProps> = ({ type = 'direct' }) => {
  const { roomId } = useParams();
  const [message, setMessage] = React.useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement message sending
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Paper sx={{ p: 2, borderRadius: '0' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar>JD</Avatar>
          <Box>
            <Typography variant="subtitle1">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              Online
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
        {/* TODO: Implement chat messages */}
      </Box>

      <Divider />

      {/* Message Input */}
      <Paper 
        component="form" 
        onSubmit={handleSendMessage}
        sx={{ 
          p: 2,
          borderRadius: '0',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <IconButton size="small">
          <EmojiIcon />
        </IconButton>
        <IconButton size="small">
          <AttachFileIcon />
        </IconButton>
        <IconButton size="small">
          <ImageIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          size="small"
          sx={{ mx: 1 }}
        />
        <IconButton 
          color="primary"
          type="submit"
          disabled={!message.trim()}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatRoom;