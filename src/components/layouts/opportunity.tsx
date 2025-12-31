import type { ReactNode } from 'react';

import { ItemGroup } from '@/components/shared/item';

import Opportunity from '@/components/widgets/opportunity';

import { opportunity } from '@/locale';

const OpportunityLayout = (): ReactNode => {
  return (
    <ItemGroup className='gap-6 max-lg:flex-col px-3 max-lg:gap-2 grid grid-cols-4 max-lg:grid-cols-2 max-lg:grid-rows-2 auto-rows-auto'>
      {opportunity.map((opportunity) => (
        <Opportunity
          key={opportunity.title}
          opportunity={opportunity}
        />
      ))}
    </ItemGroup>
  );
};

export default OpportunityLayout;
