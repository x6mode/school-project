import type { ReactNode } from 'react';

import { useUserStore } from '@/app/store/store';
import { useNavigate } from 'react-router-dom';

import MarketApiInstance from '@/service/api.service';

import { Button } from '@/components/shared/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shared/card';

import Header from '@/components/widgets/header';
import Footer from '@/components/widgets/footer';

import SellingListLayout from '@/components/layouts/selling-list';
import BoughtListLayout from '@/components/layouts/bought-list';
import ProfileBalanceHistoryLayout from '@/components/layouts/profile-balance-history';

import { Separator } from '@/components/shared/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/tabs';

import { AppRoutes, FORMULA_FULL_DVH_WO_FOOTER_AND_HEADER } from '@/constant';

const ProfilePage = (): ReactNode => {
  const navigate = useNavigate();

  const data = useUserStore((state) => state.data)!;
  const { resetData, setData } = useUserStore();

  return (
    <div className='page'>
      <Header />
      <main
        className='px-3 my-4 w-full'
        style={{ minHeight: FORMULA_FULL_DVH_WO_FOOTER_AND_HEADER }}
      >
        <div className='flex gap-4 max-lg:flex-col mb-4 w-full'>
          <p className='text-muted-foreground/50 italic hidden max-lg:block'>
            *График истории цены доступен только на широких экранах
          </p>
          <Card className='w-1/2 max-lg:w-full max-lg:hidden'>
            <CardHeader>
              <CardTitle>История баланса</CardTitle>
              <CardDescription>
                График покажет как менялся баланс за <b>30 дней</b>
              </CardDescription>
              <CardContent className='px-0'>
                <ProfileBalanceHistoryLayout balance_history={data.balance_history} />
              </CardContent>
            </CardHeader>
          </Card>
          <div className='w-1/2 flex gap-4 max-lg:w-full max-lg:flex-col max-lg:*:w-full'>
            <Card className='w-1/2'>
              <CardHeader>
                <CardTitle>Действия с аккаунтом</CardTitle>
                <CardDescription>Нажмите чтобы выполнить действие</CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col-reverse gap-2'>
                <Button
                  size={'sm'}
                  variant={'destructive'}
                  onClick={() => {
                    navigate(AppRoutes.Main);
                    resetData();
                    MarketApiInstance.clearToken('access');
                    MarketApiInstance.clearToken('refresh');
                  }}
                >
                  Выйти c аккаунта
                </Button>
                <Button
                  disabled={!data.can_declare_bankruptcy}
                  size={'sm'}
                  variant={'destructive'}
                  onClick={async () => {
                    const { new_balance } = await MarketApiInstance.declareBankruptcy();
                    setData({
                      ...data,
                      balance: new_balance,
                      can_declare_bankruptcy: false,
                      bankruptcy_count: data.bankruptcy_count + 1,
                    });
                  }}
                >
                  Обанкротится
                </Button>
                <Button
                  size={'sm'}
                  variant={'secondary'}
                  disabled={!data.can_claim_daily_bonus}
                  onClick={async () => {
                    const { new_balance } = await MarketApiInstance.claimDailyBonus();
                    setData({
                      ...data,
                      balance: new_balance,
                      can_claim_daily_bonus: false,
                    });
                  }}
                >
                  Получить ежедневный бонус
                </Button>
              </CardContent>
            </Card>
            <Card className='w-1/2'>
              <CardHeader>
                <CardTitle>Ваша информация</CardTitle>
                <CardDescription>Некоторые ваши данные</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className='*:*:nth-[2]:text-muted-foreground max-lg:text-sm w-full'>
                  <li className='max-w-full overflow-hidden whitespace-nowrap text-ellipsis'>
                    <b>ID:</b> <span>{data.id.slice(0, 13)}</span>
                  </li>
                  <li>
                    <b>E-mail:</b> <span>{data.mail}</span>
                  </li>
                  <li>
                    <b>Никнейм:</b> <span>{data.nickname}</span>
                  </li>
                  <li>
                    <b>Баланс:</b> <span>{data.balance} AC</span>
                  </li>
                  <li>
                    <b>Банкротств:</b> <span>{data.bankruptcy_count} раз</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
        <Tabs
          className='grid place-items-center'
          defaultValue='sell'
        >
          <TabsList className='max-w-xl w-full h-min *:py-2 gap-1'>
            <TabsTrigger value='buy'>Что я купил</TabsTrigger>
            <TabsTrigger value='sell'>Выставленные товары</TabsTrigger>
          </TabsList>
          <TabsContent
            value='buy'
            className='perspective-anim'
          >
            <h1 className='text-center w-full mt-1 text-lg text-muted-foreground'>
              Страница на которой показаны что вы купили
            </h1>
            <div className='w-full my-6 grid place-items-center'>
              <Separator
                orientation='horizontal'
                className='w-1/2!'
              />
            </div>
            <BoughtListLayout />
          </TabsContent>
          <TabsContent
            value='sell'
            className='perspective-anim'
          >
            <h1 className='text-center w-full mt-1 text-lg text-muted-foreground'>
              Страница на которой показаны ваши выставленные товары
            </h1>
            <div className='w-full my-6 grid place-items-center'>
              <Separator
                orientation='horizontal'
                className='w-1/2!'
              />
            </div>
            <SellingListLayout />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
