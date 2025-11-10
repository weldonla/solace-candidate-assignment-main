"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#265b4e',
    },
    secondary: {
      main: '#deb260',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff', // For header text
    },
  },
  typography: {
    fontFamily: 'var(--font-lato)',
    h1: {
      fontFamily: 'var(--font-roboto-slab)',
      color: '#ffffff',
    },
    h2: {
      fontFamily: 'var(--font-roboto-slab)',
      color: '#ffffff',
    },
    h3: {
      fontFamily: 'var(--font-roboto-slab)',
      color: '#ffffff',
    },
    h4: {
      fontFamily: 'var(--font-roboto-slab)',
      color: '#ffffff',
    },
    h5: {
      fontFamily: 'var(--font-roboto-slab)',
      color: '#ffffff',
    },
    h6: {
      fontFamily: 'var(--font-roboto-slab)',
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: '#deb260',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#c79f4e', // Slightly darker on hover
          },
        },
      },
    },
  },
});

export default theme;