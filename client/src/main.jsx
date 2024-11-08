import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import theme from './theme';
import './index.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
