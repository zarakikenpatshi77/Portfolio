import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { supabase } from '../lib/supabaseClient';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
