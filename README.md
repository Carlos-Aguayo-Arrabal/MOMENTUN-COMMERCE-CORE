# Tienda-maestra

> Generated with [SaaS Factory](https://github.com/saas-factory) 🏭

A full-featured SaaS application boilerplate with everything you need to launch your product.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context + Hooks
- **Forms:** React Hook Form

## 📦 Installed Modules

- 🔐 **Authentication** - Complete auth system with login, register, password reset, and OAuth support
- 📊 **Dashboard UI** - Pre-built dashboard components and layouts

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional)

### Installation

```bash
# Clone and enter the project
cd Tienda-maestra

# Copy environment variables
cp .env.example .env

# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

### Environment Setup

1. Copy `.env.example` to `.env`
2. Update the database connection string
3. Add your API keys (Stripe, OAuth providers, etc.)

## 📁 Project Structure

```
Tienda-maestra/
├── frontend/                 # Next.js application
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities and Supabase client
│   └── src/
│       └── features/
│           └── catalog/      # Feature-first catalog module (api, hooks, UI)
├── shared/                   # Shared modules
│   ├── utils/                # Common utilities
│   └── auth/
│   └── ui/
├── .env.example              # Environment template
└── package.json              # Root package.json
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all development servers |
| `npm run dev:frontend` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run build` | Build for production |
| `npm run lint` | Run linters |

## 🔧 Configuration

### Database

Update your database URL in `.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/Tienda_maestra_db
```

### Authentication

The auth module supports:
- Email/Password authentication
- **Email verification required** - Users must verify their email before logging in
- JWT tokens with refresh
- Password reset flow
- Session management

**Email Verification Setup:**
1. Configure your SMTP settings in `.env`
2. Users will receive a verification email after registration
3. They must click the link before they can log in

### Supabase

The catalog feature is prepared to source data directly from Supabase:

1. **Provision tables** – Run `frontend/lib/supabase/schema.sql` from the Supabase SQL editor or via CLI:
   ```bash
   npm install -g supabase
   supabase login
   supabase db push --file frontend/lib/supabase/schema.sql
   ```
2. **Seed demo content** (optional) with `frontend/lib/supabase/seed.sql`:
   ```bash
   supabase db push --file frontend/lib/supabase/seed.sql
   ```
3. **Set environment variables** inside `.env.local` / `.env`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="public-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="service-role-key" # keep server-side only
   ```
4. **Keep types in sync** – Update `frontend/lib/supabase/types.ts` after schema changes (see `frontend/lib/supabase/README.md`).
5. **Use the feature** – Import from `src/features/catalog` (e.g., `useCatalogProducts`, `CatalogGrid`) to render live data using the shared Supabase clients in `frontend/lib/supabase`.

### Catálogo de ejemplo

- La ruta `/catalog` ya consume Supabase usando el enfoque feature-first.
- Incluye búsqueda, filtros por categoría/estado y rangos de precio.
- Si aún no configuras Supabase, verás un catálogo simulado (mock) para validar el diseño rápidamente.
- Edita `frontend/app/catalog/page.tsx` o extiende los componentes en `src/features/catalog` para adaptar la experiencia de tu tienda.
- Cada producto tiene su página pública en `/catalog/[slug]`, donde se muestran detalles, galería y recomendaciones relacionadas.


## 📄 License

MIT License - feel free to use this for any project!

---

Built with ❤️ using [SaaS Factory](https://github.com/saas-factory)
