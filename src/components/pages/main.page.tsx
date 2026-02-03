import type { ReactNode } from 'react';

import Header from '@/components/widgets/header';
import Footer from '@/components/widgets/footer';

import WelcomeLayout from '@/components/layouts/welcome';
import OpportunityLayout from '@/components/layouts/opportunity';
import MarketplaceLayout from '@/components/layouts/marketplace';

const MainPage = (): ReactNode => {
  return (
    <div className='page'>
      <Header />
      <WelcomeLayout />
      <OpportunityLayout />
      <MarketplaceLayout />
      <Footer />
    </div>
  );
};

export default MainPage;
