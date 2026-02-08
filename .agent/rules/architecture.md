# DDD Clean Architecture Structure

This project follows **Domain-Driven Design (DDD)** with **Clean Architecture** principles.

## Folder Structure Rules

### Module Structure
Each feature module in `src/modules/[module-name]/` MUST have three layers:

1. **domain/** - Pure business logic (NO external dependencies)
   - `entities/` - Domain entities
   - `repositories/` - Repository interfaces (contracts)
   - `services/` - Domain services
   - `value-objects/` - Value objects

2. **infrastructure/** - External dependencies and implementations
   - `api/` - API clients
   - `repositories/` - Repository implementations
   - `mappers/` - Data mappers/adapters
   - `store/` - **Zustand stores belong here** (state management is infrastructure)

3. **presentation/** - UI layer
   - `components/` - React components
   - `hooks/` - Custom hooks (wrap stores for clean component code)
   - `utils/` - UI utilities
   - `pages/` - Page-specific components

### Common Folder
`src/common/` contains shared code with the same three-layer structure:
- `domain/` - Shared business logic
- `infrastructure/` - Shared infrastructure (API clients, storage, **Zustand stores**)
- `presentation/` - Shared UI (components, hooks, utils, styles)

### App Folder
`src/app/` contains Next.js App Router pages only.

## State Management with Zustand

### ✅ Correct Placement
**Zustand stores MUST be in the infrastructure layer:**
- Module stores: `src/modules/[module-name]/infrastructure/store/`
- Shared stores: `src/common/infrastructure/store/`

**Why infrastructure?**
- Zustand is an external library dependency
- State management is an infrastructure concern
- Domain layer must remain pure (no external dependencies)

### Architecture Pattern
Follow this three-tier pattern:

1. **Store** (infrastructure layer)
   ```typescript
   // src/common/infrastructure/store/counter-store.ts
   import { create } from 'zustand';
   
   export const useCounterStore = create<CounterState>((set) => ({
     count: 0,
     increment: () => set((state) => ({ count: state.count + 1 })),
   }));
   ```

2. **Hook** (presentation layer)
   ```typescript
   // src/common/presentation/hooks/use-counter.ts
   import { useCounterStore } from '@/common/infrastructure/store/counter-store';
   
   export const useCounter = () => {
     const count = useCounterStore((state) => state.count);
     const increment = useCounterStore((state) => state.increment);
     return { count, increment };
   };
   ```

3. **Component** (presentation layer)
   ```typescript
   // src/common/presentation/components/counter.tsx
   'use client';
   import { useCounter } from '@/common/presentation/hooks/use-counter';
   
   export const Counter = () => {
     const { count, increment } = useCounter();
     return <button onClick={increment}>{count}</button>;
   };
   ```

## Import Rules

### TypeScript Path Aliases
ALWAYS use these path aliases:
- `@/modules/*` - Feature modules
- `@/common/*` - Shared code
- `@/app/*` - App pages
- `@/config/*` - Configuration

### Dependency Rules
- **Domain layer** - NO imports from infrastructure or presentation
- **Infrastructure layer** - Can import from domain
- **Presentation layer** - Can import from domain and infrastructure
- **Modules** - Should NOT directly depend on other modules (use common for shared code)

## File Naming Conventions
- Components: `kebab-case.tsx` (e.g., `product-card.tsx`)
- Hooks: `use-[name].ts` (e.g., `use-product.ts`)
- Stores: `[name]-store.ts` (e.g., `product-store.ts`)
- Entities: `[name].ts` (e.g., `product.ts`)

## Best Practices

1. **Keep domain pure** - No external dependencies in domain layer
2. **State in infrastructure** - All Zustand stores in infrastructure layer
3. **Wrap stores in hooks** - Don't use stores directly in components
4. **Use path aliases** - Always use `@/` imports
5. **Module independence** - Modules should not depend on each other
6. **Share via common** - Put shared code in `common/` folder

## Example Reference
See the counter example implementation:
- Store: `src/common/infrastructure/store/counter-store.ts`
- Hook: `src/common/presentation/hooks/use-counter.ts`
- Component: `src/common/presentation/components/counter-example.tsx`
