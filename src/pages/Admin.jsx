import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Snackbar,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const MotionContainer = motion.create(Container);

const Admin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      }}
    >
      <MotionContainer
        maxWidth="sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '20px',
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admin Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4 }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 20px rgba(33, 150, 243, 0.4)',
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError('')}
            sx={{
              borderRadius: '10px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </MotionContainer>
    </Box>
  );
};

export default Admin;
