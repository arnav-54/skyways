import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import RegisterForm from '../components/Auth/RegisterForm';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-68px-264px)] bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <RegisterForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;