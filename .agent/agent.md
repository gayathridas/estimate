# AI Agent Configuration & Context

## Project Overview
- **App Name:** Estimate
- **Goal:** A single-page TypeScript application where users enter an idea and receive a cost estimate in USD for executing it.
- **Current Status:** ✅ Live — Deployed to GitHub Pages.
- **Remote Repository:** `https://github.com/gayathridas/estimate.git`

## File Map Reference
- **[File Map](.agent/filemap.md):** View the file map for a structural overview of the codebase.

## Tech Stack (Confirmed)
- **Language:** TypeScript (strict mode)
- **Bundler:** Vite (vanilla-ts template)
- **Styling:** Custom CSS with glassmorphism, CSS variables, Flexbox/Grid
- **Deployment:** GitHub Actions → GitHub Pages (branch: `main`)

## Workflows & Pipelines
- Automated CI/CD pipeline: `.github/workflows/deploy.yml` (to be created via `/pipeline`)
- Unit Testing Agent: `/test` (via `.agent/workflows/test.md`)
- Custom AI workflows: `.agent/workflows/`

## Coding Guidelines
1. Use strict TypeScript — define interfaces for all data shapes.
2. Prioritize clean, modern, premium UI design.
3. Commit often with descriptive messages.

## 📝 Mandatory Documentation Rule (Step 0)
For every new feature, fix, or deployment, the agent MUST first:
1. Create/Update `docs/ascii_flow.md` — showing the architecture and logic flow.
2. Create/Update a Plan Doc — listing specific file and line changes.
3. Update `.agent/filemap.md` — registering the new documents.

## ⚠️ Known Issues & Lessons Learned
- **GitHub Pages Source Setting:** After the first push, go to **GitHub > Settings > Pages > Source = "GitHub Actions"**.
- **Git Identity Warning:** Resolve with `git config --global user.name` and `git config --global user.email`.
