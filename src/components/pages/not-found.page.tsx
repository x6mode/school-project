import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/shared/empty';

import { AppRoutes, contactLink } from '@/constant';

const NotFoundPage = (): ReactNode => {
  return (
    <Empty className='h-full'>
      <EmptyHeader>
        <EmptyTitle>404 - Не найдено</EmptyTitle>
        <EmptyDescription>
          Кажется страницу которую вы искали,
          <br />
          Кто то удалил :(
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={AppRoutes.Main}>
          <Button className='w-44'>На главную!</Button>
        </Link>
        <EmptyDescription>
          Нужна помощь? <Link to={contactLink}>Свяжитесь с тимлидом</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};

export default NotFoundPage;
