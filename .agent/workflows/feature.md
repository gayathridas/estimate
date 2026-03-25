---
description: Implement a new frontend feature or UI component
---

# Feature Implementation Workflow

When the user invokes over chat (e.g., `/feature add a history panel`), execute the following procedure:

### 0. 📄 Mandatory Documentation (Run FIRST, Before Any Code)
Before writing any code, create the following two files in `docs/`:

1. **Plan Doc** (`docs/<feature_name>_plan.md`):
   - State the goal of the feature.
   - List every specific file change (TS/CSS/HTML), which lines are affected, and why.

2. **ASCII Flow** (`docs/<feature_name>_ascii.md`):
   - Show before/after UI or data flow in ASCII art.
   - Illustrate UI state changes.

After creating both files, update `.agent/filemap.md` to register them under `📂 Documentation (/docs/)`.

### 1. Context Acquisition
- **Read Guidelines:** Review `.agent/coding_standards.md` for TypeScript strict rules and CSS standards.
- **Review Architecture:** Check `docs/` for existing ASCII flows. Check `.agent/filemap.md` for the file registry.

### 2. Planning
- Identify which files change: `src/main.ts`, `src/estimator.ts`, `src/style.css`, or `index.html`.
- Ensure all new TypeScript code uses proper interfaces and strict typing.

### 3. Execution
- Use code edit tools to implement the changes precisely.
- Do NOT use shell scripts or bash loops; rely on precision file tools.
- Before finishing, run `npm run build` via `run_command` to verify no TypeScript errors.

### 4. Verification
- Report the final changes to the user.
- Update `.agent/filemap.md` if any new files were created.
