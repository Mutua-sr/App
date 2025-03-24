import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { 
  Home as HomeIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Person as PersonIcon 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    const path = location.pathname;
    if (path.startsWith('/feed')) return 0;
    if (path.startsWith('/classrooms')) return 1;
    if (path.startsWith('/communities')) return 2;
    if (path.startsWith('/profile')) return 3;
    return 0;
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={(_, newValue) => {
          switch(newValue) {
            case 0:
              navigate('/feed');
              break;
            case 1:
              navigate('/classrooms');
              break;
            case 2:
              navigate('/communities');
              break;
            case 3:
              navigate('/profile');
              break;
          }
        }}
        showLabels
      >
        <BottomNavigationAction 
          label="Feed" 
          icon={<HomeIcon />} 
        />
        <BottomNavigationAction 
          label="Classrooms" 
          icon={<SchoolIcon />} 
        />
        <BottomNavigationAction 
          label="Communities" 
          icon={<PeopleIcon />} 
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<PersonIcon />} 
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;