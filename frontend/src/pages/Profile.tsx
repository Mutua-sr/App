import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Button,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  School as EducationIcon,
  Star as AchievementsIcon,
  History as ActivityIcon,
  Bookmark as SavedIcon,
  Help as HelpIcon,
  ExitToApp as LogoutIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { profileStyles as styles } from '../styles/pages/Profile.styles';

interface StatCardProps {
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <Paper sx={styles.statCard}>
    <Typography variant="h5" sx={styles.statValue}>
      {value}
    </Typography>
    <Typography sx={styles.statLabel}>
      {label}
    </Typography>
  </Paper>
);

const ProfileHeader: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <Paper elevation={0} sx={styles.headerCard}>
    <Stack sx={styles.headerContent(isMobile)}>
      <Avatar sx={styles.avatar}>JS</Avatar>
      <Stack sx={styles.userInfo(isMobile)}>
        <Typography variant="h4" gutterBottom>
          John Smith
        </Typography>
        <Typography variant="h6" sx={styles.userDescription}>
          Computer Science Student
        </Typography>
        <Typography variant="body1" sx={styles.userSubInfo}>
          University of Technology • Year 3
        </Typography>
        <Stack sx={styles.actionButtons(isMobile)}>
          <Button 
            variant="contained" 
            sx={styles.editButton}
          >
            Edit Profile
          </Button>
          <Button 
            variant="outlined" 
            sx={styles.shareButton}
          >
            Share Profile
          </Button>
        </Stack>
      </Stack>
    </Stack>
  </Paper>
);

const StatsSection: React.FC = () => (
  <Box sx={styles.statsContainer}>
    <StatCard value={12} label="Courses Completed" />
    <StatCard value={156} label="Study Hours" />
    <StatCard value={8} label="Achievements" />
  </Box>
);

const MenuList: React.FC = () => {
  const menuItems = [
    {
      icon: <EducationIcon />,
      text: 'My Learning',
      badge: '3 Active Courses',
    },
    {
      icon: <AchievementsIcon />,
      text: 'Achievements',
      badge: '12 Badges',
    },
    {
      icon: <TimelineIcon />,
      text: 'Progress Tracking',
      badge: 'View Stats',
    },
    {
      icon: <GroupIcon />,
      text: 'Study Groups',
      badge: '4 Groups',
    },
    {
      icon: <ActivityIcon />,
      text: 'Activity History',
    },
    {
      icon: <SavedIcon />,
      text: 'Saved Resources',
      badge: '15 Items',
    },
    {
      icon: <SettingsIcon />,
      text: 'Settings',
    },
    {
      icon: <HelpIcon />,
      text: 'Help & Support',
    },
  ];

  return (
    <Paper elevation={0} sx={styles.menuList}>
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItemButton sx={styles.menuItem}>
              <ListItemIcon sx={styles.menuIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                secondary={item.badge}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
                secondaryTypographyProps={{
                  component: 'span',
                  sx: styles.badge,
                }}
              />
            </ListItemButton>
            {index < menuItems.length - 1 && <Divider sx={styles.divider} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

const RecentAchievements: React.FC = () => (
  <Paper elevation={0} sx={styles.menuList}>
    <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
      Recent Achievements
    </Typography>
    <List>
      {[
        'Completed Advanced JavaScript Course',
        'Perfect Attendance - 30 Days',
        'Top Contributor - Study Group',
      ].map((achievement, index) => (
        <React.Fragment key={achievement}>
          <ListItemButton>
            <ListItemIcon sx={styles.menuIcon}>
              <TrophyIcon sx={styles.achievementIcon} />
            </ListItemIcon>
            <ListItemText primary={achievement} />
          </ListItemButton>
          {index < 2 && <Divider sx={styles.divider} />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

const Profile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container sx={styles.container}>
      <ProfileHeader isMobile={isMobile} />
      <StatsSection />
      <RecentAchievements />
      <MenuList />
      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        sx={styles.logoutButton}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Profile;