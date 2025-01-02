import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  Divider,
  Avatar
} from '@mui/material';
import { Delete, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Card);

const MessagesTab = ({ messages, onDelete }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {messages.map((message, index) => (
        <Grid item xs={12} key={message.id}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '20px',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 20px 40px rgba(0,0,0,0.5)'
                  : '0 20px 40px rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    mr: 2
                  }}
                >
                  {message.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {message.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {message.email}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => onDelete(message.id)}
                  sx={{
                    color: 'error.main',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    '&:hover': {
                      backgroundColor: 'error.main',
                      color: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(244, 67, 54, 0.4)'
                    }
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {message.message}
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MessagesTab;
