import type { TApiDataFieldOverride } from '@/app/types/api';
import type { TProduct } from '@/app/types/product';

import { BackendRoutes } from '@/constant';

import { AxiosInstance } from '@/service/axios.service';

export const getProductById = async (
  id: string,
): Promise<TApiDataFieldOverride<TProduct>> => {
  const { data } = await AxiosInstance.get(BackendRoutes.Product.replace(':id', id));

  return data;
};
