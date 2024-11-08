import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a7c7e7', // pastel blue
    },
    secondary: {
      main: '#b3e5fc', // lighter pastel blue
    },
    background: {
      default: '#e3f2fd', // very light pastel blue
      paper: '#f0f8ff', // even lighter pastel blue for paper elements
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;