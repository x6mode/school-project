import type { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/shared/charts';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

import { Handshake, IdCard } from 'lucide-react';

import { getProductById } from '@/endpoints/query/getProductById';

import { getPathToImage } from '@/utils/getPathToImage';

import { animationNormally } from '@/constant';

const chartData = [
  { date: '01.20.1999', quantity: 10 },
  { date: '02.20.1999', quantity: 120 },
  { date: '03.20.1999', quantity: 30 },
  { date: '04.20.1999', quantity: 160 },
  { date: '05.20.1999', quantity: 70 },
  { date: '06.20.1999', quantity: 80 },
];
const chartConfig = {
  quantity: {
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

const ProductPage = (): ReactNode => {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
    select: ({ data }) => data,
    enabled: !!id,
  });

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
                  <Card>
                    <CardHeader>
                      <CardTitle>В продаже</CardTitle>
                      <CardDescription>Сколько времени продукт в продаже</CardDescription>
                      <CardContent className='p-0'>
                        <h1 className='font-bold text-xl'>Com. Soon</h1>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Создано</CardTitle>
                      <CardDescription>Когда продукт был опубликован</CardDescription>
                      <CardContent className='p-0'>
                        <h1 className='font-bold text-xl'>Com. Soon</h1>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card className='col-span-full h-full'>
                    <CardHeader>
                      <CardTitle>История изменения цены</CardTitle>
                      <CardDescription>
                        График покажет как менялась цена в течение <b>7 дней</b>
                      </CardDescription>
                      <CardContent className='p-0 *:not-last:mr-2 *:text-sm'>
                        <ChartContainer
                          className='max-h-75 w-full'
                          config={chartConfig}
                        >
                          <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                              top: 26,
                              left: 12,
                              right: 12,
                            }}
                          >
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey='date'
                              tickLine={true}
                              axisLine={false}
                              tickMargin={8}
                              tickFormatter={(value) => value.slice(0, 2)}
                            />
                            <ChartTooltip
                              cursor={true}
                              content={
                                <ChartTooltipContent
                                  hideIndicator
                                  hideLabel
                                  formatter={(value) => (
                                    <div className='flex items-center gap-2'>
                                      <p className='text-sm'>{value}</p>
                                      <span>
                                        <Handshake className='h-5' />
                                      </span>
                                    </div>
                                  )}
                                />
                              }
                            />
                            <Line
                              dataKey='quantity'
                              type='monotone'
                              stroke='var(--color-blue-400)'
                              strokeWidth={2}
                              dot={{
                                fill: 'var(--color-blue-400)',
                                r: 4,
                              }}
                              activeDot={{
                                r: 6,
                                fill: 'var(--color-blue-600)',
                              }}
                            >
                              <LabelList
                                position='top'
                                offset={14}
                                className='fill-white'
                                fontSize={14}
                              />
                            </Line>
                          </LineChart>
                        </ChartContainer>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
                <div>
                  <BuyProductDrawer product={data}>
                    <Button
                      className='w-full mt-5'
                      size='lg'
                    >
                      Подписаться за {data.current_price}{' '}
                      <span>
                        <Handshake />
                      </span>
                    </Button>
                  </BuyProductDrawer>
                </div>
              </div>
              <Separator className='my-5' />
              <h1 className='font-semibold text-2xl mb-2'>Описание</h1>
              <p className='text-base text-muted-foreground'>Com. Soon</p>
            </div>
          </div>
        </motion.main>
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
