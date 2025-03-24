import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar>
        <div className="flex-1 flex items-center">
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/feed')}
          >
            <i className="fas fa-graduation-cap text-2xl text-indigo-600 mr-2" />
            EduApp
          </Typography>
        </div>

        <div className="flex items-center space-x-4">
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={() => navigate('/notifications')}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account"
            aria-haspopup="true"
            onClick={() => navigate('/profile')}
          >
            <Avatar
              alt="User Profile"
              src="https://ui-avatars.com/api/?name=John+Doe&background=random"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;