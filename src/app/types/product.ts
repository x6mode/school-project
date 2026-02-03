import type { TAccount } from './account';

type TProduct = {
  id: string;
  photo_url: string;
  creator: TAccount;
  title: string;
  current_price: number
};

export type { TProduct };
