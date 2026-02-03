import type { ReactNode } from 'react';

import Header from '@/components/widgets/header';
import Footer from '@/components/widgets/footer';

import SellingListLayout from '@/components/layouts/selling-list';

import { Separator } from '@/components/shared/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/tabs';

const ProfilePage = (): ReactNode => {
  return (
    <div className='page'>
      <Header />
      <main className='px-3 mt-4'>
        <Tabs
          className='grid place-items-center'
          defaultValue='sell'
        >
          <TabsList className='max-w-xl w-full h-min *:py-2 gap-1'>
            <TabsTrigger value='buy'>Мои покупки</TabsTrigger>
            <TabsTrigger value='sell'>Мои продажи</TabsTrigger>
            <TabsTrigger value='settings'>Настройки</TabsTrigger>
          </TabsList>
          <TabsContent value='buy'></TabsContent>
          <TabsContent
            value='sell'
            className='perspective-anim'
          >
            <h1 className='text-center w-full mt-1 text-lg text-muted-foreground'>
              Страница на которой показаны ваши текущие выставленные товары
            </h1>
            <div className='w-full my-6 grid place-items-center'>
              <Separator
                orientation='horizontal'
                className='w-1/2!'
              />
            </div>
            <SellingListLayout />
          </TabsContent>
          <TabsContent value='settings'></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
