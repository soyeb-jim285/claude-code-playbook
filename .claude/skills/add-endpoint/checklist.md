# Endpoint test checklist

Every new endpoint needs tests for:

- The success case, asserting status code and body
- Invalid input, expecting 400
- A missing resource, expecting 404 (when the route takes an id)
- Malformed JSON, expecting 400 (when the route reads a body)
