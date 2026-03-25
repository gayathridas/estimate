# Testing Architecture and Workflow

The following ASCII flow illustrates how the Unit Testing Agent (`/test`) integrates into the feature development lifecycle.

```text
    +-------------------+           +-----------------------+
    |   Feature Agent   |           |    Developer / User   |
    |    (/feature)     |           |                       |
    +---------+---------+           +----------+------------+
              |                                |
              v                                v
    +---------+---------+           +----------+------------+
    |  Implementation   |           |   Invoke Test Agent   |
    |  (src/*.ts)       |           |      (/test)          |
    +---------+---------+           +----------+------------+
              |                                |
              +---------------+----------------+
                              |
                              v
                    +---------+---------+
                    |   Test Discovery   |
                    | (src/*.test.ts)   |
                    +---------+---------+
                              |
                              v
                    +---------+---------+
                    |    Vitest Run     |
                    | (npm run test)    |
                    +---------+---------+
                              |
                /-------------+-------------\
                |                           |
                v                           v
      +---------+---------+       +---------+---------+
      |      FAIL         |       |      PASS         |
      +---------+---------+       +---------+---------+
                |                           |
                v                           v
      +---------+---------+       +---------+---------+
      |  Fix & Iterate    |       |  Finalize & Push  |
      | (Execution Step)  |       |    (/pipeline)    |
      +-------------------+       +-------------------+
```

### Key Components
1. **Vitest:** The primary testing framework.
2. **Estimator.test.ts:** Validates the core cost calculation logic.
3. **Standards:** Every feature must have a corresponding test file.
