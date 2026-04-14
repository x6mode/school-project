import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { UserProfile } from '@/app/types/api';

import { AppRoutes } from '@/constant';

type TProps = Pick<UserProfile, 'nickname' | 'balance'>;

const AccountInfo = ({ balance, nickname }: TProps): ReactNode => {
  return (
    <Link to={AppRoutes.Profile}>
      <div className='flex flex-col justify-between hover:text-blue-400 h-full'>
        <h1 className='text-sm font-semibold transition duration-200 ease-in-out'>
          @{nickname} <span className='text-muted-foreground'>({balance} AC)</span>
        </h1>
      </div>
    </Link>
  );
};

export default AccountInfo;
