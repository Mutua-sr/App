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
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Classroom {
  id: string;
  name: string;
  instructor: string;
  description: string;
  students: number;
  progress: number;
  nextClass: string;
  assignments: number;
  topics: string[];
  avatar: string;
}

const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    instructor: 'Dr. Sarah Johnson',
    description: 'Learn fundamental data structures and algorithmic techniques.',
    students: 25,
    progress: 65,
    nextClass: 'Tomorrow, 10:00 AM',
    assignments: 2,
    topics: ['Arrays', 'Linked Lists', 'Trees'],
    avatar: 'DS',
  },
  {
    id: '2',
    name: 'Web Development',
    instructor: 'Prof. Michael Chen',
    description: 'Master modern web development technologies and practices.',
    students: 30,
    progress: 45,
    nextClass: 'Today, 2:00 PM',
    assignments: 1,
    topics: ['HTML/CSS', 'JavaScript', 'React'],
    avatar: 'WD',
  },
  {
    id: '3',
    name: 'Machine Learning',
    instructor: 'Dr. Emily Brown',
    description: 'Introduction to machine learning concepts and applications.',
    students: 20,
    progress: 80,
    nextClass: 'Thursday, 11:00 AM',
    assignments: 3,
    topics: ['Neural Networks', 'Deep Learning', 'Python'],
    avatar: 'ML',
  },
];

const ClassroomCard: React.FC<{ classroom: Classroom }> = ({ classroom }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => navigate(`/classrooms/${classroom.id}`)}>
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
                {classroom.avatar}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h6" gutterBottom>
                  {classroom.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {classroom.instructor}
                </Typography>
              </Box>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Stack>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Course Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={classroom.progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 0.5 }}>
                {classroom.progress}%
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <ScheduleIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {classroom.nextClass}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <AssignmentIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {classroom.assignments} assignments
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {classroom.topics.map((topic) => (
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

const Classrooms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredClassrooms = mockClassrooms.filter(classroom =>
    classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
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
            Classrooms
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
          >
            Create Classroom
          </Button>
        </Stack>

        <TextField
          fullWidth
          placeholder="Search classrooms..."
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
          {filteredClassrooms.map((classroom) => (
            <Grid item xs={12} sm={6} md={4} key={classroom.id}>
              <ClassroomCard classroom={classroom} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Classrooms;