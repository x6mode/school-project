import type { ReactNode } from 'react';

import ProductItem from '@/components/widgets/product-item';
import { toast } from 'sonner';

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

import { Trash2 } from 'lucide-react';

import { Product } from '@/app/types/api';
import MarketApiInstance from '@/service/api.service';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

type TProps = {
  product: Product;
  profile: {
    nickname: string;
    id: string;
  };
};

const ProductSellingItem = ({ product, profile }: TProps): ReactNode => {
  const queryClient = useQueryClient();

  return (
    <div className='relative'>
      <ProductItem product={{ ...product, creator: profile }} />
      <div className='absolute top-4 right-4 gap-2 flex'>
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
              Это действие нельзя отменить, оно приведет к полному удалению записи с наших
              серверов
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={'outline'}>Отмена</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant={'destructive'}
                  onClick={async () => {
                    try {
                      const data = await MarketApiInstance.removeProduct(product.id);
                      if (data.message) toast.info(data.message);
                    } catch (e) {
                      if (e instanceof AxiosError) {
                        toast.error(e.response?.data);
                      }
                    } finally {
                      queryClient.invalidateQueries({ queryKey: ['selling_products'] });
                    }
                  }}
                >
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
