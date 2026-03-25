# Pipeline Deployment Plan — Estimate App

## Goal
Deploy the Estimate Vite+TypeScript SPA to GitHub Pages using GitHub Actions.

## Files to Create / Change
| File | Action | Reason |
|---|---|---|
| `.github/workflows/deploy.yml` | CREATE | GitHub Actions CI/CD pipeline |
| `docs/pipeline_plan.md` | CREATE | Mandatory Step 0 documentation |
| `docs/pipeline_ascii.md` | CREATE | Mandatory Step 0 ASCII flow |
| `.agent/filemap.md` | UPDATE | Register new docs/ entries |

## Pipeline Steps (deploy.yml)
1. **Checkout** — pull source code from `main` branch
2. **Setup Node.js** — use Node 20 (LTS)
3. **npm ci** — install exact dependencies
4. **npm run build** — compile TypeScript and bundle via Vite → outputs to `dist/`
5. **Upload `dist/`** — `actions/upload-pages-artifact@v3`
6. **Deploy** — `actions/deploy-pages@v4`

## ⚠️ Manual Step Required
- Go to **GitHub > Settings > Pages > Build and deployment > Source**
- Change from "Deploy from a branch" to **"GitHub Actions"**

## Branch Target
- `main`
