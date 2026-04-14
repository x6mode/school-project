import type { ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';

import MarketApiInstance from '@/service/api.service';

import ProductItem from '@/components/widgets/product-item';

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/shared/empty';

import { FileX } from 'lucide-react';

const BoughtListLayout = (): ReactNode => {
  const { data, isLoading } = useQuery({
    queryKey: ['buyed_products'],
    queryFn: () => MarketApiInstance.getProfile(),
  });

  return (
    <div
      className={`grid gap-4 grid-cols-2! max-lg:gap-2 sm:grid-cols-2! lg:grid-cols-5! xl:grid-cols-7! w-full ${!data || data.purchased_products.length == 0 ? 'flex! justify-center! items-center!' : ''}`}
    >
      {(!data || data.purchased_products.length == 0 || isLoading) && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <FileX />
            </EmptyMedia>
            <EmptyTitle>Похоже товаров нет!</EmptyTitle>
            <EmptyDescription>Видимо вы не выставили ни одного :(</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {data &&
        !isLoading &&
        data.purchased_products.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
          />
        ))}
    </div>
  );
};

export default BoughtListLayout;
