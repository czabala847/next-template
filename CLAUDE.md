# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Architecture

This is a Next.js App Router project using **Domain-Driven Design (DDD) with Clean Architecture**, organized into 4 layers per module.

### Directory Structure

```
src/
├── app/                    # Next.js routing (App Router)
│   ├── (private)/          # Route group for authenticated pages
│   ├── auth/               # Public auth pages (login, register)
│   └── api/auth/           # NextAuth.js API handler
├── config/                 # Global config (fonts)
├── lib/                    # Utilities (cn() helper)
├── shared/                 # Cross-module shared code
│   ├── domain/             # Shared entities & interfaces
│   ├── infrastructure/     # Shared stores (Zustand), HTTP utils
│   └── presentation/       # Shared UI components (shadcn/ui)
└── modules/
    ├── public/             # Unauthenticated modules (auth)
    └── private/            # Authenticated modules (products, etc.)
```

### Module Structure (DDD Layers)

Each module under `src/modules/` follows this structure:

```
modules/private/<feature>/
├── domain/
│   ├── <feature>.entity.ts              # Pure TypeScript interfaces
│   └── repositories/<feature>.repository.interface.ts
├── infrastructure/
│   ├── dtos/<feature>.dto.ts            # External API response types
│   ├── mappers/<feature>.mapper.ts      # API response → domain model
│   ├── repositories/<feature>.repository.ts  # Implements interface
│   └── index.ts                         # Exports repository singleton
├── application/
│   ├── actions/<feature>-queries.action.ts    # "use server" GET actions
│   ├── actions/<feature>-commands.action.ts   # "use server" mutations
│   └── use-cases/<feature>.use-case.ts        # Business logic
└── presentation/
    ├── components/   # React components
    └── hooks/        # Custom hooks
```

### Key Patterns

- **Server Actions**: All API calls use `"use server"` directives in `application/actions/`. Queries (`*-queries.action.ts`) for reads, commands (`*-commands.action.ts`) for writes.
- **Anti-Corruption Layer**: Mappers (`*-mapper.ts`) isolate domain models from external API shape changes.
- **Dependency Injection**: Repositories are passed as parameters to use cases/actions for testability.
- **Shared UI**: shadcn/ui components live in `src/shared/presentation/components/ui/`. Use `cn()` from `src/lib/utils.ts` for Tailwind class merging.
- **Client State**: Zustand stores in `src/shared/infrastructure/store/`.

### Authentication

- **NextAuth.js** (Credentials provider) with JWT sessions.
- Token refresh at 60-minute expiration; error state exposed on session as `error: "RefreshTokenError"`.
- Middleware at `src/middleware.ts` protects: `/admin/*`, `/cart/*`, `/category/*`, `/checkout/*`, `/orders/*`, `/products/*`, `/empty/*`.
- Custom session types extended in `src/types/next-auth.d.ts`.

### Path Aliases (tsconfig)

| Alias | Resolves to |
|-------|-------------|
| `@/*` | `./src/*` |
| `@/modules/*` | `./src/modules/*` |
| `@/common/*` | `./src/shared/*` |
| `@/app/*` | `./src/app/*` |
| `@/config/*` | `./src/config/*` |

### Tech Stack

- **Next.js** (App Router) + **TypeScript** strict mode
- **Tailwind CSS v4** + **shadcn/ui** (new-york style, neutral base, lucide icons)
- **NextAuth.js v4** for authentication
- **Zustand v5** for client state
- External image domains: `fakestoreapi.com`, `dummyjson.com`
