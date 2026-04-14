import { useInfiniteQuery } from '@tanstack/react-query';
import type { ProductsResponse } from '@/app/types/api';
import MarketApiInstance from '@/service/api.service';

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
        pageSize = 14,
        enabled = true,
        staleTime = 5 * 60 * 1000, // 5 минут
        cacheTime = 10 * 60 * 1000, // 10 минут
    } = params || {};

    return useInfiniteQuery<ProductsResponse, Error, ProductsInfiniteData>({
        queryKey: ['products', 'infinite', pageSize],
        queryFn: ({ pageParam }) => fetchProducts({ page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.pagination.page < lastPage.pagination.pages) {
                return lastPage.pagination.page + 1;
            }
            return undefined;
        },
        getPreviousPageParam: (firstPage, allPages) => {
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
    
    const allProducts = infiniteQuery.data?.pages.flatMap(page => page.data) ?? [];
    
    const paginationInfo = infiniteQuery.data?.pages[infiniteQuery.data.pages.length - 1]?.pagination;
    
    return {
        ...infiniteQuery,
        allProducts,
        totalProducts: paginationInfo?.total ?? 0,
        totalPages: paginationInfo?.pages ?? 0,
        hasMore: infiniteQuery.hasNextPage,
        loadMore: infiniteQuery.fetchNextPage,
    };
};