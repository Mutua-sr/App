import { SxProps, Theme } from '@mui/material';

export const communitiesStyles = {
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

  communityList: {
    bgcolor: 'background.paper',
    borderRadius: '16px',
  } as SxProps<Theme>,

  communityItem: {
    py: 2,
    px: 2,
    '&:hover': {
      bgcolor: 'action.hover',
    },
  } as SxProps<Theme>,

  avatar: {
    width: 50,
    height: 50,
    border: '2px solid',
    borderColor: 'primary.light',
  } as SxProps<Theme>,

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

  headerContent: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,

  messageContent: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,
};