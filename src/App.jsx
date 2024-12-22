import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import HealthPage from './components/pages/HealthPage';
import CareerPage from './components/pages/CareerPage';
import RelationshipsPage from './components/pages/RelationshipsPage';
import FinancesPage from './components/pages/FinancesPage';
import PersonalDevelopmentPage from './components/pages/PersonalDevelopmentPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/health" element={<PrivateRoute><HealthPage /></PrivateRoute>} />
            <Route path="/career" element={<PrivateRoute><CareerPage /></PrivateRoute>} />
            <Route path="/relationships" element={<PrivateRoute><RelationshipsPage /></PrivateRoute>} />
            <Route path="/finances" element={<PrivateRoute><FinancesPage /></PrivateRoute>} />
            <Route path="/personal-development" element={<PrivateRoute><PersonalDevelopmentPage /></PrivateRoute>} />
            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;