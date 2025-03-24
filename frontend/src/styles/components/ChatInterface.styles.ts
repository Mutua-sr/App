import { Theme } from '@mui/material';

export const chatInterfaceStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.default',
  },

  header: {
    px: 2,
    py: 1.5,
    borderBottom: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
  },

  headerContent: {
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userInfo: {
    direction: 'row',
    alignItems: 'center',
    spacing: 2,
  },

  actions: {
    direction: 'row',
    spacing: 1,
  },

  messageContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    px: 2,
    py: 2,
    bgcolor: (theme: Theme) => theme.palette.mode === 'light' 
      ? 'grey.50'
      : 'grey.900',
  },

  messageWrapper: (isOwn: boolean) => ({
    alignSelf: isOwn ? 'flex-end' : 'flex-start',
    maxWidth: '70%',
    mb: 2,
  }),

  messageContent: (isOwn: boolean) => ({
    p: 1.5,
    bgcolor: isOwn ? 'primary.main' : 'background.paper',
    color: isOwn ? 'primary.contrastText' : 'text.primary',
    borderRadius: 2,
    boxShadow: 1,
  }),

  timestamp: {
    display: 'block',
    textAlign: 'right',
    mt: 0.5,
    opacity: 0.8,
    fontSize: '0.75rem',
  },

  inputContainer: {
    p: 2,
    borderTop: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
  },

  inputWrapper: {
    direction: 'row',
    spacing: 2,
    alignItems: 'center',
  },

  messageField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
    },
  },

  attachButton: {
    color: 'text.secondary',
  },

  sendButton: {
    color: 'primary.main',
  },

  emojiButton: {
    color: 'text.secondary',
  },
};