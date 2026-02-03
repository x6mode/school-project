export const getNextPageParam = (current: number, total: number) =>
  current === total ? undefined : current + 1;
