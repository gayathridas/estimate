---
description: Validate feature implementations with unit tests using Vitest
---

# Unit Testing Workflow

When the user invokes over chat (e.g., `/test` or `/test estimator`), execute the following procedure:

### 0. 📄 Mandatory Documentation
Before running tests or making changes, ensure the following are in `docs/`:
1. **Testing Plan** (`docs/testing_plan.md`):
   - List the components/functions being tested.
   - Describe the test cases (success, failure, edge cases).
2. **Testing ASCII Flow** (`docs/testing_ascii.md`):
   - Visualize the test coverage and data flow.

### 1. Context Acquisition
- **Read Guidelines:** Review `.agent/coding_standards.md` for "Unit Testing Standards".
- **Identify Target:** Determine which `.test.ts` files correspond to the implementation.

### 2. Execution
- **Run Tests:** Execute `npm run test` via `run_command`.
- **Analyze Results:** If tests fail, read the output to identify the exact line and cause.
- **Fix Issues:** Use code edit tools to fix the implementation (or update tests if the requirements changed).
- **Iterate:** Re-run tests until all pass.

### 3. Verification
- **Build Check:** Run `npm run build` to ensure no TypeScript regressions.
- **Report:** Provide a detailed summary of the test results to the user, including coverage if possible.

### 4. Update File Map
- Ensure all new `.test.ts` or `docs/testing_*` files are registered in `.agent/filemap.md`.
