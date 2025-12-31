import type { TAccount } from './account';

type TProduct = {
  id: string;
  photoUrl: string;
  creator: TAccount;
  title: string;
  description: string;
  updatedAt: Date;
};

export type { TProduct };
