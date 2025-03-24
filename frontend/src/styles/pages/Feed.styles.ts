import { SxProps, Theme } from '@mui/material';

export const feedStyles = {
  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  } as SxProps<Theme>,

  searchContainer: {
    direction: 'row',
    spacing: 2,
    mb: 3,
  } as SxProps<Theme>,

  searchField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
    },
  } as SxProps<Theme>,

  filterButton: {
    borderRadius: '12px',
  } as SxProps<Theme>,

  postCard: {
    borderRadius: '16px',
    '&:hover': {
      boxShadow: (theme) => theme.shadows[4],
    },
  } as SxProps<Theme>,

  postHeader: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,

  authorInfo: {
    direction: 'row',
    spacing: 2,
    alignItems: 'center',
  } as SxProps<Theme>,

  postContent: {
    mt: 2,
    mb: 2,
  } as SxProps<Theme>,

  tags: {
    direction: 'row',
    spacing: 1,
    flexWrap: 'wrap',
    useFlexGap: true,
  } as SxProps<Theme>,

  tag: {
    borderRadius: '8px',
    '&:hover': {
      bgcolor: 'primary.light',
      color: 'white',
    },
  } as SxProps<Theme>,

  actions: {
    direction: 'row',
    spacing: 2,
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  actionButton: {
    flex: 1,
  } as SxProps<Theme>,

  postList: {
    spacing: 2,
  } as SxProps<Theme>,
};