import type { ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';

import MarketApiInstance from '@/service/api.service';

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/shared/empty';
import ProductSellingItem from '@/components/widgets/product-selling-item';

import { FileX } from 'lucide-react';

const SellingListLayout = (): ReactNode => {
  const { data } = useQuery({
    queryKey: ['selling_products'],
    queryFn: () => MarketApiInstance.getProfile(),
  });

  return (
    <div
      className={`grid place-items-center gap-4 grid-cols-2! max-lg:gap-2 sm:grid-cols-2! lg:grid-cols-5! xl:grid-cols-7! w-full ${!data || data.products_for_sale.length == 0 ? 'flex! justify-center! items-center!' : ''}`}
    >
      {(!data || data.products_for_sale.length == 0) && (
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
        data.products_for_sale.map((item) => (
          <ProductSellingItem
            product={item}
            profile={{ id: data.id, nickname: data.nickname }}
          />
        ))}
    </div>
  );
};

export default SellingListLayout;
