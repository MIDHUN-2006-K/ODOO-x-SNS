# 📁 GlobeTrotter Frontend - Complete Directory Structure

```
ODOO-x-SNS/
├── node-backend/                    # ← Existing backend
│   └── ... (unchanged)
│
└── frontend/                        # ← NEW FRONTEND
    │
    ├── 📄 package.json             # Dependencies & scripts
    ├── 📄 tsconfig.json            # TypeScript config
    ├── 📄 next.config.js           # Next.js config
    ├── 📄 tailwind.config.ts       # Tailwind theme
    ├── 📄 postcss.config.js        # PostCSS config
    ├── 📄 .env.local               # Environment variables
    ├── 📄 .gitignore               # Git ignore
    ├── 📄 README.md                # Project docs
    ├── 📄 QUICK_REFERENCE.md       # Quick guide
    │
    ├── 📁 src/                     # Main source code
    │   │
    │   ├── 📁 app/                 # Next.js pages (App Router)
    │   │   ├── 📄 layout.tsx       # Root layout with providers
    │   │   ├── 📄 page.tsx         # Home redirect
    │   │   ├── 📄 providers.tsx    # Global providers (toast, etc)
    │   │   │
    │   │   ├── 📁 login/
    │   │   │   └── 📄 page.tsx     # Login page
    │   │   │
    │   │   ├── 📁 signup/
    │   │   │   └── 📄 page.tsx     # Signup page
    │   │   │
    │   │   ├── 📁 dashboard/
    │   │   │   └── 📄 page.tsx     # Dashboard with stats
    │   │   │
    │   │   ├── 📁 profile/
    │   │   │   └── 📄 page.tsx     # User profile
    │   │   │
    │   │   └── 📁 trips/
    │   │       ├── 📄 page.tsx     # Trips list
    │   │       ├── 📁 create/
    │   │       │   └── 📄 page.tsx # Create trip form
    │   │       └── 📁 [id]/
    │   │           └── 📄 page.tsx # Trip details & planning
    │   │
    │   ├── 📁 components/          # Reusable React components
    │   │   ├── 📄 Navbar.tsx       # Navigation bar (all pages)
    │   │   ├── 📄 FormElements.tsx # Input, Button, Select
    │   │   ├── 📄 EmptyState.tsx   # Empty states & alerts
    │   │   └── 📄 Skeletons.tsx    # Loading skeletons
    │   │
    │   ├── 📁 lib/                 # Utilities & helpers
    │   │   ├── 📄 apiClient.ts     # Axios wrapper with auth
    │   │   ├── 📄 store.ts         # Zustand state management
    │   │   └── 📄 middleware.ts    # Auth middleware
    │   │
    │   ├── 📁 services/            # API service functions
    │   │   └── 📄 api.ts           # All API endpoints
    │   │
    │   ├── 📁 types/               # TypeScript type definitions
    │   │   └── 📄 index.ts         # User, Trip, City, etc
    │   │
    │   └── 📁 styles/              # Global styles
    │       └── 📄 globals.css      # Tailwind directives & globals
    │
    └── 📁 public/                  # Static files (future use)
```

---

## 📊 File Statistics

| Category      | Count   |
| ------------- | ------- |
| Pages         | 8       |
| Components    | 5       |
| Type files    | 1       |
| Service files | 1       |
| Config files  | 6       |
| Doc files     | 5       |
| **Total**     | **~30** |

---

## 🗂️ File Organization by Feature

### Authentication Feature

- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`
- `src/lib/apiClient.ts` (token management)
- `src/services/api.ts` (authService)

### Trip Management Feature

- `src/app/trips/page.tsx` (list)
- `src/app/trips/create/page.tsx` (create)
- `src/app/trips/[id]/page.tsx` (details)
- `src/services/api.ts` (tripService)

### Dashboard Feature

- `src/app/dashboard/page.tsx`
- `src/services/api.ts` (tripService)

### User Profile Feature

- `src/app/profile/page.tsx`
- `src/services/api.ts` (authService)

### Shared Components

- `src/components/Navbar.tsx`
- `src/components/FormElements.tsx`
- `src/components/EmptyState.tsx`
- `src/components/Skeletons.tsx`

### State Management

- `src/lib/store.ts` (Zustand stores)

### Styling

- `src/styles/globals.css`
- `tailwind.config.ts`
- `postcss.config.js`

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────┐
│              React Components                    │
│  (Login, Signup, Dashboard, Trips, Profile)     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│           Service Layer (api.ts)                 │
│  (authService, tripService, etc)                │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         API Client (apiClient.ts)               │
│  (axios with token injection)                   │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│      Backend API (http://localhost:4000)        │
│  (Express.js with routes & middleware)          │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│       Database (PostgreSQL via Prisma)          │
│  (Users, Trips, Stops, Activities, etc)        │
└─────────────────────────────────────────────────┘
```

---

## 📦 Dependency Tree

```
Frontend App
├── Next.js 14
│   ├── React 18
│   └── TypeScript
├── Tailwind CSS
│   └── PostCSS
├── Zustand (State)
├── Axios (HTTP)
├── React Hot Toast (Notifications)
├── Lucide React (Icons)
└── date-fns (Date Utils)
```

---

## 🎯 Quick File Purposes

