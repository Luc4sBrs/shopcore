import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-surface border border-slate-200 rounded-2xl p-10 text-center">
          <ShoppingCart className="h-12 w-12 text-secondary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Carrinho vazio</h1>
          <p className="text-slate-500 mb-6">
            Seu carrinho ainda não possui itens. Explore o catálogo e encontre o que você precisa.
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
