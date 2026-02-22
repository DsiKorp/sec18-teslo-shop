# Teslo Shop

A fully-featured e-commerce storefront and admin panel built with React 19, TypeScript, and a modern frontend stack. Browse products, manage your account, and administer the catalog — all from a clean, responsive UI.

**Live Demo:** [https://awesome-teslo-shop-react.netlify.app/](https://awesome-teslo-shop-react.netlify.app/)

---

## Features

### Storefront
- Browse products by gender categories (Men, Women, Kids, Unisex)
- Product detail pages with image gallery, sizes, and stock information
- Paginated product grid

### Authentication
- User registration and login with JWT
- Auth status persisted via `localStorage`
- Route protection: unauthenticated users are redirected to `/auth/login`

### Admin Panel
- Dashboard with stats and activity feed
- Full product management: create, edit, and update products
- Image upload support for product photos
- Admin-only route guard

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | TypeScript 5.9 |
| Build Tool | [Vite 7](https://vitejs.dev/) with SWC |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Component Library | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Server State | [TanStack Query v5](https://tanstack.com/query) |
| Client State | [Zustand v5](https://zustand-demo.pmnd.rs/) |
| Routing | [React Router v7](https://reactrouter.com/) (Hash Router) |
| Forms | [React Hook Form v7](https://react-hook-form.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Project Structure

```
src/
├── admin/               # Admin panel (dashboard, product CRUD)
│   ├── actions/         # Server action helpers (create/update/get products)
│   ├── components/      # Admin-specific UI components
│   ├── hooks/           # useProduct hook
│   ├── layouts/         # AdminLayout (lazy loaded)
│   └── pages/           # Dashboard, Products list, Product form
│
├── api/
│   └── tesloApi.ts      # Axios instance with JWT interceptor
│
├── auth/                # Authentication module
│   ├── actions/         # login, register, checkAuth server actions
│   ├── hooks/           # useAuthQuery (TanStack Query)
│   ├── layouts/         # AuthLayout (lazy loaded)
│   ├── pages/           # LoginPage, RegisterPage
│   └── store/           # Zustand auth store (token, user, status)
│
├── components/          # Shared components
│   ├── custom/          # FullScreenLoading, Logo, Pagination
│   ├── routes/          # ProtectedRoutes (AdminRoute, NotAuthenticatedRoute)
│   └── ui/              # shadcn/ui primitives
│
├── interfaces/          # TypeScript interfaces (Product, User, etc.)
├── lib/                 # Utilities (currency formatter, sleep, cn)
├── shop/                # Public storefront
│   ├── actions/         # get-products action
│   ├── components/      # Header, Footer, ProductCard, ProductsGrid, FilterSidebar
│   ├── hooks/           # useProducts (TanStack Query)
│   ├── layouts/         # ShopLayout
│   └── pages/           # HomePage, ProductPage, GenderPage
│
├── app.router.tsx       # Application routes (Hash Router)
└── TesloShopApp.tsx     # Root component + providers setup
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd sec18-teslo-shop

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=https://your-teslo-api-backend.com
```

> The app expects a NestJS Teslo API backend. The Axios instance reads `VITE_API_URL` and automatically attaches the Bearer token from `localStorage` to every request.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Architecture Notes

- **Hash Router** is used so the app can be deployed on static hosts (Netlify, GitHub Pages) without server-side redirect configuration.
- **Lazy loading** is applied to `AuthLayout` and `AdminLayout` to reduce the initial bundle size.
- **TanStack Query** manages all server state (products, auth check), while **Zustand** holds client-side auth state (user, token, status).
- The Axios interceptor injects the JWT `Bearer` token on every outgoing request, keeping auth logic centralised in [src/api/tesloApi.ts](src/api/tesloApi.ts).
