import React from 'react';
import { Box, CssBaseline, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import mobileTheme from '../../theme/mobileTheme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={mobileTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: '56px', sm: '64px' },
            pb: { xs: '56px', sm: 0 },
            overflow: 'auto'
          }}
        >
          {children}
        </Box>
        {isMobile && <BottomNav />}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;