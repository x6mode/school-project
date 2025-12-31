import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/button';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemTitle } from '@/components/shared/item';

import { CornerDownRight, Handshake } from 'lucide-react';

import { AppRoutes } from '@/constant';

const ProductItem = (): ReactNode => {
  return (
    <Item
      variant='outline'
      className='w-full p-3 max-lg:p-2'
    >
      <ItemHeader>
        <img
          src='https://i.ibb.co/w8MwBXv/36ea842b-23d8-458f-86e9-f383bf6538db.jpg'
          alt='Фотография'
          className='aspect-square w-full rounded-sm object-cover'
        />
      </ItemHeader>
      <ItemContent className='flex-col-reverse'>
        <ItemTitle className='font-medium text-base'>Грустное лето</ItemTitle>
        <ItemDescription>IvanR35</ItemDescription>
      </ItemContent>
      <ItemFooter className='flex w-full justify-between items-center'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg'>1599</h1>
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
          <Link to={AppRoutes.Product.replace(':id', '123')}>
            <CornerDownRight />
          </Link>
        </Button>
      </ItemFooter>
    </Item>
  );
};

export default ProductItem;
