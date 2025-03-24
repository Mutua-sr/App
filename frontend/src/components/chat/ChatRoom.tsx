import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Avatar,
  TextField,
  List,
  ListItem,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { chatRoomStyles as styles } from '../../styles/components/ChatRoom.styles';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const theme = useTheme();
  return (
    <Paper sx={styles.messageBubble(message.isMe, theme)}>
      <Typography variant="body1">{message.content}</Typography>
      <Typography variant="caption" sx={styles.messageTimestamp}>
        {message.timestamp}
      </Typography>
    </Paper>
  );
};

const ChatHeader: React.FC<{
  name: string;
  avatar: string;
  online: number;
  members: number;
  onBack: () => void;
}> = ({ name, avatar, online, members, onBack }) => (
  <Paper elevation={1} sx={styles.header}>
    <Stack direction="row" alignItems="center" spacing={1} sx={styles.headerContent}>
      <IconButton onClick={onBack} edge="start">
        <ArrowBackIcon />
      </IconButton>
      <Avatar src={avatar} sx={styles.headerAvatar} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {online} online • {members} members
        </Typography>
      </Box>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Stack>
  </Paper>
);

const ChatInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}> = ({ value, onChange, onSend }) => (
  <Paper elevation={3} sx={styles.inputContainer}>
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton size="small">
        <AttachFileIcon />
      </IconButton>
      <IconButton size="small">
        <ImageIcon />
      </IconButton>
      <TextField
        fullWidth
        placeholder="Type a message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        variant="outlined"
        size="small"
        sx={styles.textField}
      />
      <IconButton 
        color="primary" 
        onClick={onSend}
        disabled={!value.trim()}
      >
        <SendIcon />
      </IconButton>
    </Stack>
  </Paper>
);

const ChatRoom: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');

  // Mock data - replace with actual data fetching
  const community = {
    id: parseInt(id || '1'),
    name: 'Computer Science Hub',
    avatar: 'https://source.unsplash.com/random/200x200/?computer',
    members: 150,
    online: 12,
  };

  const messages: Message[] = [
    {
      id: 1,
      sender: 'Alice Johnson',
      avatar: 'AJ',
      content: 'Hey everyone! Who\'s up for reviewing the latest algorithms assignment?',
      timestamp: '10:30 AM',
      isMe: false,
    },
    {
      id: 2,
      sender: 'You',
      avatar: 'ME',
      content: 'I\'m in! Could use some help with dynamic programming.',
      timestamp: '10:32 AM',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Bob Smith',
      avatar: 'BS',
      content: 'Same here. The recursive solutions are tricky.',
      timestamp: '10:33 AM',
      isMe: false,
    },
  ];

  const handleSend = () => {
    if (newMessage.trim()) {
      // Add message handling logic here
      setNewMessage('');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={styles.container}>
      <ChatHeader
        name={community.name}
        avatar={community.avatar}
        online={community.online}
        members={community.members}
        onBack={handleBack}
      />

      <List sx={styles.messageList}>
        {messages.map((message) => (
          <ListItem key={message.id} sx={styles.messageItem(message.isMe)}>
            {!message.isMe && (
              <Stack direction="row" spacing={1} alignItems="center" sx={styles.senderInfo}>
                <Avatar sx={{ width: 24, height: 24 }}>{message.avatar}</Avatar>
                <Typography variant="caption" color="text.secondary">
                  {message.sender}
                </Typography>
              </Stack>
            )}
            <MessageBubble message={message} />
          </ListItem>
        ))}
      </List>

      <ChatInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSend}
      />
    </Box>
  );
};

export default ChatRoom;