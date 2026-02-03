import type { TPaginatedProducts } from '@/app/types/api';

import { BackendRoutes } from '@/constant';

import { AxiosInstance } from '@/service/axios.service';

export const getAllProducts = async ({ pageParam = 1 }): Promise<TPaginatedProducts> => {
  const { data } = await AxiosInstance.get(BackendRoutes.Products + `?page=${pageParam}`);

  return data;
};
