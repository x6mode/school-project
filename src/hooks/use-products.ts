import { useInfiniteQuery } from '@tanstack/react-query';
import MarketApiInstance from '@/service/api.service';

import type { ProductsResponse } from '@/app/types/api';

interface ProductsInfiniteData {
  pages: ProductsResponse[];
  pageParams: number[];
}

interface UseProductsInfiniteParams {
  pageSize?: number;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

const fetchProducts = async ({ page = 1 }): Promise<ProductsResponse> => {
  const response = await MarketApiInstance.getProducts({ page });
  return response;
};

export const useProductsInfinite = (params?: UseProductsInfiniteParams) => {
  const {
    enabled = true,
    staleTime = 0, // 5 минут
    cacheTime = 0, // 10 минут
  } = params || {};

  return useInfiniteQuery<ProductsResponse, Error, ProductsInfiniteData>({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination.page > 1) {
        return firstPage.pagination.page - 1;
      }
      return undefined;
    },
    enabled,
    staleTime,
    gcTime: cacheTime,
  });
};

export const useAllProducts = (params?: UseProductsInfiniteParams) => {
  const infiniteQuery = useProductsInfinite(params);

  const allProducts = infiniteQuery.data?.pages.flatMap((page) => page.data) ?? [];

  const paginationInfo =
    infiniteQuery.data?.pages[infiniteQuery.data.pages.length - 1]?.pagination;

  return {
    ...infiniteQuery,
    allProducts,
    totalProducts: paginationInfo?.total ?? 0,
    totalPages: paginationInfo?.pages ?? 0,
    hasMore: infiniteQuery.hasNextPage,
    loadMore: infiniteQuery.fetchNextPage,
  };
};