| File                          | Purpose       | Key Content                 |
| ----------------------------- | ------------- | --------------------------- |
| `app/layout.tsx`              | Root wrapper  | Providers, meta tags        |
| `app/page.tsx`                | Home redirect | Redirect to login/dashboard |
| `app/login/page.tsx`          | Login form    | Email, password, submit     |
| `app/signup/page.tsx`         | Signup form   | Name, email, password       |
| `app/dashboard/page.tsx`      | Dashboard     | Stats, upcoming trips       |
| `app/trips/page.tsx`          | Trips list    | All user trips, cards       |
| `app/trips/create/page.tsx`   | Create form   | Trip details form           |
| `app/trips/[id]/page.tsx`     | Trip details  | Stops, activities           |
| `app/profile/page.tsx`        | Profile       | User info, logout           |
| `components/Navbar.tsx`       | Navigation    | Logo, links, mobile menu    |
| `components/FormElements.tsx` | Form inputs   | Input, Button, Select       |
| `components/EmptyState.tsx`   | UI states     | Empty, alert components     |
| `components/Skeletons.tsx`    | Loading       | Skeleton loaders            |
| `lib/apiClient.ts`            | HTTP client   | Axios with token auth       |
| `lib/store.ts`                | State         | Zustand auth & trip store   |
| `services/api.ts`             | API calls     | All endpoint functions      |
| `types/index.ts`              | TypeScript    | Type definitions            |
| `styles/globals.css`          | Global styles | Tailwind & animations       |

---

## 🚀 Import Paths

The project uses path aliases for clean imports:

```typescript
// Instead of:
import { Button } from "../../../components/FormElements";

// Use:
import { Button } from "@/components/FormElements";

// Aliases defined in tsconfig.json:
// "@/*": ["./src/*"]
```

---

## 📝 How Files Are Organized

### By Feature (Feature-Driven)

```
Feature: Trip Management
├── Pages: src/app/trips/*
├── Components: src/components/*
├── Services: src/services/api.ts (tripService)
├── Types: src/types/index.ts (Trip, TripStop, etc)
└── State: src/lib/store.ts (useTripStore)
```

### By Layer (Clean Architecture)

```
Layer 1: Components (UI)
├── Presentational (FormElements, EmptyState, Skeletons)
└── Container (pages in src/app/)

Layer 2: Services (Business Logic)
├── api.ts (API functions)
└── store.ts (State management)

Layer 3: Infrastructure
├── apiClient.ts (HTTP)
└── middleware.ts (Auth)

Layer 4: Data
└── types/index.ts (Types)
```

---

## 📱 Page-to-Route Mapping

| Page File                   | Route           | Purpose      |
| --------------------------- | --------------- | ------------ |
| `app/page.tsx`              | `/`             | Redirect     |
| `app/login/page.tsx`        | `/login`        | Login        |
| `app/signup/page.tsx`       | `/signup`       | Signup       |
| `app/dashboard/page.tsx`    | `/dashboard`    | Dashboard    |
| `app/trips/page.tsx`        | `/trips`        | List trips   |
| `app/trips/create/page.tsx` | `/trips/create` | Create trip  |
| `app/trips/[id]/page.tsx`   | `/trips/123`    | Trip details |
| `app/profile/page.tsx`      | `/profile`      | Profile      |

---

## 🔗 Component Dependency Graph

```
Navbar
├── useAuthStore (state)
├── useRouter (navigation)
└── Lucide icons

Pages
├── Navbar
├── FormElements (Input, Button)
├── EmptyState
├── Skeletons
├── Services (API calls)
└── Zustand stores

FormElements
└── Tailwind CSS classes

EmptyState
└── Lucide icons

Skeletons
└── Tailwind CSS classes
```

---

## 📚 Configuration Files

| File                 | Purpose                         |
| -------------------- | ------------------------------- |
| `package.json`       | Dependencies, scripts           |
| `tsconfig.json`      | TypeScript config, path aliases |
| `next.config.js`     | Next.js settings                |
| `tailwind.config.ts` | Tailwind theme colors           |
| `postcss.config.js`  | CSS processing                  |
| `.env.local`         | Environment variables           |
| `.gitignore`         | Git ignore rules                |

---

## 🔐 Protected vs Public Paths

### 🔒 Protected (require auth)

- `/dashboard`
- `/trips`
- `/trips/create`
- `/trips/[id]`
- `/profile`

### 🔓 Public (no auth required)

- `/`
- `/login`
- `/signup`

---

## 💾 Storage Locations

| Data       | Location                     | Persistence  |
| ---------- | ---------------------------- | ------------ |
| JWT Token  | localStorage                 | Persistent   |
| User Info  | Zustand store + localStorage | Persistent   |
| Trip Cache | Zustand store                | Session only |
| Form Input | React state                  | Session only |
| UI State   | React state                  | Session only |

---

## 🎯 Adding New Features

When adding a new feature, create:

```
1. Type definition
   └── src/types/index.ts (add interface)

2. API service
   └── src/services/api.ts (add function)

3. Page/Component
   └── src/app/new-feature/page.tsx (create page)
   └── src/components/NewComponent.tsx (create component)

4. State (if needed)
   └── src/lib/store.ts (add Zustand store)

5. Styling (if custom)
   └── src/styles/globals.css (add CSS)
```

---

## 📊 Lines of Code

| Category   | Files   | LOC        |
| ---------- | ------- | ---------- |
| Pages      | 8       | ~400       |
| Components | 5       | ~300       |
| Services   | 1       | ~200       |
| Types      | 1       | ~100       |
| Config     | 6       | ~100       |
| Styles     | 1       | ~50        |
| **Total**  | **~22** | **~1,150** |

---

**Navigation**: Each file is well-commented and organized logically.
**Scalability**: Easy to add new features following existing patterns.
**Maintainability**: Clear separation of concerns with modular architecture.

Ready to explore! 🚀
