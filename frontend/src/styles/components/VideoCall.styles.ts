import { Theme } from '@mui/material';

export const videoCallStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
    position: 'relative',
  },

  videoGrid: {
    flex: 1,
    p: 2,
    overflowY: 'auto',
  },

  videoWrapper: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '56.25%', // 16:9 aspect ratio
    borderRadius: 2,
    overflow: 'hidden',
  },

  videoPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
  },

  participantAvatar: {
    width: 80,
    height: 80,
  },

  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  participantInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    p: 1,
    bgcolor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  participantName: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },

  speakingIndicator: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    bgcolor: 'success.main',
  },

  controlBar: {
    p: 2,
    bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
    borderTop: 1,
    borderColor: 'divider',
  },

  controls: {
    direction: 'row',
    spacing: 2,
    justifyContent: 'center',
  },

  controlButton: (active: boolean) => ({
    bgcolor: active ? 'action.selected' : 'action.hover',
    '&:hover': {
      bgcolor: active ? 'action.selected' : 'action.focus',
    },
  }),

  endCallButton: {
    bgcolor: 'error.main',
    color: 'white',
    '&:hover': {
      bgcolor: 'error.dark',
    },
  },
};