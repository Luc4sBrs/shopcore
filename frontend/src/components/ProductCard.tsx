import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatCurrency } from '../utils/format';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;

  return (
    <div className="bg-surface rounded-xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
            Oferta
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-slate-800 font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-slate-500">{product.categoryName}</p>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-slate-900">{formatCurrency(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">{formatCurrency(product.discountPrice)}</span>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="mt-3 w-full py-2 bg-primary text-white text-center rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors block"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
