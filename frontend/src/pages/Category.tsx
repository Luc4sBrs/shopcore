import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { categoryApi, productApi } from '../api';
import type { Category, Product } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorState from './Error';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ['category', slug],
    queryFn: async (): Promise<Category | undefined> => {
      const response = await categoryApi.getAll();
      const found = (response.data ?? []).find((item) => item.slug === slug);
      if (!found) {
        throw new Error('Categoria não encontrada');
      }
      return found;
    },
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products', { categoryId: category?.id }],
    queryFn: () =>
      productApi
        .getAll({ categoryId: category?.id ?? 0, page: 0, size: 12 })
        .then((response) => response.data),
    enabled: Boolean(category),
  });

  const products: Product[] = productsData?.content ?? [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {categoryLoading ? (
          <Loading />
        ) : categoryError ? (
          <ErrorState message="Não foi possível carregar a categoria." />
        ) : !category ? (
          <div className="bg-surface border border-slate-200 rounded-2xl p-10 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Categoria não encontrada</h1>
            <p className="text-slate-500 mb-6">A categoria solicitada não existe no marketplace.</p>
            <Link to="/products" className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              Ver todos os produtos
            </Link>
          </div>
        ) : productsLoading ? (
          <Loading />
        ) : productsError ? (
          <ErrorState message="Não foi possível carregar os produtos desta categoria." />
        ) : products.length === 0 ? (
          <div className="bg-surface border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500">Nenhum produto encontrado nesta categoria.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Link to="/products" className="text-primary font-medium hover:underline text-sm">
                ← Voltar ao catálogo
              </Link>
              <h1 className="text-3xl font-bold text-slate-900 mt-2">{category.name}</h1>
              {category.description && <p className="text-slate-500 mt-2">{category.description}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
