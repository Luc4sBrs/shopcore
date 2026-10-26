import { Link } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-surface border border-slate-200 rounded-2xl p-8">
        <PackageSearch className="h-12 w-12 text-secondary mx-auto mb-4" />
        <h1 className="text-6xl font-extrabold text-primary mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Página não encontrada</h2>
        <p className="text-slate-500 mb-6">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
