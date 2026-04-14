export interface User {
    id: string;
    nickname: string;
    mail: string;
    created_at: string;
    balance: number;
    total_spent: number;
    total_earned: number;
    bankruptcy_count: number;
    can_declare_bankruptcy: boolean;
}

export interface UserProfile extends User {
    can_claim_daily_bonus: boolean;
    products_for_sale: Product[];
    purchased_products: PurchasedProduct[];
    balance_history: number[];
}

export interface Creator {
    id: string;
    nickname: string;
}

export interface Product {
    id: string;
    title: string;
    description?: string;
    price: number;
    photo_url: string;
    created_at?: string;
    on_sale?: boolean;
    creator?: Creator;
}

export interface PurchasedProduct extends Product {
    creator: Creator;
    purchased_at: string;
}

export interface ProductWithCreator extends Product {
    creator: Creator;
}

export interface ProductDetail extends Product {
    creator: Creator;
    purchased_at?: string;
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in?: number;
}

export interface AuthResponse {
    user: User;
    tokens: Tokens;
}

export interface RefreshResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface Pagination {
    page: number;
    per_page: number;
    total: number;
    pages: number;
}

export interface ProductsResponse {
    data: ProductWithCreator[];
    pagination: Pagination;
}

export interface SearchResponse {
    results: (ProductWithCreator & { relevance_score: number })[];
    pagination: Pagination;
}

export interface PurchaseHistoryItem {
    id: string;
    title: string;
    price: number;
    photo_url: string;
    purchased_at: string;
    seller: Creator;
}

export interface PurchaseHistoryResponse {
    data: PurchaseHistoryItem[];
    pagination: Pagination;
}

export interface SaleHistoryItem {
    id: string;
    title: string;
    price: number;
    commission: number;
    seller_gets: number;
    sold_at: string;
    buyer: Creator;
}

export interface SaleHistoryResponse {
    data: SaleHistoryItem[];
    pagination: Pagination;
}

export interface StatsResponse {
    balance_history: number[];
    total_spent: number;
    total_earned: number;
    current_balance: number;
    bankruptcy_count: number;
}

export interface DailyBonusResponse {
    message: string;
    bonus: number;
    new_balance: number;
}

export interface BankruptcyResponse {
    message: string;
    old_balance: number;
    new_balance: number;
    bankruptcy_count: number;
    last_bankruptcy: string;
    can_declare_bankruptcy: boolean;
}

export interface RemoveResponse {
    message: string;
    product_id: string;
}

export interface Player {
    id: string;
    nickname: string;
    balance: number;
    bankruptcy_count: number;
    created_at: string;
}

export interface PlayersResponse {
    players: Player[];
    pagination: Pagination;
}

export interface ErrorResponse {
    error: string;
}

export interface CreateProductData {
    title: string;
    price: number;
    description?: string;
    image: File;
}

export interface RegisterData {
    login: string;
    mail: string;
    password: string;
}

export interface LoginData {
    login: string;
    password: string;
}

export interface RefreshData {
    refresh_token: string;
}

export interface HealthResponse {
    status: string;
    timestamp: string;
    version: string;
}