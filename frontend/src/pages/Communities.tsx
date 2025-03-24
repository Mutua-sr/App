import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  topics: string[];
  avatar: string;
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Computer Science Hub',
    description: 'A community for CS students and professionals to share knowledge and experiences.',
    members: 150,
    topics: ['Programming', 'Algorithms', 'Web Development'],
    avatar: 'CS',
  },
  {
    id: '2',
    name: 'Math Enthusiasts',
    description: 'Explore the fascinating world of mathematics together.',
    members: 120,
    topics: ['Calculus', 'Linear Algebra', 'Statistics'],
    avatar: 'ME',
  },
  {
    id: '3',
    name: 'Physics Forum',
    description: 'Discuss physics concepts, theories, and latest discoveries.',
    members: 90,
    topics: ['Quantum Physics', 'Mechanics', 'Relativity'],
    avatar: 'PF',
  },
];

const CommunityCard: React.FC<{ community: Community }> = ({ community }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => navigate(`/communities/${community.id}`)}>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem',
                }}
              >
                {community.avatar}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h6" gutterBottom>
                  {community.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PeopleIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {community.members} members
                  </Typography>
                </Stack>
              </Box>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Stack>
            
            <Typography variant="body2" color="text.secondary">
              {community.description}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {community.topics.map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  size="small"
                  sx={{ mt: 1 }}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Communities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={2}
        >
          <Typography variant="h4" gutterBottom>
            Communities
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
          >
            Create Community
          </Button>
        </Stack>

        <TextField
          fullWidth
          placeholder="Search communities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {filteredCommunities.map((community) => (
            <Grid item xs={12} sm={6} md={4} key={community.id}>
              <CommunityCard community={community} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Communities;