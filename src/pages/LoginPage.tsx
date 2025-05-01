import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-68px-264px)] bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;