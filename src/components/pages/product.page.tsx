import type { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/store';

import Header from '@/components/widgets/header';
import Footer from '@/components/widgets/footer';

import BuyProductDrawer from '@/components/features/buy-product-drawer';

import { Badge } from '@/components/shared/badge';
import { Separator } from '@/components/shared/separator';
import { Button } from '@/components/shared/button';
import { Spinner } from '@/components/shared/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shared/card';
import MarketApiInstance from '@/service/api.service';

import { Handshake, IdCard } from 'lucide-react';

import { getPathToImage } from '@/utils/getPathToImage';

import { animationNormally, FORMULA_FULL_DVH_WO_FOOTER_AND_HEADER } from '@/constant';

const ProductPage = (): ReactNode => {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => MarketApiInstance.getProduct(id!),
    enabled: !!id,
  });

  const userData = useUserStore((state) => state.data);

  const pastDate = new Date(data?.created_at!);
  const today = new Date();
  const diffInMs = Math.abs(today.getMilliseconds() - pastDate.getMilliseconds());

  const daysAgo = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return (
    <div className='page'>
      <Header />
      {isLoading && (
        <div
          className='w-full grid place-items-center'
          style={{ height: 'calc(100dvh - 70px)' }}
        >
          <Spinner className='size-10' />
        </div>
      )}
      {(error || !id) && <Navigate to={'/404'} />}
      {!isLoading && data && (
        <motion.main
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={animationNormally}
          className='px-3 mt-4'
          style={{ minHeight: FORMULA_FULL_DVH_WO_FOOTER_AND_HEADER }}
        >
          <div className='flex items-start max-md:flex-col gap-6 max-md:gap-4 *:w-1/2 max-md:*:w-full'>
            <div className='grid place-items-center'>
              <img
                src={getPathToImage(data.photo_url)}
                alt='Картинка которую выставил продавец, но у вас она не загрузилась'
                className='w-full rounded-sm'
              />
            </div>
            <div>
              <div className='first-information'>
                <Badge
                  variant='outline'
                  className='gap-1.5 text-base px-3 mb-5 max-md:mb-2 max-md:text-sm'
                >
                  <IdCard /> <b>ID:</b> {data.id}
                </Badge>
                <h1 className='text-3xl font-semibold max-md:text-2xl'>{data.title}</h1>
                <p className='text-muted-foreground mb-5'>
                  Создано{' '}
                  <span className='text-blue-400 font-medium'>
                    @{data.creator.nickname}
                  </span>
                </p>
                <div className='stat grid grid-cols-2 grid-rows-subgrid gap-4 max-lg:gap-2 max-[27rem]:grid-cols-3 max-[27rem]:*:col-span-full'>
                  {data.created_at && (
                    <Card>
                      <CardHeader>
                        <CardTitle>В продаже</CardTitle>
                        <CardDescription>
                          Сколько времени продукт в продаже
                        </CardDescription>
                        <CardContent className='p-0'>
                          <h1 className='font-bold text-xl'>{daysAgo} дней</h1>
                        </CardContent>
                      </CardHeader>
                    </Card>
                  )}
                  <Card>
                    <CardHeader>
                      <CardTitle>Создано</CardTitle>
                      <CardDescription>Когда продукт был опубликован</CardDescription>
                      <CardContent className='p-0'>
                        <h1 className='font-bold text-xl'>
                          {new Intl.DateTimeFormat('ru-RU', {
                            month: 'long',
                            day: 'numeric',
                          }).format()}
                        </h1>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
                {(data.on_sale ?? true) && (
                  <div>
                    <BuyProductDrawer product={data}>
                      <Button
                        className='w-full mt-5'
                        size='lg'
                        disabled={userData ? userData.balance < data.price : true}
                      >
                        Купить за {data.price}{' '}
                        <span>
                          <Handshake />
                        </span>
                      </Button>
                    </BuyProductDrawer>
                  </div>
                )}
              </div>
              <Separator className='my-5' />
              <h1 className='font-semibold text-2xl mb-2'>Описание</h1>
              <p className='text-base text-muted-foreground'>{data.description}</p>
            </div>
          </div>
        </motion.main>
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
