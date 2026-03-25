# Pipeline ASCII Flow — Estimate App

## Deployment Flow

```
YOUR MACHINE
  |
  |-- git push origin main
  |
  v
GITHUB.COM (ai-demo/estimate repo)
  |
  |-- Triggers GitHub Actions (deploy.yml)
  |
  v
GITHUB ACTIONS RUNNER (ubuntu-latest)
  |
  |-- 1. Checkout source code
  |-- 2. Setup Node.js 20
  |-- 3. npm ci
  |-- 4. npm run build
  |         |
  |         v
  |       [ TypeScript Compile ]
  |         |
  |         v
  |       [ Vite Bundle → /dist ]
  |
  |-- 5. Upload /dist as Pages artifact
  |-- 6. Deploy to GitHub Pages
  |
  v
GITHUB PAGES
  https://gayathridas.github.io/estimate (live site)
```

## File Transformation

```
Source Files                    Build Output (dist/)
─────────────────               ─────────────────────
src/main.ts       ──┐           index.html
src/estimator.ts  ──┤  Vite  ── assets/index-[hash].js
src/style.css     ──┤  Build ── assets/index-[hash].css
index.html        ──┘
```

## App Data Flow (Runtime)

```
User enters idea
      │
      ▼
[ ideaInput textarea ]  +  [ complexitySelect ]
      │
      ▼
  form submit event (main.ts)
      │
      ▼
  generateEstimate(idea, complexity)   ← estimator.ts
      │
      ▼
  EstimateResult {
    categories: CostCategory[],
    totalMin: number,
    totalMax: number
  }
      │
      ▼
  renderResults() → builds DOM cards
      │
      ▼
  #resultsSection  (visible, smooth scroll)
```
