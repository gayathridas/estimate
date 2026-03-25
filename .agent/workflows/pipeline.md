---
description: Generate or configure the GitHub Actions CI/CD deployment pipeline
---

# Pipeline Generation Workflow

When the user requests `/pipeline` or `/deploy`, execute the following:

### 0. 📄 Mandatory Documentation (Run FIRST for Every Feature or Fix)
Before writing any code or running any commands, create in `docs/`:
1. **Plan Doc** (`docs/<feature_name>_plan.md`) — goal, files affected, specific changes.
2. **ASCII Flow** (`docs/<feature_name>_ascii.md`) — before/after layout or data flow.
Update `.agent/filemap.md` to register both files.

### 1. Requirements Gathering
- Review `.agent/agent.md` for the project goal and tech stack.
- The build output is in `dist/` after `npm run build`.

### 2. Pipeline Generation
- Create `.github/workflows/deploy.yml` with a build + GitHub Pages deploy sequence:
  - `npm ci` → `npm run build` → upload `dist/` as Pages artifact → deploy.
- Target branch: `main`.

### 3. ⚠️ Pre-Push Verification (MANDATORY)
Before pushing, always remind the user:
> **"Go to GitHub > Settings > Pages > Source = 'GitHub Actions' before the first push."**

### 4. Automated Deployment
- Run `git add .`, `git commit -m "[summary]"`, `git push origin main` via `run_command`.

// turbo
### 5. Finalize & Push
- Execute add, commit, push sequentially.

### 6. User Instructions
- If push fails due to auth, ask the user to run `git push -u origin main` manually once.
- If `Get Pages site failed`, guide to **Settings > Pages > Source = GitHub Actions**.
- Direct user to the **Actions** tab to monitor deployment.
