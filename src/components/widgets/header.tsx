import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Separator } from '@/components/shared/separator';
import { Button } from '@/components/shared/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/shared/item';

import ThemeToggler from '@/components/widgets/theme-toggler';

import { Fingerprint, ImageIcon } from 'lucide-react';

import { AppRoutes, MIN_WIDTH_FOR_ANIM_HEADER } from '@/constant';

import { scrollWidthAnim } from '@/utils/scroll-width-anim';

const Header = (): ReactNode => {
  const subHeaderRef = useRef<HTMLDivElement | null>(null);

  const scrollAnimFuncMemo = useCallback(() => scrollWidthAnim(subHeaderRef, { frames: 1000, speed: 700 }), []);

  useEffect(() => {
    if (window.matchMedia(`(width >= ${MIN_WIDTH_FOR_ANIM_HEADER})`).matches) {
      document.addEventListener('scroll', scrollAnimFuncMemo);
      return () => document.removeEventListener('scroll', scrollAnimFuncMemo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className='p-1 w-full sticky top-0 z-10 grid place-items-center'>
      <Item
        ref={subHeaderRef}
        variant='outline'
        className='min-w-fit flex-nowrap w-full px-6 py-3 max-lg:px-3 glass'
      >
        <ItemMedia
          variant='icon'
          className='bg-muted/50 max-lg:hidden'
        >
          <ImageIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Link to={AppRoutes.Main}>
              <h1 className='text-xl mr-6'>RikoaTech</h1>
            </Link>
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <ThemeToggler />
          <Separator
            className='mx-2 h-5!'
            orientation='vertical'
          />
          <Link to={AppRoutes.Login}>
            <Button variant='outline'>
              <Fingerprint /> Авторизация
            </Button>
          </Link>
        </ItemActions>
      </Item>
    </header>
  );
};

export default Header;
