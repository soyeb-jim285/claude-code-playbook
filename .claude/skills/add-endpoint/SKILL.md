---
name: add-endpoint
description: Adds a new HTTP endpoint to the notes API with validation and tests. Use when asked to add, create, or expose an API route.
argument-hint: "<METHOD> <path> <what it does>"
---

Add this endpoint: $ARGUMENTS

1. Read `src/server.js` and `test/server.test.js`.
2. Write the failing tests first, following [checklist.md](checklist.md). Run `npm test` and confirm they fail for the expected reason.
3. Add the route inside `route()`. Keep it next to related routes.
4. Run `npm test` until everything passes.
5. Report the route, its status codes, and the test names you added.
