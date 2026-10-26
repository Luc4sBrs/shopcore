-- Seed Categories
INSERT INTO categories (name, description, slug) VALUES
('Tecnologia e Eletrônicos', 'Gadgets, computadores e smartphones', 'tecnologia'),
('Moda e Acessórios', 'Roupas, calçados e joias', 'moda'),
('Casa e Decoração', 'Móveis e itens para o lar', 'casa'),
('Beleza e Cuidados Pessoais', 'Cosméticos e higiene', 'beleza'),
('Esportes e Lazer', 'Equipamentos esportivos e outdoor', 'esportes'),
('Games e Acessórios', 'Consoles, jogos e periféricos', 'games');

-- Seed Products
INSERT INTO products (category_id, name, description, price, discount_price, stock_quantity, image_url, is_featured) VALUES
(1, 'Smartphone Ultra X', 'O smartphone mais avançado do mercado com câmera de 200MP', 4999.90, 4499.00, 50, 'https://picsum.photos/seed/prod1/400/400', true),
(1, 'Notebook Pro Max', 'Performance extrema para desenvolvedores e designers', 8500.00, 7999.00, 20, 'https://picsum.photos/seed/prod2/400/400', true),
(2, 'Tênis Urban Style', 'Conforto e estilo para o dia a dia', 299.90, null, 100, 'https://picsum.photos/seed/prod3/400/400', false),
(2, 'Relógio Minimalist', 'Design clean e elegante para qualquer ocasião', 599.00, 499.00, 30, 'https://picsum.photos/seed/prod4/400/400', true),
(3, 'Luminária Inteligente', 'Controle a luz da sua casa via app', 150.00, null, 40, 'https://picsum.photos/seed/prod5/400/400', false),
(3, 'Jogo de Lençóis Egípcio', 'Luxo e maciez para suas noites de sono', 350.00, 299.00, 15, 'https://picsum.photos/seed/prod6/400/400', false),
(4, 'Sérum Facial Glow', 'Hidratação profunda e brilho natural', 89.90, null, 80, 'https://picsum.photos/seed/prod7/400/400', true),
(4, 'Kit Maquiagem Profissional', 'Tudo o que você precisa para um look perfeito', 249.00, 199.00, 25, 'https://picsum.photos/seed/prod8/400/400', false),
(5, 'Tapete de Yoga Eco', 'Material sustentável e antiderrapante', 120.00, null, 60, 'https://picsum.photos/seed/prod9/400/400', false),
(5, 'Mochila Trilha Pro', 'Espaçosa e resistente para qualquer aventura', 320.00, 270.00, 12, 'https://picsum.photos/seed/prod10/400/400', true),
(6, 'Console NextGen Z', 'A nova era dos games chegou', 3999.00, null, 10, 'https://picsum.photos/seed/prod11/400/400', true),
(6, 'Headset Gamer Surround', 'Áudio imersivo para máxima vantagem competitiva', 450.00, 399.00, 45, 'https://picsum.photos/seed/prod12/400/400', false);
