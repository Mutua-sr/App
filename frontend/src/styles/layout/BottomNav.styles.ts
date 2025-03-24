import { SxProps, Theme } from '@mui/material';

export const bottomNavStyles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: '16px 16px 0 0',
    overflow: 'hidden',
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  navigation: {
    height: { xs: 64, sm: 72 },
    backgroundColor: 'background.paper',
    '& .MuiBottomNavigationAction-root': {
      minWidth: 'auto',
      padding: { xs: '8px 0', sm: '12px 0' },
      '&.Mui-selected': {
        paddingTop: { xs: '8px', sm: '12px' },
        color: 'primary.main',
      },
      '& .MuiBottomNavigationAction-label': {
        fontSize: {
          xs: '0.675rem',
          sm: '0.75rem',
        },
        '&.Mui-selected': {
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
          },
        },
      },
      '& .MuiSvgIcon-root': {
        fontSize: {
          xs: '1.5rem',
          sm: '1.75rem',
        },
      },
    },
  } as SxProps<Theme>,
};