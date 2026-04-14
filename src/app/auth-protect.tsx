import type { ReactNode } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constant';

import { useUserStore } from './store/store';

const AuthProtect = (): ReactNode => {
  const { data } = useUserStore();

  return data?.mail ? <Outlet /> : <Navigate to={AppRoutes.Main} />;
};

export default AuthProtect;
