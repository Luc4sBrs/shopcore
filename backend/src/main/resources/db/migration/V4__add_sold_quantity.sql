-- Adiciona contagem de vendas (sold_quantity) aos produtos.
-- Coluna padrão 0 para registros ja existentes; valores demo aplicados abaixo.

ALTER TABLE products ADD COLUMN sold_quantity INTEGER NOT NULL DEFAULT 0;

UPDATE products SET sold_quantity = 340 WHERE name = 'Smartphone Ultra X';
UPDATE products SET sold_quantity = 180 WHERE name = 'Notebook Pro Max';
UPDATE products SET sold_quantity = 95 WHERE name = 'Tênis Urban Style';
UPDATE products SET sold_quantity = 210 WHERE name = 'Relógio Minimalist';
UPDATE products SET sold_quantity = 60 WHERE name = 'Luminária Inteligente';
UPDATE products SET sold_quantity = 45 WHERE name = 'Jogo de Lençóis Egípcio';
UPDATE products SET sold_quantity = 150 WHERE name = 'Sérum Facial Glow';
UPDATE products SET sold_quantity = 88 WHERE name = 'Kit Maquiagem Profissional';
UPDATE products SET sold_quantity = 75 WHERE name = 'Tapete de Yoga Eco';
UPDATE products SET sold_quantity = 132 WHERE name = 'Mochila Trilha Pro';
UPDATE products SET sold_quantity = 265 WHERE name = 'Console NextGen Z';
UPDATE products SET sold_quantity = 118 WHERE name = 'Headset Gamer Surround';
