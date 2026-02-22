# 🏗️ DDD Clean Architecture - Project Structure

This project follows **Domain-Driven Design (DDD)** principles with **Clean Architecture**, organized into **4 distinct layers** to ensure maintainability, scalability, and separation of concerns.

---

## 📚 The 4 Layers & Their Functions

### 1️⃣ **Domain (Business Core)**
**Purpose:** Defines **WHAT** the business is and **WHAT** it can do, without knowing **HOW**.

- **`*.entity.ts`**: Interfaces that represent your business concepts (e.g., `Product`, `CreateProductDto`). These are the "truth" of your application.
- **`*.repository.interface.ts`**: Contracts that define operations (`findAll`, `create`, `delete`) without implementing **how** they are done.

> **Why it's important:** Your business logic does not depend on external APIs, databases, or frameworks. It is pure and reusable.

### 2️⃣ **Infrastructure (Technical Details)**
**Purpose:** Implements **HOW** things are done: API connections, data transformation, etc.

- **`dtos/`**: Exact types of the external API response (which **YOU** do not control).
- **`mappers/`**: Adapters that transform external data into your Domain format (Anti-Corruption Layer).
- **`repositories/`**: Real implementation: performs `fetch`, handles HTTP errors, maps responses.

> **Why it's important:** If the API changes, you only modify this layer. The rest of your app doesn't know.

### 3️⃣ **Application (Use Cases)**
**Purpose:** Orchestrates business logic: validatates, authenticates, calls repositories, handles errors.

- **`queries.ts`**: Server Actions for reading (**GET**).
- **`commands.ts`**: Server Actions for writing (**POST/PUT/DELETE**).

> **Why it's important:** Centralizes the logic of "what happens when the user does X". Does not mix UI with API calls.

### 4️⃣ **Presentation (UI)**
**Purpose:** Visual components that the user sees and interacts with.

- **`components/`**: Only responsible for rendering and calling Server Actions.

> **Why it's important:** "Dumb" and reusable components. They know nothing about APIs or business logic.

---

## 📂 Project Structure

We follow a modular structure where each business module allows for clear separation.

```
src/
├── app/                    # Next.js Routes & Pages
├── config/                 # Global configurations
├── lib/                    # Third-party libraries
├── shared/                 # Code shared between modules
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
└── modules/                # Business Modules
    └── [module-name]/      # e.g., products, auth, cart
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

---

## 🚀 Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
