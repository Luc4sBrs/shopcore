# ShopCore Marketplace

Marketplace full-stack de múltiplas categorias com identidade visual própria, experiência de compra moderna e painel administrativo.

## 🛠️ Stack

### Backend (`/backend`)
- Java 21
- Spring Boot 3.3
- Spring Web, Spring Data JPA, Spring Security, Bean Validation
- PostgreSQL + Flyway
- OpenAPI/Swagger (springdoc)
- Maven

### Frontend (`/frontend`)
- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form + Zod
- Lucide React

## 📋 Pré-requisitos

- Docker Desktop (para PostgreSQL) **ou** PostgreSQL 15 local
- JDK 21
- Maven 3.9+
- Node.js 20+ e npm

## 🚀 Execução

### 1. Banco de dados (Supabase — PostgreSQL hospedado)

O ShopCore está configurado para usar o **Supabase** como banco de dados (PostgreSQL hospedado em nuvem).

1. Crie um projeto no [Supabase](https://supabase.com/dashboard).
2. No dashboard, acesse **Database → Connection string** e copie a URI (formato: `postgresql://postgres:[password]@db.[ref]:5432/postgres`).
3. Ajuste as variáveis de ambiente no arquivo `.env` na raiz do monorepo:

```env
DB_URL=jdbc:postgresql://db.[ref].supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=[SUA_SENHA_DO_BANCO]
FLYWAY_USER=postgres
FLYWAY_PASSWORD=[SUA_SENHA_DO_BANCO]
```

4. As migrações do Flyway serão aplicadas automaticamente na inicialização da API.

> Alternativa local: use Docker Compose (`docker compose up -d`) com as variáveis padrão (`jdbc:postgresql://localhost:5432/shopcore`).

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

A API disponível em `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App em `http://localhost:5173`.

## 📚 API — Endpoints do catálogo

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/products` | Lista paginada. Query params: `categoryId`, `minPrice`, `maxPrice`, `page`, `size`, `sort` |
| GET | `/api/products/featured` | Produtos em destaque (`page`, `size`) |
| GET | `/api/products/best-sellers` | Produtos mais vendidos (`page`, `size`) |
| GET | `/api/products/search` | Busca por nome (`q`, `page`, `size`) |
| GET | `/api/products/{id}` | Detalhes do produto |
| GET | `/api/categories` | Lista de categorias |

Documentação interativa (Swagger UI): `http://localhost:8080/swagger-ui.html`

## 🧪 Testes

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
npm run test
npm run lint
npm run build
```

## 📁 Estrutura

```
shopcore/
  backend/    Spring Boot API
  frontend/   React + TypeScript + Vite
  docs/       Documentação
  docker-compose.yml
  .env.example
  README.md
```
