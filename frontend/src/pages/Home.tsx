import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Armchair,
  Cpu,
  Dumbbell,
  Gamepad2,
  Package,
  Shirt,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import heroImage from '../assets/hero.png';
import { categoryApi, productApi } from '../api';
import type { Category, Product } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Error from './Error';

const categoryIcons: Record<string, LucideIcon> = {
  tecnologia: Cpu,
  moda: Shirt,
  casa: Armchair,
  beleza: Sparkles,
  esportes: Dumbbell,
  games: Gamepad2,
};

const getCategoryIcon = (slug?: string): LucideIcon =>
  (slug && categoryIcons[slug]) || Package;

const Home = () => {
  const { data: categories, isLoading: catLoading, error: catError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await categoryApi.getAll()).data,
  });

  const { data: featuredProducts, isLoading: featuredLoading, error: featuredError } =
    useQuery({
      queryKey: ['featuredProducts'],
      queryFn: async () => (await productApi.getFeatured()).data.content,
    });

  const { data: bestSellers, isLoading: bestSellersLoading, error: bestSellersError } =
    useQuery({
      queryKey: ['bestSellers'],
      queryFn: async () => (await productApi.getBestSellers()).data.content,
    });

  const { data: novidades, isLoading: novidadesLoading, error: novidadesError } =
    useQuery({
      queryKey: ['novidades'],
      queryFn: async () =>
        (await productApi.getAll({ page: 0, size: 4, sort: 'createdAt,desc' })).data.content,
    });

  const isLoading = catLoading || featuredLoading || bestSellersLoading || novidadesLoading;
  const errorMessage = catError?.message ?? featuredError?.message ?? bestSellersError?.message ?? novidadesError?.message;

  const featured = useMemo(() => featuredProducts ?? [], [featuredProducts]);
  const bestSellerList = useMemo(() => bestSellers ?? [], [bestSellers]);
  const novidadesList = useMemo(() => novidades ?? [], [novidades]);

  if (isLoading) {
    return <Loading />;
  }

  if (catError || featuredError || bestSellersError || novidadesError) {
    return <Error message={errorMessage ?? 'Não foi possível carregar o catálogo no momento.'} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative h-[420px] md:h-[520px] bg-slate-900 text-white overflow-hidden">
          <img
            src={heroImage}
            alt="Produtos premium selecionados pelo ShopCore"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Marketplace</p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Tecnologia e estilo <span className="text-accent">em um só lugar.</span>
              </h1>
              <p className="text-lg text-slate-200 mb-8">
                Descubra os melhores produtos em eletrônicos, moda e decoração com entrega expressa para todo o Brasil.
              </p>
              <Link
                to="/products"
                className="inline-block bg-accent hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-full text-lg transition-colors"
              >
                Explorar Catálogo
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Navegue por Categorias</h2>
              <p className="text-slate-500 mt-2">Seis mercados cuidadosamente curados.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(categories ?? []).map((cat: Category) => {
              const Icon = getCategoryIcon(cat.slug);
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="p-6 bg-surface border border-slate-200 rounded-2xl text-center hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-background rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-semibold text-sm text-slate-800">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Produtos em Destaque</h2>
                <p className="text-slate-500 mt-2">As escolhas da nossa curadoria para você.</p>
              </div>
              <Link to="/products" className="text-primary font-semibold hover:underline">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Best sellers */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Mais Vendidos</h2>
              <p className="text-slate-500 mt-2">Os favoritos da comunidade ShopCore.</p>
            </div>
            <Link to="/products?sort=soldQuantity,desc" className="text-primary font-semibold hover:underline">Ver todos</Link>
          </div>
          {bestSellerList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellerList.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
              Nenhum produto em alta no momento.
            </div>
          )}
        </section>

        {/* New & promotions */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Novidades e Promoções</h2>
                <p className="text-slate-500 mt-2">Lançamentos e ofertas imperdíveis.</p>
              </div>
              <Link to="/products?sort=createdAt,desc" className="text-primary font-semibold hover:underline">Ver todos</Link>
            </div>
            {novidadesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {novidadesList.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-surface border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
                Nenhuma novidade por enquanto.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
