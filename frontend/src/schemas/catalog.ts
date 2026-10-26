import { z } from 'zod';

export const catalogQuerySchema = z.object({
  q: z.string().max(100).optional(),
  categoryId: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sort: z.string().default('id,asc'),
  page: z.string().default('0'),
  size: z.string().default('12'),
});

export type CatalogQuery = z.infer<typeof catalogQuerySchema>;

export const emptyCatalogQuery: CatalogQuery = {
  q: '',
  categoryId: '',
  minPrice: '',
  maxPrice: '',
  sort: 'id,asc',
  page: '0',
  size: '12',
};

export const SORT_OPTIONS = [
  { value: 'id,asc', label: 'Relevância' },
  { value: 'id,desc', label: 'ID (decrescente)' },
  { value: 'createdAt,desc', label: 'Novidades' },
  { value: 'soldQuantity,desc', label: 'Mais Vendidos' },
  { value: 'price,asc', label: 'Menor Preço' },
  { value: 'price,desc', label: 'Maior Preço' },
];
