import type { ReactNode } from 'react';
import type { TOpportunity } from '@/app/types/ui';

import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/shared/item';

type TProps = {
  opportunity: TOpportunity & { index: number };
};

const Opportunity = ({ opportunity }: TProps): ReactNode => {
  return (
    <Item
      variant='outline'
      className='items-start'
    >
      <ItemContent>
        <h1 className='mb-0.5 text-zinc-500 text-base tracking-widest'>
          0{opportunity.index + 1}
        </h1>
        <ItemTitle className='text-lg mb-1 max-lg:mb-0.5'>
          <h1 className='uppercase font-normal tracking-widest'>{opportunity.title}</h1>
        </ItemTitle>
        <ItemDescription className='flex text-base text-muted-foreground max-lg:text-sm max-lg:leading-5'>
          {opportunity.description}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default Opportunity;
