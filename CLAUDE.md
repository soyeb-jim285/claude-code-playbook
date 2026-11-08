# Notes app

Zero-dependency Node.js notes app. It exists as a target for practicing Claude Code.

Available npm commands: @package.json

## Commands

- Run the app: `npm start`, then open http://localhost:3000 (`PORT` overrides the port)
- Run all tests: `npm test`
- Run one test: `node --test --test-name-pattern="rejects blank" test/server.test.js`
- Validate the Claude Code setup: `npm run check:setup`

## Layout

- `src/server.js`: HTTP routes, validation, and the in-memory store
- `public/index.html`: the whole UI, with inline CSS and JS
- `test/server.test.js`: API tests using `node:test`
- `docs/`: guides for each Claude Code feature

## Conventions

- Do not add npm dependencies to the app. Use the Node standard library.
- Every behavior change needs a test in `test/server.test.js`.
- Run `npm test` before saying a change works.
