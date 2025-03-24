import { SxProps, Theme } from '@mui/material';

export const classroomsStyles = {
  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    px: 1,
  } as SxProps<Theme>,

  addButton: {
    bgcolor: 'primary.light',
    color: 'white',
    '&:hover': {
      bgcolor: 'primary.main',
    },
  } as SxProps<Theme>,

  searchField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: 'background.paper',
    },
  } as SxProps<Theme>,

  classList: {
    bgcolor: 'background.paper',
    borderRadius: '16px',
  } as SxProps<Theme>,

  classItem: {
    py: 2,
    px: 2,
    '&:hover': {
      bgcolor: 'action.hover',
    },
  } as SxProps<Theme>,

  avatar: (isLive: boolean) => ({
    width: 50,
    height: 50,
    border: '2px solid',
    borderColor: isLive ? 'success.main' : 'primary.light',
  }) as SxProps<Theme>,

  messagePreview: {
    maxWidth: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,

  badge: {
    '& .MuiBadge-badge': {
      fontSize: '0.75rem',
      height: '20px',
      minWidth: '20px',
    },
  } as SxProps<Theme>,

  liveChip: {
    height: 20,
    '& .MuiChip-label': {
      px: 1,
      fontSize: '0.7rem',
    },
  } as SxProps<Theme>,

  liveIcon: {
    fontSize: '0.8rem !important',
  } as SxProps<Theme>,

  headerContent: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,

  instructorText: {
    color: 'text.secondary',
    fontSize: '0.75rem',
  } as SxProps<Theme>,

  messageContent: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 0.5,
  } as SxProps<Theme>,
};