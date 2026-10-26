import axios from 'axios';
import type { Category, PaginatedResponse, Product, ProductQueryParams } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8090/api',
});

export const productApi = {
  getAll: (params: ProductQueryParams) =>
    api.get<PaginatedResponse<Product>>('/products', { params }),

  getFeatured: (page = 0, size = 12) =>
    api.get<PaginatedResponse<Product>>('/products/featured', { params: { page, size } }),

  getBestSellers: (page = 0, size = 4) =>
    api.get<PaginatedResponse<Product>>('/products/best-sellers', { params: { page, size } }),

  getById: (id: number) => api.get<Product>(`/products/${id}`),

  search: (q: string, page = 0, size = 12) =>
    api.get<PaginatedResponse<Product>>('/products/search', { params: { q, page, size } }),
};

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
};
