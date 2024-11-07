// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('role');

  if (userRole !== requiredRole) {
    // Si el rol del usuario no coincide, redirigir al login o a una página de acceso denegado.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
