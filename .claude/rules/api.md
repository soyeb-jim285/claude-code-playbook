---
paths:
  - "src/**/*.js"
---

# API rules

- Signal client errors by throwing `HttpError(status, message)`. The top-level handler formats the response.
- Validate request input before it reaches the store.
- JSON error bodies always have the shape `{ "error": "message" }`.
