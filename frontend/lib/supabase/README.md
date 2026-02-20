# Supabase Setup

Este módulo centraliza todo lo necesario para conectar el catálogo con Supabase.

## 1. Configura las tablas

1. Instala la CLI (opcional pero recomendado):
   ```bash
   npm install -g supabase
   supabase login
   ```
2. Ejecuta el esquema:
   ```bash
   supabase db push --file frontend/lib/supabase/schema.sql
   ```
   También puedes copiar el contenido de `schema.sql` en el editor SQL del panel de Supabase.

## 2. Inserta datos de ejemplo

```bash
supabase db push --file frontend/lib/supabase/seed.sql
```

Los registros generados son puramente demostrativos. Ajusta nombres, monedas y URL de imágenes según tu negocio.

## 3. Variables de entorno

Copia los valores reales de tu proyecto Supabase en `.env.local` o `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<public-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

- Mantén `SUPABASE_SERVICE_ROLE_KEY` exclusivamente en el servidor (no subir a repos públicos).
- Reinicia `next dev` si cambias estas variables.

## 4. Tipos generados

`types.ts` describe el esquema que consumen los clientes. Si modificas las tablas, actualízalo manualmente o ejecuta:

```bash
supabase gen types typescript --project-id <id> --schema public > frontend/lib/supabase/types.ts
```

## 5. Uso dentro del Frontend

- `getSupabaseBrowserClient()` se usa en hooks o componentes cliente.
- `createSupabaseServiceRoleClient()` queda reservado para rutas API / server actions.
- El feature `src/features/catalog` ya consume estos helpers (`catalogApi`).
- Mientras no definas las variables de entorno de Supabase, la UI mostrará datos simulados (mock) ubicados en `src/features/catalog/mocks.ts` para que puedas probar el flujo sin conexión real.
