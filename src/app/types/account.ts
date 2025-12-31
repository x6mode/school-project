import type { TProduct } from './product';

type TAccount = {
  id: string;
  bayed: TProduct[];
  nickname: string;
  mail: string;
  createAt: Date;
  posted: TProduct[];
};

export type { TAccount };
