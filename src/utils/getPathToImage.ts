import { BASE_URL } from '@/constant';

import MarketApiInstance from '@/service/api.service';

export const getPathToImage = (apiPath: string) => {
  apiPath = apiPath.replace('/api', '');
  return `${BASE_URL}${apiPath}?token=${MarketApiInstance.getToken('access')}`;
};
