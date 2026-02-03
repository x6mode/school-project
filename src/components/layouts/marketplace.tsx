import { type ReactNode } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Button } from '@/components/shared/button';
import { Separator } from '@/components/shared/separator';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shared/empty';

import ProductsLayout from '@/components/layouts/products';

import { ChevronRight, FileX, RefreshCcwIcon } from 'lucide-react';

import { getAllProducts } from '@/endpoints/query/getAllProducts';

import { getNextPageParam } from '@/utils/getNextPageParam';

const MarketplaceLayout = (): ReactNode => {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['products'],
      queryFn: getAllProducts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        getNextPageParam(lastPage.pagination.page, lastPage.pagination.pages),
    });

  const allItems = data?.pages.flatMap((page) => page.data) || [];

  return (
    <main className='mt-20 px-3 max-lg:mt-10'>
      <div className='grid place-items-center'>
        <h1 className='text-3xl font-semibold mb-1'>Маркетплейс</h1>
        <p className='text-muted-foreground text-lg text-center'>
          Место продажи и покупки, найдите нужный товар затем нажмите на него для
          подробностей
        </p>
        <div className='w-1/2 my-6'>
          <Separator />
        </div>
      </div>
      {((allItems.length === 0 && !isLoading) || (isError && allItems.length !== 0)) && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <FileX />
            </EmptyMedia>
            <EmptyTitle>Похоже товаров нет!</EmptyTitle>
            <EmptyDescription>
              Видимо никто не выставил ни одного товара на продажу :(
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCcwIcon />
              Обновить
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <ProductsLayout products={allItems} />

      {hasNextPage && (
        <div className='w-full *:mt-4 grid place-items-center'>
          <Button
            onClick={() => fetchNextPage({ cancelRefetch: true })}
            disabled={isLoading}
          >
            Загрузить еще <ChevronRight />
          </Button>
        </div>
      )}
    </main>
  );
};

export default MarketplaceLayout;
