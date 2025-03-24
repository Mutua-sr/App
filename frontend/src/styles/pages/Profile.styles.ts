import { Theme } from '@mui/material';

export const profileStyles = {
  container: {
    maxWidth: 'lg',
    mx: 'auto',
    p: { xs: 2, sm: 3 },
    pb: { xs: 8, sm: 6 }, // Add padding for bottom navigation
  },

  headerCard: {
    p: { xs: 2.5, sm: 3 },
    mb: 3,
    borderRadius: 3,
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'linear-gradient(145deg, #f7f9fc 0%, #ffffff 100%)'
        : 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },

  headerContent: (isMobile: boolean) => ({
    direction: isMobile ? 'column' : 'row',
    spacing: 3,
    alignItems: isMobile ? 'center' : 'flex-start',
    textAlign: isMobile ? 'center' : 'left',
  }),

  avatar: {
    width: { xs: 100, sm: 120 },
    height: { xs: 100, sm: 120 },
    fontSize: '2.5rem',
    bgcolor: 'primary.main',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: '4px solid #fff',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  userInfo: (isMobile: boolean) => ({
    flex: 1,
    alignItems: isMobile ? 'center' : 'flex-start',
  }),

  userDescription: {
    color: 'text.secondary',
    mb: 0.5,
    fontWeight: 500,
  },

  userSubInfo: {
    color: 'text.secondary',
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    '& svg': {
      fontSize: '1rem',
      opacity: 0.7,
    },
  },

  actionButtons: (isMobile: boolean) => ({
    direction: 'row',
    spacing: 2,
    mt: 2,
    justifyContent: isMobile ? 'center' : 'flex-start',
  }),

  editButton: {
    bgcolor: 'background.paper',
    color: 'text.primary',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:hover': {
      bgcolor: 'action.hover',
      transform: 'translateY(-1px)',
    },
    transition: 'transform 0.2s ease-in-out',
  },

  shareButton: {
    borderColor: 'divider',
    color: 'text.primary',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: 'action.hover',
    },
  },

  statsContainer: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
    gap: 2,
    mb: 3,
  },

  statCard: {
    p: 2.5,
    borderRadius: 2,
    bgcolor: 'background.paper',
    textAlign: 'center',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },

  statValue: {
    fontWeight: 'bold',
    color: 'primary.main',
    mb: 0.5,
    fontSize: '1.5rem',
  },

  statLabel: {
    color: 'text.secondary',
    typography: 'body2',
    fontWeight: 500,
  },

  menuList: {
    borderRadius: 2,
    overflow: 'hidden',
    mb: 3,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    '& .MuiListItemButton-root': {
      py: 2,
      px: 3,
      transition: 'all 0.2s ease-in-out',
    },
  },

  menuItem: {
    '&:hover': {
      bgcolor: 'action.hover',
      transform: 'translateX(4px)',
    },
  },

  menuIcon: {
    color: 'primary.main',
    minWidth: 40,
    '& svg': {
      fontSize: '1.3rem',
    },
  },

  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    px: 1.5,
    py: 0.5,
    borderRadius: 1,
    typography: 'caption',
    bgcolor: 'action.selected',
    color: 'text.secondary',
    fontWeight: 500,
  },

  achievementIcon: {
    fontSize: '1.2rem',
    color: 'warning.main',
    mr: 1,
  },

  divider: {
    my: 1,
  },

  logoutButton: {
    py: 1.5,
    borderRadius: 2,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      bgcolor: 'error.dark',
      transform: 'translateY(-1px)',
    },
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
};