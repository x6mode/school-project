import axios from 'axios';

import { BASE_URL } from '@/constant';

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export { AxiosInstance };
