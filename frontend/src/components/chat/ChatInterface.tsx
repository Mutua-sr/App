import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Stack,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Videocam as VideocamIcon,
  Call as CallIcon,
  MoreVert as MoreVertIcon,
  EmojiEmotions as EmojiIcon,
} from '@mui/icons-material';
import { chatInterfaceStyles as styles } from '../../styles/components/ChatInterface.styles';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatInterfaceProps {
  title: string;
  subtitle?: string;
  avatar: string;
  isLive?: boolean;
  onStartVideoCall?: () => void;
  onStartVoiceCall?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title,
  subtitle,
  avatar,
  isLive,
  onStartVideoCall,
  onStartVoiceCall,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      content: 'Hello everyone!',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hi John! How are you?',
      timestamp: '10:31 AM',
      isOwn: true,
    },
  ]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Paper elevation={2} sx={styles.header}>
        <Stack sx={styles.headerContent}>
          <Stack sx={styles.userInfo}>
            <Avatar src={avatar} alt={title} />
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack sx={styles.actions}>
            {onStartVoiceCall && (
              <IconButton onClick={onStartVoiceCall}>
                <CallIcon />
              </IconButton>
            )}
            {onStartVideoCall && (
              <IconButton 
                onClick={onStartVideoCall}
                color={isLive ? "error" : "default"}
              >
                <VideocamIcon />
              </IconButton>
            )}
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      {/* Messages */}
      <Box sx={styles.messageContainer}>
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={styles.messageWrapper(msg.isOwn)}
            >
              <Paper sx={styles.messageContent(msg.isOwn)}>
                {!msg.isOwn && (
                  <Typography variant="caption" fontWeight={500}>
                    {msg.sender}
                  </Typography>
                )}
                <Typography variant="body1">{msg.content}</Typography>
                <Typography sx={styles.timestamp}>
                  {msg.timestamp}
                </Typography>
              </Paper>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      {/* Input */}
      <Paper elevation={3} sx={styles.inputContainer}>
        <Stack sx={styles.inputWrapper}>
          <IconButton size="small" sx={styles.emojiButton}>
            <EmojiIcon />
          </IconButton>
          <IconButton size="small" sx={styles.attachButton}>
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            variant="outlined"
            size="small"
            sx={styles.messageField}
          />
          <IconButton 
            color="primary"
            onClick={handleSend}
            disabled={!message.trim()}
            sx={styles.sendButton}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChatInterface;