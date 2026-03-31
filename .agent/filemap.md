# Project File Map — Estimate

## 📂 Root (`/`)
- **`index.html`** — Entry point HTML, mounts the Vite app.
- **`package.json`** — Project metadata and scripts (`dev`, `build`, `preview`).
- **`tsconfig.json`** — TypeScript compiler configuration (strict mode).
- **`.gitignore`** — Excludes `node_modules` and `dist` from version control.

## 📂 Source (`/src/`)
- **`main.ts`** — App entry point; mounts the UI and wires up event listeners.
- **`estimator.ts`** — Core estimation logic; computes USD cost breakdown from a user idea.
- **`estimator.test.ts`** — Unit tests for `estimator.ts`.
- **`style.css`** — Global design system styles (variables, layout, glassmorphism cards).

## 📂 Public (`/public/`)
- Static assets served as-is (e.g., favicon).

## 📂 AI and Workflows (`/.agent/`)
- **`agent.md`** — Project context, tech stack, remote repo, and known issues.
- **`coding_standards.md`** — TypeScript and CSS rules enforced by the agent.
- **`filemap.md`** — This file; registry of all project files and purposes.
- **`workflows/feature.md`** — `/feature` slash command workflow.
- **`workflows/pipeline.md`** — `/pipeline` slash command workflow.
- **`workflows/test.md`** — `/test` slash command workflow for unit testing.

## 📂 Documentation (`/docs/`)
- **`pipeline_plan.md`** — Plan doc for the initial deployment pipeline setup.
- **`pipeline_ascii.md`** — ASCII flow for the deployment and app data flow.
- **`aws_setup_guide.md`** — Step-by-step instructions for AWS OIDC/S3/CloudFront.
- **`ascii_flow.md`** — Comprehensive architecture and runtime logic flow for the Estimate app.
- **`testing_ascii.md`** — ASCII flow for the testing process.
- **`cost_details_plan.md`** — Plan doc for the Resource/Hosting/AI capture feature.
- **`cost_details_ascii.md`** — ASCII flow for the updated UI with cost details.

## 📂 CI/CD (`/.github/workflows/`)
- **`deploy.yml`** — GitHub Actions pipeline: Security Scan (CodeQL/Audit) → Build → AWS S3 Deploy via OIDC.
