import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { productApi, categoryApi } from '../api';
import type { Category, Product, ProductQueryParams } from '../types';
import { catalogQuerySchema, emptyCatalogQuery, SORT_OPTIONS } from '../schemas/catalog';
import type { CatalogQuery } from '../schemas/catalog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Error from './Error';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedQuery = useMemo(() => {
    const result = catalogQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (result.success) {
      return result.data;
    }
    return { ...emptyCatalogQuery };
  }, [searchParams]);

  const filters = useMemo<ProductQueryParams>(
    () => ({
      q: parsedQuery.q || undefined,
      categoryId: parsedQuery.categoryId ? Number(parsedQuery.categoryId) : undefined,
      minPrice: parsedQuery.minPrice ? Number(parsedQuery.minPrice) : undefined,
      maxPrice: parsedQuery.maxPrice ? Number(parsedQuery.maxPrice) : undefined,
      sort: parsedQuery.sort,
      page: Number(parsedQuery.page),
      size: Number(parsedQuery.size),
    }),
    [parsedQuery],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getAll(filters).then((response) => response.data),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await categoryApi.getAll()).data,
  });

  const form = useForm<CatalogQuery, any, CatalogQuery>({
    resolver: zodResolver(catalogQuerySchema) as Resolver<CatalogQuery>,
    defaultValues: { ...emptyCatalogQuery },
  });

  useEffect(() => {
    form.reset(parsedQuery);
  }, [parsedQuery, form]);

  const products = data?.content ?? [];
  const categoriesList = categories ?? [];
  const activeCategory = categoriesList.find(
    (category: Category) => category.id === filters.categoryId,
  );

  const onSubmit = (values: CatalogQuery) => {
    const next = new URLSearchParams();
    if (values.q) next.set('q', values.q);
    if (values.categoryId) next.set('categoryId', values.categoryId);
    if (values.minPrice) next.set('minPrice', values.minPrice);
    if (values.maxPrice) next.set('maxPrice', values.maxPrice);
    if (values.sort) next.set('sort', values.sort);
    next.set('page', values.page && values.page !== '0' ? values.page : '0');
    next.set('size', values.size && values.size !== '12' ? values.size : '12');
    setSearchParams(next);
  };

  const clearFilters = () => {
    form.reset(emptyCatalogQuery);
    setSearchParams(new URLSearchParams());
  };

  const goToPage = (page: number) => {
    const next = new URLSearchParams();
    if (filters.q) next.set('q', filters.q);
    if (filters.categoryId) next.set('categoryId', String(filters.categoryId));
    if (filters.minPrice != null) next.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice != null) next.set('maxPrice', String(filters.maxPrice));
    if (filters.sort) next.set('sort', filters.sort);
    next.set('page', String(page));
    next.set('size', String(filters.size));
    setSearchParams(next);
  };

  const currentPage = Number(filters.page);

  const heading = filters.q
    ? `Busca: ${filters.q}`
    : activeCategory
      ? activeCategory.name
      : 'Catálogo';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{heading}</h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-surface border border-slate-200 rounded-2xl p-4 sm:p-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
        >
          <div>
            <label htmlFor="catalog-q" className="block text-sm font-medium text-slate-700 mb-1">
              Buscar
            </label>
            <input
              id="catalog-q"
              type="text"
              placeholder="Nome do produto"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...form.register('q')}
            />
          </div>

          <div>
            <label htmlFor="catalog-category" className="block text-sm font-medium text-slate-700 mb-1">
              Categoria
            </label>
            <select
              id="catalog-category"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...form.register('categoryId')}
            >
              <option value="">Todas</option>
              {categoriesList.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="catalog-min-price" className="block text-sm font-medium text-slate-700 mb-1">
              Preço mínimo
            </label>
            <input
              id="catalog-min-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...form.register('minPrice')}
            />
          </div>

          <div>
            <label htmlFor="catalog-max-price" className="block text-sm font-medium text-slate-700 mb-1">
              Preço máximo
            </label>
            <input
              id="catalog-max-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="10000"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...form.register('maxPrice')}
            />
          </div>

          <div>
            <label htmlFor="catalog-sort" className="block text-sm font-medium text-slate-700 mb-1">
              Ordenação
            </label>
            <select
              id="catalog-sort"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              {...form.register('sort')}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2 lg:col-span-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="border border-slate-300 text-slate-700 font-semibold px-6 py-2 rounded-lg hover:bg-background transition-colors"
            >
              Limpar
            </button>
          </div>
        </form>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error message="Não foi possível carregar os produtos. Verifique sua conexão e tente novamente." />
        ) : products.length === 0 ? (
          <div className="bg-surface border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500 mb-4">Nenhum produto encontrado para os filtros aplicados.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-between mt-10">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="bg-surface border border-slate-300 px-4 py-2 rounded-lg font-medium text-slate-700 disabled:opacity-40 hover:bg-background transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm text-slate-500">
                  Página {currentPage + 1} de {data.totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= data.totalPages - 1}
                  className="bg-surface border border-slate-300 px-4 py-2 rounded-lg font-medium text-slate-700 disabled:opacity-40 hover:bg-background transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
