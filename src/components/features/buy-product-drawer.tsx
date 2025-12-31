import { useCallback, useState, type PropsWithChildren, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/shared/button';
import { Separator } from '@/components/shared/separator';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/shared/drawer';

import { ArrowRight, Check, Handshake } from 'lucide-react';

import { animationNormally, AppRoutes } from '@/constant';

type TProps = {
  onClose?: () => void;
};

const BuyProductDrawer = ({ children, onClose }: PropsWithChildren<TProps>): ReactNode => {
  const [isop, setop] = useState(true);

  const [height, setHeight] = useState<number>(0);

  const refHeightCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setHeight(Math.max(rect.height, height));
    }
  }, []);

  return (
    <Drawer
      onClose={() => {
        if (onClose) onClose();
        setop(true);
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='mx-auto max-w-[700px]'>
        <AnimatePresence
          initial={false}
          mode='wait'
        >
          {!isop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationNormally}
              className='h-full w-full grid place-items-center'
              style={{ minHeight: height }}
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, filter: 'drop-shadow(0 0 0 var(--color-green-400))' }}
                  animate={{ opacity: 1, filter: 'drop-shadow(0 0 25px var(--color-green-400))' }}
                  exit={{ opacity: 0 }}
                  transition={animationNormally}
                  className='flex justify-center'
                >
                  <Check
                    size={64}
                    className='text-green-500'
                  />
                </motion.div>
                <div className='flex align-items justify-center flex-col text-center gap-6'>
                  <h1 className='text-3xl font-semibold'>Успешно!</h1>
                  <div className='grid place-items-center'>
                    <Link to={AppRoutes.Profile}>
                      <Button
                        variant={'outline'}
                        size={'lg'}
                      >
                        В профиль <ArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {isop && (
            <motion.div
              key={String(isop)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationNormally}
              ref={refHeightCallback}
            >
              <DrawerHeader>
                <DrawerTitle>Вы уверены?</DrawerTitle>
                <DrawerDescription>
                  Вы подписываетесь на товар <span className='text-blue-400 font-medium'>@x6modee</span>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className='grid place-items-center'>
                <div className='flex flex-col gap-2 w-xs'>
                  <div className='flex items-center justify-between w-full font-semibold'>
                    <h1 className='text-lg'>К оплате</h1>
                    <div className='flex items-center justify-end gap-2 text-xl text-blue-500'>
                      <p>2509 </p>
                      <span>
                        <Handshake />
                      </span>
                    </div>
                  </div>
                  <Separator className='my-2' />
                  <Button onClick={() => setop(false)}>Подписаться!</Button>
                  <DrawerClose asChild>
                    <Button variant='outline'>Я передумал...</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DrawerContent>
    </Drawer>
  );
};

export default BuyProductDrawer;
