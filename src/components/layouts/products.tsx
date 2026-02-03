import type { ReactNode } from 'react';
import type { TProduct } from '@/app/types/product';

import ProductItem from '@/components/widgets/product-item';

type TProps = {
  products: TProduct[] | undefined;
};

const ProductsLayout = ({ products }: TProps): ReactNode => {
  return (
    <div className='grid gap-4 grid-cols-2 max-lg:gap-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 w-full'>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
    </div>
  );
};

export default ProductsLayout;
