import { BASE_URL } from '@/constant';

export const getPathToImage = (apiPath: string) => {
  apiPath = apiPath.replace('/api', '');
  return `${BASE_URL}${apiPath}`;
};
