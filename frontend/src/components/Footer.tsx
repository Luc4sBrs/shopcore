import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // A inscrição fica preparada para a fase de autenticação/CRM.
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-extrabold tracking-tight text-white">ShopCore</span>
            <p className="mt-4 text-sm leading-relaxed">
              Sua experiência premium de compras online. Qualidade, confiança e entrega rápida.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Frete e Entrega</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Trocas e Devoluções</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Receba ofertas exclusivas no seu e-mail.</p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Seu e-mail"
                aria-label="Seu e-mail"
                className="bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary flex-1"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors" aria-label="Assinar newsletter">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © {CURRENT_YEAR} ShopCore Marketplace. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
