import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface SwipeHandlerProps {
  children: React.ReactNode;
}

const SwipeHandler: React.FC<SwipeHandlerProps> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const isChatRoute = React.useMemo(() => 
    location.pathname.includes('/communities/') || 
    location.pathname.includes('/classrooms/'),
    [location.pathname]
  );

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (!isChatRoute) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  }, [isChatRoute]);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!isChatRoute) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  }, [isChatRoute]);

  const handleTouchEnd = React.useCallback(() => {
    if (!isChatRoute && isMobile && touchStart !== 0 && touchEnd !== 0) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      const routes = ['/', '/communities', '/classrooms', '/profile'];
      const currentIndex = routes.indexOf(location.pathname);

      if (isLeftSwipe && currentIndex < routes.length - 1) {
        // navigate(routes[currentIndex + 1]);
      }
      if (isRightSwipe && currentIndex > 0) {
        // navigate(routes[currentIndex - 1]);
      }
    }
  }, [isChatRoute, isMobile, touchStart, touchEnd, location.pathname]);

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};

export default SwipeHandler;