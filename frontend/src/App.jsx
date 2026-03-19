import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CommunityPage from './pages/CommunityPage';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

const App = () => {
  const location = useLocation();
  const isCommunity = location.pathname.startsWith('/community');

  return (
    <Box minH="100vh" bg="gray.50">
      {!isCommunity && <Navbar />}
      <Box
        as="main"
        px={isCommunity ? 0 : { base: 4, md: 8 }}
        py={isCommunity ? 0 : { base: 6, md: 10 }}
        maxW={isCommunity ? 'none' : '1120px'}
        mx={isCommunity ? 0 : 'auto'}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/community/:domainSlug"
            element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;

