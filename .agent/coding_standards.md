# AI Agent Coding Standards — Estimate Project

## 1. General Principles
- **Strict TypeScript:** All variables, function parameters, and return types MUST be explicitly typed. No `any`.
- **Interfaces over Types:** Define `interface` for all data shapes (e.g., `EstimateResult`, `CostBreakdown`).
- **DRY:** Extract reusable logic into utility functions in `src/utils/`.
- **Single Responsibility:** Each module or function does one thing only.

## 2. TypeScript Standards
- Enable `strict: true` in `tsconfig.json`.
- Use `const` by default; `let` only when reassignment is required.
- Avoid `!` (non-null assertion) operator; use proper null checks instead.
- Use `enum` for fixed sets of values (e.g., effort levels, cost categories).
- **`import type`:** Always use `import type { Foo }` for type-only imports. Mixing value and type imports in one statement causes TS1484 errors with `verbatimModuleSyntax`.

## 3. CSS Standards
- All design tokens (colors, spacing, fonts) MUST be defined as CSS custom properties in `:root`.
- Use glassmorphism cards, dark backgrounds, and gradient accents from the design system.
- Mobile-first, responsive with `@media` breakpoints.
- CSS class names: lowercase kebab-case only.

## 4. HTML / DOM Standards
- Minimize direct DOM manipulation; prefer updating via typed functions.
- Use `data-*` attributes for state where appropriate.
- All interactive elements must have descriptive `id` attributes.

## 5. Deployment & Automation
- **Pre-Deployment Checklist:**
  1. Run `npm run build` locally and verify no TypeScript errors.
  2. Confirm `.github/workflows/deploy.yml` exists and targets `main`.
  3. Remind user: **GitHub > Settings > Pages > Source = "GitHub Actions"** (first-time only).
- **Known Pitfalls:**
  - `Get Pages site failed`: Fix via Settings > Pages > Source > GitHub Actions.
  - TypeScript build errors will break the Actions pipeline — always run `npm run build` locally first.
+ - **Unit Testing Standards:**
+   1. Every core feature or logic utility MUST have a corresponding `.test.ts` file in `src/`.
+   2. Use `vitest` for all unit and integration tests.
+   3. Tests must be executed before every push to ensure no regressions.
+   4. Naming convention: `<filename>.test.ts`.
