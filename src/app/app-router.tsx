import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from '@/components/pages/main.page';
import ProductPage from '@/components/pages/product.page';

import LoginPage from '@/components/pages/login.page';
import RegisterPage from '@/components/pages/register.page';

import NotFoundPage from '@/components/pages/not-found.page';

import ProfilePage from '@/components/pages/profile.page';

import { AppRoutes } from '@/constant';

const AppRouter = (): ReactNode => {
  return (
    <Routes>
      {/* No auth routes */}
      <Route
        path={AppRoutes.Main}
        element={<MainPage />}
      />
      <Route
        path={AppRoutes.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoutes.Register}
        element={<RegisterPage />}
      />
      <Route
        path={AppRoutes.Product}
        element={<ProductPage />}
      />

      {/* Auth routes */}
      <Route
        path={AppRoutes.Profile}
        element={<ProfilePage />}
      >
        {/* routes */}
      </Route>

      {/* 404 route */}
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default AppRouter;
