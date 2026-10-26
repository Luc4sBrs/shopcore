export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
  soldQuantity?: number | null;
  isFeatured: boolean;
  createdAt?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ProductQueryParams {
  q?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sort?: string;
}
