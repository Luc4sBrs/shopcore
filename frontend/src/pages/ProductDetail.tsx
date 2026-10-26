import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '../utils/format';
import { productApi } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Error from './Error';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getById(productId).then((response) => response.data),
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <Loading />
        ) : error || !product ? (
          <Error message="Não foi possível carregar os detalhes do produto." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-surface border border-slate-200 rounded-2xl overflow-hidden aspect-square">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <Link to="/products" className="text-primary font-medium hover:underline text-sm">
                ← Voltar ao catálogo
              </Link>
              <h1 className="text-3xl font-bold text-slate-900 mt-3">{product.name}</h1>
              <p className="text-slate-500 mt-1">{product.categoryName}</p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
                {product.discountPrice != null && product.discountPrice < product.price && (
                  <span className="text-xl text-slate-400 line-through">{formatCurrency(product.discountPrice)}</span>
                )}
              </div>

              {product.discountPrice != null && product.discountPrice < product.price && (
                <p className="mt-2 text-accent font-bold">Oferta especial</p>
              )}

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Descrição</h2>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-8 text-sm text-slate-500">
                <p>Disponibilidade: {product.stockQuantity > 0 ? 'Em estoque' : 'Fora de estoque'}</p>
                {product.soldQuantity != null && (
                  <p className="mt-1">Vendas: {product.soldQuantity}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
