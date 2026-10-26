import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductCard from './ProductCard';
import type { Product } from '../types';

const product: Product = {
  id: 1,
  name: 'Smartphone Ultra X',
  description: 'O smartphone mais avançado do mercado com câmera de 200MP',
  price: 4999.9,
  discountPrice: 4499.9,
  imageUrl: 'https://picsum.photos/seed/prod1/400/400',
  categoryId: 1,
  categoryName: 'Tecnologia e Eletrônicos',
  stockQuantity: 50,
  soldQuantity: 340,
  isFeatured: true,
};

describe('ProductCard', () => {
  it('renderiza o nome do produto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Smartphone Ultra X')).toBeInTheDocument();
  });

  it('renderiza o preço formatado em BRL', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/R\$\s*4\.999,90/)).toBeInTheDocument();
  });

  it('exibe badge de oferta quando há desconto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Oferta')).toBeInTheDocument();
  });
});
