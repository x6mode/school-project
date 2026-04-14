import { useEffect, useState, type ReactNode } from 'react';

import { useUserStore } from '@/app/store/store';

import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/shared/spinner';

import MarketApiInstance from '@/service/api.service';

const AuthLoading = (): ReactNode => {
  const { setData } = useUserStore();
  const [isLoading, setLoading] = useState<boolean>(true);

  const getProfile = async () => {
    try {
      const profileInfo = await MarketApiInstance.getProfile();
      setData(profileInfo);
    } catch (e) {
      if (e instanceof Error) {
        console.warn(e.message);
      } else {
        console.warn(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return isLoading ? (
    <main className='h-dvh grid place-items-center'>
      <Spinner className='size-15!' />
    </main>
  ) : (
    <Outlet />
  );
};

export default AuthLoading;
