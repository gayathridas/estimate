# Project File Map — Estimate

## 📂 Root (`/`)
- **`index.html`** — Entry point HTML, mounts the Vite app.
- **`package.json`** — Project metadata and scripts (`dev`, `build`, `preview`).
- **`tsconfig.json`** — TypeScript compiler configuration (strict mode).
- **`.gitignore`** — Excludes `node_modules` and `dist` from version control.

## 📂 Source (`/src/`)
- **`main.ts`** — App entry point; mounts the UI and wires up event listeners.
- **`estimator.ts`** — Core estimation logic; computes USD cost breakdown from a user idea.
- **`style.css`** — Global design system styles (variables, layout, glassmorphism cards).

## 📂 Public (`/public/`)
- Static assets served as-is (e.g., favicon).

## 📂 AI and Workflows (`/.agent/`)
- **`agent.md`** — Project context, tech stack, remote repo, and known issues.
- **`coding_standards.md`** — TypeScript and CSS rules enforced by the agent.
- **`filemap.md`** — This file; registry of all project files and purposes.
- **`workflows/feature.md`** — `/feature` slash command workflow.
- **`workflows/pipeline.md`** — `/pipeline` slash command workflow.

## 📂 Documentation (`/docs/`)
- **`pipeline_plan.md`** — Plan doc for the initial deployment pipeline setup.
- **`pipeline_ascii.md`** — ASCII flow for the deployment and app data flow.

## 📂 CI/CD (`/.github/workflows/`)
- **`deploy.yml`** — GitHub Actions pipeline: Node 20 → npm ci → npm run build → GitHub Pages deploy from `dist/`.
