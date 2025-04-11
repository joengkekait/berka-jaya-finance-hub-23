
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default AuthLayout;
