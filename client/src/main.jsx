import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import theme from './theme';
import './index.css';
import { SongsProvider } from './context/SongsContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
import { UsersProvider } from './context/UsersContext.jsx';

createRoot(document.getElementById('root')).render(
  <LoadingProvider>
    <UsersProvider>
      <SongsProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SongsProvider>
    </UsersProvider>
  </LoadingProvider>
);
