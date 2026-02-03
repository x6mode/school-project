import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Separator } from '@/components/shared/separator';
import { Button } from '@/components/shared/button';

import { siteCreatorLink } from '@/constant';

const Footer = (): ReactNode => {
  return (
    <footer className='pb-6 mt-6'>
      <Separator className='mb-6' />
      <div className='flex justify-center items-center **:text-base'>
        <span className='font-bold mr-2 gradient-animation'>RikoaTech</span>
        <span className='text-muted-foreground'>| сайт создан</span>
        <Button
          asChild
          variant='link'
          className='p-1'
        >
          <Link to={siteCreatorLink}>@geforce3050</Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
