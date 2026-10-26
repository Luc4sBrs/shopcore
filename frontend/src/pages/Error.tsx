import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  message?: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-surface border border-slate-200 rounded-2xl p-8">
        <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Algo deu errado</h1>
        <p className="text-slate-500 mb-6">
          {message ?? 'Não foi possível concluir a operação. Verifique sua conexão e tente novamente.'}
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

export default Error;
