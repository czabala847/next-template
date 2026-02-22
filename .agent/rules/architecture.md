# DDD Clean Architecture Rules

This project follows **Domain-Driven Design (DDD)** with **Clean Architecture** principles, organized into 4 distinct layers.

## 🏗️ The 4 Layers & Their Responsibilities

### 1. Domain (Business Core)
**Purpose:** Defines **WHAT** the business is and **WHAT** operation can be done, without knowing **HOW**.
**Contains:**
- `*.entity.ts`: Interfaces representing business concepts (The "Truth").
- `*.repository.interface.ts`: Contracts defining operations (findAll, create, delete) without implementation.
**Rule:** Pure logic. NO dependencies on external APIs, DBs, or frameworks.

### 2. Infrastructure (Technical Details)
**Purpose:** Implements **HOW** things are done (API connections, data transformations).
**Contains:**
- `dtos/`: Exact types of external API responses (things you don't control).
- `mappers/`: Adapters transforming external data to Domain format (Anti-Corruption Layer).
- `repositories/`: Real implementations (fetch, HTTP error handling, mapping).
**Rule:** If the API changes, ONLY this layer changes.

### 3. Application (Use Cases)
**Purpose:** Orchestrates business logic. Validates, authenticates, calls repositories.
**Contains:**
- `actions/queries.ts`: Server Actions for reading data (GET).
- `actions/commands.ts`: Server Actions for mutating data (POST/PUT/DELETE).
**Rule:** Centralizes "what happens when user does X". Does not mix UI with API calls.

### 4. Presentation (UI)
**Purpose:** Visual components the user interacts with.
**Contains:**
- `components/`: Render UI and call Server Actions.
**Rule:** Components are "dumb". They don't know about APIs or business logic, just render and trigger actions.

## 📂 Directory Structure

```
src/
├── app/                    # Next.js Routes
├── config/                 # Global configurations
├── lib/                    # Third-party libraries
├── shared/                 # Shared code across modules
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
└── modules/                # Business Modules
    └── [module-name]/
        ├── domain/
        │   ├── [entity].entity.ts
        │   └── [entity].repository.interface.ts
        ├── infrastructure/
        │   ├── dtos/
        │   │   └── [entity].dto.ts
        │   ├── mappers/
        │   │   └── [entity].mapper.ts
        │   └── repositories/
        │       └── [entity].repository.ts
        ├── application/
        │   └── actions/
        │       ├── queries.ts
        │       └── commands.ts
        └── presentation/
            └── components/
```

## 📏 Rules of Dependency
1. **Domain** depends on **Nothing**.
2. **Application** depends on **Domain** and **Infrastructure**.
3. **Presentation** depends on **Application**.
4. **Infrastructure** depends on **Domain** (implements interfaces).

## 📝 Naming Conventions
- Entities: `[name].entity.ts`
- Interfaces: `[name].repository.interface.ts`
- DTOs: `[name].dto.ts`
- Mappers: `[name].mapper.ts`
- Repositories: `[name].repository.ts`
- Server Actions: `queries.ts` (Read), `commands.ts` (Write)
