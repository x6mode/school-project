import type { ReactNode } from 'react';
import type { TProduct } from '@/app/types/product';

import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from '@/components/shared/item';

import { CornerDownRight, Handshake } from 'lucide-react';

import { AppRoutes } from '@/constant';

import { getPathToImage } from '@/utils/getPathToImage';

type TProps = {
  product: TProduct;
};

const ProductItem = ({ product }: TProps): ReactNode => {
  return (
    <Item
      variant='outline'
      className='w-full p-3 max-lg:p-2'
    >
      <ItemHeader>
        <img
          src={getPathToImage(product.photo_url)}
          alt='Фотография'
          className='aspect-square w-full rounded-sm object-cover'
        />
      </ItemHeader>
      <ItemContent className='flex-col-reverse'>
        <ItemTitle className='font-medium text-base'>{product.title}</ItemTitle>
        <ItemDescription>{product.creator.nickname}</ItemDescription>
      </ItemContent>
      <ItemFooter className='flex w-full justify-between items-center'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg'>{product.current_price}</h1>
          <Handshake
            size={18}
            className='opacity-50'
          />
        </div>
        <Button
          asChild
          variant='outline'
          size='icon'
        >
          <Link
            to={AppRoutes.Product.replace(':id', product.id)}
            state={product}
          >
            <CornerDownRight />
          </Link>
        </Button>
      </ItemFooter>
    </Item>
  );
};

export default ProductItem;
