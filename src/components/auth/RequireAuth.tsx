import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RequireAuth: React.FC = () => {
  const location = useLocation();
  // const token = Cookies.get('token');
  const { authUser } = useAuth();

  if (authUser?.token) {
    return <Outlet />;
  }

  return <Navigate to='/login' replace state={{ from: location }} />;
};
export default RequireAuth;
