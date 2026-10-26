# ShopCore API — Catálogo

## Produtos

### `GET /api/products`

Lista de produtos com filtros, ordenação e paginação.

**Query params:**

| Param | Tipo | Obrigatório | Padrão | Descrição |
|---|---|---|---|---|
| `categoryId` | Long | não | — | Filtra por categoria |
| `minPrice` | BigDecimal | não | — | Preço mínimo |
| `maxPrice` | BigDecimal | não | — | Preço máximo |
| `page` | int | não | `0` | Página (0-based) |
| `size` | int | não | `12` | Tamanho (1-100) |
| `sort` | string | não | `id,asc` | Campo,direção (ex.: `id,desc`, `price,asc`) |

Exemplo:

```
GET /api/products?categoryId=1&minPrice=100&maxPrice=9999&page=0&size=12&sort=price,desc
```

### `GET /api/products/featured`

Produtos em destaque.

```
GET /api/products/featured?page=0&size=12
```

### `GET /api/products/best-sellers`

Produtos mais vendidos.

```
GET /api/products/best-sellers?page=0&size=4
```

### `GET /api/products/search`

Busca por nome (case-insensitive).

```
GET /api/products/search?q=notebook&page=0&size=12
```

### `GET /api/products/{id}`

Detalhes de um produto.

```
GET /api/products/1
```

## Categorias

### `GET /api/categories`

Lista todas as categorias.

```
GET /api/categories
```

Resposta:

```json
[
  { "id": 1, "name": "Tecnologia e Eletrônicos", "description": "Gadgets, computadores e smartphones", "slug": "tecnologia" }
]
```

## Erros

Erros seguem o formato:

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Product not found with id: 999",
  "timestamp": "2026-10-26T12:00:00Z"
}
```

Códigos comuns: `400` (bad request/validação), `401`, `403`, `404`, `409`, `500`.
