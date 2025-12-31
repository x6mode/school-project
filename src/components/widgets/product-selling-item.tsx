import type { ReactNode } from 'react';

import ProductItem from '@/components/widgets/product-item';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/shared/alert-dialog';
import { Button } from '@/components/shared/button';

import { PenLine, Trash2 } from 'lucide-react';

const ProductSellingItem = (): ReactNode => {
  return (
    <div className='relative'>
      <ProductItem />
      <div className='absolute top-4 right-4 gap-2 flex'>
        <Button
          variant={'secondary'}
          size={'icon-sm'}
          className='glass'
        >
          <PenLine />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'secondary'}
              size={'icon-sm'}
              className='glass text-destructive'
            >
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
        <AlertDialogContent className='smooth-anim'>
            <AlertDialogHeader>Вы уверены?</AlertDialogHeader>
            <AlertDialogDescription>
              Это действие нельзя отменить, оно приведет к полному удалению записи с наших серверов
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={'outline'}>Отмена</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant={'destructive'}>
                  <Trash2 /> Снять
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProductSellingItem;
