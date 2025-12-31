import type { ReactNode } from 'react';

import { Separator } from '@/components/shared/separator';
// import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/shared/empty';

import ProductItem from '@/components/widgets/product-item';

const MarketplaceLayout = (): ReactNode => {
  return (
    <main className='mt-20 px-3 max-lg:mt-10'>
      <div className='grid place-items-center'>
        <h1 className='text-3xl font-semibold'>Маркетплейс</h1>
        <p className='text-neutral-400 text-lg text-center'>
          Место продажи и покупки, найдите нужный товар затем нажмите на него для подробностей
        </p>
        <div className='w-1/2 my-6'>
          <Separator />
        </div>
      </div>
      {/* <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <FileX />
          </EmptyMedia>
          <EmptyTitle>Похоже товаров нет!</EmptyTitle>
          <EmptyDescription>Видимо никто не выставил ни одного товара на продажу :(</EmptyDescription>
        </EmptyHeader>
      </Empty> */}
      <div className='grid gap-4 grid-cols-2 max-lg:gap-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 w-full'>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </main>
  );
};

export default MarketplaceLayout;
