import type { TPagination } from './pagination';
import type { TProduct } from './product';

type TApiDataFieldOverride<T> = { data: T };

type TPaginatedProducts = TApiDataFieldOverride<TProduct[]> & TPagination;

export type { TPaginatedProducts, TApiDataFieldOverride };
