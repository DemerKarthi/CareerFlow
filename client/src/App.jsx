import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config/routes';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Layout
import { ProtectedLayout } from './components/layout/ProtectedLayout';
import { Toaster } from 'sonner';

// App Pages
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Companies from './pages/Companies';
import Recruiters from './pages/Recruiters';
import Interviews from './pages/Interviews';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Resumes from './pages/Resumes';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        
        {/* Protected Routes (SaaS Dashboard Shell) */}
        <Route element={<ProtectedLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.APPLICATIONS} element={<Applications />} />
          <Route path={ROUTES.COMPANIES} element={<Companies />} />
          <Route path={ROUTES.RECRUITERS} element={<Recruiters />} />
          <Route path={ROUTES.INTERVIEWS} element={<Interviews />} />
          <Route path={ROUTES.CALENDAR} element={<Calendar />} />
          <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
          <Route path={ROUTES.RESUMES} element={<Resumes />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
