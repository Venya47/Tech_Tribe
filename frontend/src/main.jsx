import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        backgroundColor: 'gray.50'
      },
      body: {
        margin: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: 'gray.800'
      }
    }
  },
  colors: {
    brand: {
      50: '#e7f3ff',
      100: '#c2ddff',
      200: '#9bc7ff',
      300: '#73b0ff',
      400: '#4c9aff',
      500: '#337fe6',
      600: '#265fb4',
      700: '#1a4182',
      800: '#0e2351',
      900: '#020521'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

