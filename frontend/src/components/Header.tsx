import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Store, User, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { Category } from '../types';
import { categoryApi } from '../api';

const Header = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await categoryApi.getAll()).data,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = term.trim();
    if (!query) {
      return;
    }
    setMobileMenuOpen(false);
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  const categoryLinks = [
    { label: 'Todos os Produtos', to: '/products' },
    ...(categories ?? []).map((category: Category) => ({
      label: category.name,
      to: `/category/${category.slug}`,
    })),
  ];

  return (
    <header className="bg-surface border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <Store className="h-7 w-7 text-primary" />
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">ShopCore</span>
          </Link>

          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary" />
              <input
                type="text"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Buscar produtos..."
                aria-label="Buscar produtos"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </form>

          <div className="flex items-center space-x-1">
            <Link to="/account" className="p-2 text-secondary hover:text-primary transition-colors" aria-label="Minha conta">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="p-2 text-secondary hover:text-primary transition-colors" aria-label="Carrinho de compras">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button
              type="button"
              className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <nav className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-1 overflow-x-auto whitespace-nowrap">
            {categoryLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block px-3 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-surface px-4 py-3">
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary" />
              <input
                type="text"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Buscar produtos..."
                aria-label="Buscar produtos"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </form>
          <ul className="flex flex-col gap-1">
            {categoryLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block px-3 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
