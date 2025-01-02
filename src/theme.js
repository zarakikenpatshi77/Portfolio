import { createTheme } from '@mui/material'

const theme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: darkMode ? '#121212' : '#f5f5f5',
      paper: darkMode ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#ffffff' : '#000000',
      secondary: darkMode ? '#b0b0b0' : '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.167,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      marginBottom: '1rem',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '0em',
      lineHeight: 1.167,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '0.00735em',
      lineHeight: 1.235,
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0.01071em',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@keyframes bounce': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(-50%)',
          },
          '50%': {
            transform: 'translateY(-20px) translateX(-50%)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: darkMode 
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          borderRadius: 16,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: darkMode 
              ? '0 6px 24px rgba(0,0,0,0.45)' 
              : '0 6px 24px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  spacing: 8,
})

export default theme
