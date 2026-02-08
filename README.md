# DDD Clean Architecture - Project Structure

This project follows **Domain-Driven Design (DDD)** principles with **Clean Architecture** to ensure maintainability, scalability, and clear separation of concerns.

---

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── modules/                      # Feature modules (business domains)
│   └── [module-name]/            # e.g., products, users, orders
│       ├── domain/               # Business logic layer (pure, no dependencies)
│       │   ├── entities/         # Domain entities
│       │   ├── repositories/     # Repository interfaces
│       │   ├── services/         # Domain services
│       │   └── value-objects/    # Value objects
│       ├── infrastructure/       # Data/API layer (external dependencies)
│       │   ├── api/              # API clients
│       │   ├── repositories/     # Repository implementations
│       │   ├── mappers/          # Data mappers/adapters
│       │   └── store/            # State management (Zustand stores)
│       └── presentation/         # UI layer (components, hooks)
│           ├── components/       # React components
│           ├── hooks/            # Custom hooks
│           ├── utils/            # UI utilities
│           └── pages/            # Page-specific components
├── common/                       # Shared code across modules
│   ├── domain/                   # Shared business logic
│   │   ├── entities/
│   │   ├── value-objects/
│   │   └── interfaces/
│   ├── infrastructure/           # Shared infrastructure
│   │   ├── api/                  # Base API client
│   │   ├── storage/              # Storage utilities
│   │   ├── config/               # Configuration
│   │   └── store/                # Shared Zustand stores
│   └── presentation/             # Shared UI
│       ├── components/           # Reusable components
│       ├── hooks/                # Reusable hooks
│       ├── utils/                # UI utilities
│       └── styles/               # Shared styles
└── config/                       # App configuration
    └── fonts.ts
```

---

## 🏗️ Layer Responsibilities

### 1️⃣ **Domain Layer** (Business Logic)
- **Pure business logic** - no external dependencies
- Contains entities, value objects, and domain services
- Defines repository interfaces (contracts)
- **No imports from infrastructure or presentation layers**

**Example:**
```typescript
// src/modules/products/domain/entities/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}
```

### 2️⃣ **Infrastructure Layer** (External Dependencies)
- Implements repository interfaces from domain
- Handles API calls, database access, external services
- **State management (Zustand stores) belongs here**
- Maps external data to domain entities

**Why Zustand is in Infrastructure:**
- It's an external library dependency
- State management is an infrastructure concern
- Domain layer must remain pure

**Example:**
```typescript
// src/common/infrastructure/store/counter-store.ts
import { create } from 'zustand';

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 3️⃣ **Presentation Layer** (UI)
- React components, hooks, and UI utilities
- Consumes domain entities and infrastructure services
- Hooks provide clean interface to stores

**Example:**
```typescript
// src/common/presentation/hooks/use-counter.ts
import { useCounterStore } from '@/common/infrastructure/store/counter-store';

export const useCounter = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  return { count, increment };
};
```

---

## 📦 TypeScript Path Aliases

Use these aliases for clean imports:

```typescript
// Module imports
import { Product } from '@/modules/products/domain/entities/product';
import { useProductStore } from '@/modules/products/infrastructure/store/product-store';
import { ProductCard } from '@/modules/products/presentation/components/product-card';

// Common imports
import { useCounter } from '@/common/presentation/hooks/use-counter';
import { Button } from '@/common/presentation/components/button';
import { apiClient } from '@/common/infrastructure/api/client';

// App imports
import { metadata } from '@/app/layout';

// Config imports
import { fonts } from '@/config/fonts';
```

---

## 🎯 Creating a New Module

Follow these steps to create a new feature module:

### 1. Create folder structure
```bash
src/modules/[module-name]/
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── services/
│   └── value-objects/
├── infrastructure/
│   ├── api/
│   ├── repositories/
│   ├── mappers/
│   └── store/
└── presentation/
    ├── components/
    ├── hooks/
    ├── utils/
    └── pages/
```

### 2. Define domain entities
```typescript
// src/modules/[module-name]/domain/entities/[entity].ts
export interface Entity {
  id: string;
  // ... properties
}
```

### 3. Create Zustand store (if needed)
```typescript
// src/modules/[module-name]/infrastructure/store/[entity]-store.ts
import { create } from 'zustand';

export const useEntityStore = create<EntityState>((set) => ({
  // ... state and actions
}));
```

### 4. Create presentation hook
```typescript
// src/modules/[module-name]/presentation/hooks/use-entity.ts
import { useEntityStore } from '@/modules/[module-name]/infrastructure/store/entity-store';

export const useEntity = () => {
  // ... consume store
};
```

### 5. Create components
```typescript
// src/modules/[module-name]/presentation/components/entity-card.tsx
'use client';

import { useEntity } from '@/modules/[module-name]/presentation/hooks/use-entity';

export const EntityCard = () => {
  // ... component logic
};
```

---

## ✅ Best Practices

1. **Keep domain layer pure** - No external dependencies
2. **Use dependency inversion** - Domain defines interfaces, infrastructure implements
3. **State management in infrastructure** - Zustand stores belong here
4. **Presentation hooks** - Wrap stores in hooks for cleaner component code
5. **Path aliases** - Always use `@/` imports for consistency
6. **Module independence** - Modules should not directly depend on each other
7. **Share via common** - Put shared code in `common/` folder

---

## 📚 Example: Zustand Store Architecture

```
Store Location:     common/infrastructure/store/counter-store.ts
Hook Location:      common/presentation/hooks/use-counter.ts
Component Location: common/presentation/components/counter-example.tsx
```

**Flow:**
1. **Store** (infrastructure) - Manages state with Zustand
2. **Hook** (presentation) - Provides clean interface to store
3. **Component** (presentation) - Consumes hook

This separation ensures:
- ✅ Easy testing and mocking
- ✅ Decoupled components from store implementation
- ✅ Clean architecture principles maintained

---

## 🚀 Getting Started

Check the example implementation:
- **Store:** `src/common/infrastructure/store/counter-store.ts`
- **Hook:** `src/common/presentation/hooks/use-counter.ts`
- **Component:** `src/common/presentation/components/counter-example.tsx`

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.
