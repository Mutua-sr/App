import React, { useState } from 'react';
import {
  Box,
  Stack,
  IconButton,
  Typography,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  PeopleAlt as PeopleIcon,
  CallEnd as CallEndIcon,
} from '@mui/icons-material';
import { videoCallStyles as styles } from '../../styles/components/VideoCall.styles';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
}

interface VideoCallProps {
  participants: Participant[];
  onEndCall: () => void;
  onToggleChat: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  participants,
  onEndCall,
  onToggleChat,
}) => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  return (
    <Box sx={styles.container}>
      {/* Main Video Grid */}
      <Box sx={styles.videoGrid}>
        <Grid container spacing={2}>
          {participants.map((participant) => (
            <Grid item xs={12} sm={6} md={4} key={participant.id}>
              <Paper sx={styles.videoWrapper}>
                {!participant.isVideoOn ? (
                  <Box sx={styles.videoPlaceholder}>
                    <Avatar
                      src={participant.avatar}
                      sx={styles.participantAvatar}
                    />
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={participant.avatar}
                    sx={styles.video}
                    alt={participant.name}
                  />
                )}
                <Box sx={styles.participantInfo}>
                  <Typography variant="body2" sx={styles.participantName}>
                    {participant.name}
                    {participant.isSpeaking && (
                      <Box
                        component="span"
                        sx={styles.speakingIndicator}
                        ml={1}
                      />
                    )}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {!participant.isAudioOn && (
                      <MicOffIcon fontSize="small" sx={{ color: 'error.main' }} />
                    )}
                    {!participant.isVideoOn && (
                      <VideocamOffIcon fontSize="small" sx={{ color: 'error.main' }} />
                    )}
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Control Bar */}
      <Paper elevation={3} sx={styles.controlBar}>
        <Stack sx={styles.controls}>
          <IconButton
            onClick={() => setIsAudioOn(!isAudioOn)}
            sx={styles.controlButton(isAudioOn)}
          >
            {isAudioOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          
          <IconButton
            onClick={() => setIsVideoOn(!isVideoOn)}
            sx={styles.controlButton(isVideoOn)}
          >
            {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          
          <IconButton
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            sx={styles.controlButton(true)}
          >
            {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
          </IconButton>
          
          <IconButton
            onClick={onToggleChat}
            sx={styles.controlButton(true)}
          >
            <ChatIcon />
          </IconButton>
          
          <IconButton
            sx={styles.controlButton(true)}
          >
            <PeopleIcon />
          </IconButton>
          
          <IconButton
            onClick={onEndCall}
            sx={styles.endCallButton}
          >
            <CallEndIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default VideoCall;