import type { ReactNode } from 'react';

import ProductSellingItem from '@/components/widgets/product-selling-item';

const SellingListLayout = (): ReactNode => {
  return (
    <div className='grid gap-4 grid-cols-2 max-lg:gap-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 w-full'>
      <ProductSellingItem />
      <ProductSellingItem />
      <ProductSellingItem />
      <ProductSellingItem />
      <ProductSellingItem />
      <ProductSellingItem />
      <ProductSellingItem />
      <ProductSellingItem />
    </div>
  );
};

export default SellingListLayout;
