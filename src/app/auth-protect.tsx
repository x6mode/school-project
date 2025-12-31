import type { ReactNode } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constant';

const AuthProtect = (): ReactNode => {
  const isAuthorized = true;

  return isAuthorized ? <Outlet /> : <Navigate to={AppRoutes.Login} />;
};

export default AuthProtect;
