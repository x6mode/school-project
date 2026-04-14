import axios, { AxiosError } from 'axios';
import { BASE_URL } from '@/constant';

import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  UserProfile,
  ProductsResponse,
  ProductDetail,
  Product,
  AuthResponse,
  RefreshResponse,
  SearchResponse,
  PurchaseHistoryResponse,
  SaleHistoryResponse,
  StatsResponse,
  DailyBonusResponse,
  BankruptcyResponse,
  RemoveResponse,
  PlayersResponse,
  ErrorResponse,
  CreateProductData,
  RegisterData,
  LoginData,
  RefreshData,
  HealthResponse,
} from '@/app/types/api';
import { toast } from 'sonner';

class MarketApiClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
    config: AxiosRequestConfig;
  }> = [];

  constructor(baseUrl: string = 'http://localhost:5000/api') {
    this.baseUrl = baseUrl;

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.getToken('access')) {
          config.headers.Authorization = `Bearer ${this.getToken('access')}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        if (error.response?.status != 401 && error instanceof AxiosError) {
          toast.error((error as AxiosError<{ error: string }>).response?.data.error);
        }

        // @ts-ignore
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject, config: originalRequest });
            });
          }

          // @ts-ignore
          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            if (this.getToken('refresh')) {
              const { access_token } = await this.refreshAccessToken({
                refresh_token: this.getToken('refresh')!,
              });

              this.setToken('access', access_token);

              this.failedQueue.forEach(({ resolve, reject, config }) => {
                if (config.headers) {
                  config.headers.Authorization = `Bearer ${access_token}`;
                }
                this.axiosInstance(config)
                  .then((response) => resolve(response))
                  .catch((err) => reject(err));
              });

              this.failedQueue = [];

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
              }
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.failedQueue.forEach(({ reject }) => reject(refreshError));
            this.failedQueue = [];
            this.clearTokens();
            throw refreshError;
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      },
    );
  }

  // Очистка токенов
  clearTokens(): void {
    this.clearToken('access');
    this.clearToken('refresh');
  }

  // Обработка ошибок
  private handleError(error: AxiosError): Error {
    if (error.response) {
      const errorData = error.response.data as ErrorResponse;
      const message = errorData.error || error.message;
      return new Error(message);
    } else if (error.request) {
      return new Error('Нет ответа от сервера');
    } else {
      return new Error(error.message);
    }
  }

  // 1. Проверка работоспособности
  async health(): Promise<HealthResponse> {
    const response = await this.axiosInstance.get<HealthResponse>('/health');
    return response.data;
  }

  // 2. Регистрация
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>('/auth/register', data);
    if (response.data.tokens) {
      this.setToken('access', response.data.tokens.access_token);
      this.setToken('refresh', response.data.tokens.refresh_token);
    }
    return response.data;
  }

  // 3. Вход
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>('/auth/login', data);
    if (response.data.tokens) {
      this.setToken('access', response.data.tokens.access_token);
      this.setToken('refresh', response.data.tokens.refresh_token);
    }
    return response.data;
  }

  // 4. Обновление токена
  async refreshAccessToken(data: RefreshData): Promise<RefreshResponse> {
    const response = await this.axiosInstance.post<RefreshResponse>(
      '/auth/refresh',
      data,
    );
    this.setToken('access', response.data.access_token);
    return response.data;
  }

  // 5. Профиль пользователя
  async getProfile(): Promise<UserProfile> {
    const response = await this.axiosInstance.get<UserProfile>('/auth/profile');
    return response.data;
  }

  // 6. Список товаров (Главная страница)
  async getProducts({ page = 1 }: { page: number }): Promise<ProductsResponse> {
    const response = await this.axiosInstance.get<ProductsResponse>('/products', {
      params: { page },
    });
    return response.data;
  }

  // 7. Детальная информация о товаре
  async getProduct(productId: string): Promise<ProductDetail> {
    const response = await this.axiosInstance.get<ProductDetail>(
      `/products/${productId}`,
    );
    return response.data;
  }

  // 8. Создание товара / Перепродажа
  async createProduct(data: CreateProductData): Promise<Product> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    if (data.description) {
      formData.append('description', data.description);
    }
    formData.append('image', data.image);

    const response = await this.axiosInstance.post<Product>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // 9. Покупка товара
  async buyProduct(productId: string): Promise<ProductDetail> {
    const response = await this.axiosInstance.post<ProductDetail>(
      `/products/${productId}/buy`,
    );
    return response.data;
  }

  // 10. Снятие товара с продажи (удаление)
  async removeProduct(productId: string): Promise<RemoveResponse> {
    const response = await this.axiosInstance.post<RemoveResponse>(
      `/products/${productId}/remove`,
    );
    return response.data;
  }

  // 11. Поиск товаров
  async searchProducts(
    q: string,
    page: number = 1,
    minScore: number = 0.1,
  ): Promise<SearchResponse> {
    const response = await this.axiosInstance.get<SearchResponse>('/products/search', {
      params: { q, page, min_score: minScore },
    });
    return response.data;
  }

  // 12. История покупок
  async getPurchaseHistory(
    page: number = 1,
    perPage: number = 20,
  ): Promise<PurchaseHistoryResponse> {
    const response = await this.axiosInstance.get<PurchaseHistoryResponse>(
      '/account/purchases',
      {
        params: { page, per_page: perPage },
      },
    );
    return response.data;
  }

  // 13. История продаж
  async getSaleHistory(
    page: number = 1,
    perPage: number = 20,
  ): Promise<SaleHistoryResponse> {
    const response = await this.axiosInstance.get<SaleHistoryResponse>('/account/sales', {
      params: { page, per_page: perPage },
    });
    return response.data;
  }

  // 14. Статистика профиля
  async getStats(): Promise<StatsResponse> {
    const response = await this.axiosInstance.get<StatsResponse>('/account/stats');
    return response.data;
  }

  // 15. Ежедневный бонус
  async claimDailyBonus(): Promise<DailyBonusResponse> {
    const response =
      await this.axiosInstance.post<DailyBonusResponse>('/account/daily-bonus');
    return response.data;
  }

  // 16. Объявление банкротства
  async declareBankruptcy(): Promise<BankruptcyResponse> {
    const response =
      await this.axiosInstance.post<BankruptcyResponse>('/account/bankruptcy');
    return response.data;
  }

  // 17. Рейтинг игроков
  async getPlayersRating(
    page: number = 1,
    perPage: number = 20,
  ): Promise<PlayersResponse> {
    const response = await this.axiosInstance.get<PlayersResponse>('/players/rating', {
      params: { page, per_page: perPage },
    });
    return response.data;
  }

  // 18. Получение оригинального изображения (требуется токен, только для владельца)
  async getOriginalImage(
    fileId: string,
    responseType: 'blob' | 'arraybuffer' = 'blob',
  ): Promise<Blob | ArrayBuffer> {
    const response = await this.axiosInstance.get(`/images/original/${fileId}`, {
      responseType: responseType as 'blob',
    });
    return response.data;
  }

  // 19. Получение изображения с водяным знаком (доступно всем)
  async getWatermarkedImage(
    fileId: string,
    responseType: 'blob' | 'arraybuffer' = 'blob',
  ): Promise<Blob | ArrayBuffer> {
    const response = await this.axiosInstance.get(`/images/watermarked/${fileId}`, {
      responseType: responseType as 'blob',
    });
    return response.data;
  }

  // Вспомогательный метод для преобразования Blob в URL
  static blobToUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  // Вспомогательный метод для освобождения URL
  static revokeUrl(url: string): void {
    URL.revokeObjectURL(url);
  }

  // Получение экземпляра axios для прямого использования
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public getToken(name: 'access' | 'refresh') {
    return localStorage.getItem(`${name}-token`);
  }

  private setToken(name: 'access' | 'refresh', value: string) {
    return localStorage.setItem(`${name}-token`, value);
  }

  public clearToken(name: 'access' | 'refresh') {
    localStorage.removeItem(`${name}-token`);
  }
}

const MarketApiInstance = new MarketApiClient(BASE_URL);

export default MarketApiInstance;
