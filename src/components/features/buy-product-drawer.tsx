import { type PropsWithChildren, type ReactNode } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/store';

import MarketApiInstance from '@/service/api.service';

import { motion } from 'framer-motion';

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

import { Handshake } from 'lucide-react';

import { animationNormally } from '@/constant';
import { ProductWithCreator } from '@/app/types/api';
import { toast } from 'sonner';

type TProps = {
  product: ProductWithCreator;
  onClose?: () => void;
};

const BuyProductDrawer = ({
  children,
  product,
  onClose,
}: PropsWithChildren<TProps>): ReactNode => {
  const { data, setData } = useUserStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['buying', product.id],
    mutationFn: () => MarketApiInstance.buyProduct(product.id),
    onSuccess: (payload) => {
      setData({ ...data!, balance: data!.balance - payload.price });
      if (onClose) onClose();
      queryClient.invalidateQueries({ queryKey: ['product', product.id] });
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      toast.info(`Товар "${product.id.slice(0, 13)}" теперь ваш!`);
    },
  });

  return (
    <Drawer
      onClose={() => {
        if (onClose) onClose();
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='mx-auto max-w-[700px] bg-background'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={animationNormally}
        >
          <DrawerHeader>
            <DrawerTitle>Вы уверены?</DrawerTitle>
            <DrawerDescription>
              Вы покупаете на товар{' '}
              <span className='text-blue-400 font-medium'>
                @{product.creator.nickname}
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className='grid place-items-center'>
            <div className='flex flex-col gap-2 w-xs'>
              <div className='flex items-center justify-between w-full font-semibold'>
                <h1 className='text-lg'>К оплате</h1>
                <div className='flex items-center justify-end gap-2 text-xl text-blue-500'>
                  <p>{product.price} </p>
                  <span>
                    <Handshake />
                  </span>
                </div>
              </div>
              <Separator className='my-2' />
              <Button
                disabled={isPending}
                onClick={async () => {
                  mutate();
                }}
              >
                {isPending ? 'Покупаем...' : 'Купить!'}
              </Button>
              <DrawerClose asChild>
                <Button
                  variant='outline'
                  disabled={isPending}
                >
                  Я передумал...
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
};

export default BuyProductDrawer;
