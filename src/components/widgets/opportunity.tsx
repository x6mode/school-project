import type { ReactNode } from 'react';
import type { TOpportunity } from '@/app/types/ui';

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/shared/item';

type TProps = {
  opportunity: TOpportunity;
};

const Opportunity = ({ opportunity }: TProps): ReactNode => {
  return (
    <Item
      variant='outline'
      className='items-start'
    >
      <ItemMedia variant='icon'>{opportunity.icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>
          <h1 className='text-xl max-lg:text-lg'>{opportunity.title}</h1>
        </ItemTitle>
        <ItemDescription className='flex text-base'>{opportunity.description}</ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default Opportunity;
