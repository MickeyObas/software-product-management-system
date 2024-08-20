import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ element: Component }) {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const location = useLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
