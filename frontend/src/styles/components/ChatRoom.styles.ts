import { SxProps, Theme } from '@mui/material';

export const chatRoomStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,
    bgcolor: 'background.paper',
    borderBottom: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  headerContent: {
    p: 1,
    minHeight: '64px',
  } as SxProps<Theme>,

  headerAvatar: {
    width: 40,
    height: 40,
    border: '2px solid',
    borderColor: 'primary.light',
  } as SxProps<Theme>,

  messageList: {
    flex: 1,
    overflow: 'auto',
    mt: '64px',
    mb: '70px',
    p: 2,
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  messageItem: (isMe: boolean) => ({
    flexDirection: 'column',
    alignItems: isMe ? 'flex-end' : 'flex-start',
    p: 1,
  }) as SxProps<Theme>,

  messageAvatar: {
    minWidth: 24,
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
    },
  } as SxProps<Theme>,

  messageBubble: (isMe: boolean, theme: Theme) => ({
    p: 1.5,
    bgcolor: isMe ? 'primary.main' : 'background.paper',
    color: isMe ? 'white' : 'text.primary',
    borderRadius: '16px',
    maxWidth: '80%',
    boxShadow: theme.shadows[1],
  }) as SxProps<Theme>,

  messageTimestamp: {
    display: 'block',
    textAlign: 'right',
    mt: 0.5,
    opacity: 0.8,
  } as SxProps<Theme>,

  inputContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    p: 2,
    bgcolor: 'background.paper',
    borderTop: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      bgcolor: 'background.paper',
    },
  } as SxProps<Theme>,

  senderInfo: {
    mb: 0.5,
  } as SxProps<Theme>,
};