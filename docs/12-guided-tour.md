# 12 Guided tour

About 30 minutes. Spoilers at the bottom.

## Setup

```bash
echo "SECRET=demo" > .env
npm start
```

In a second terminal, run `claude` and accept the trust dialog.

## Steps

| # | Type this | You should see |
|---|---|---|
| 1 | `/context` | `CLAUDE.md` loaded |
| 2 | `/mcp` | `playwright` connected |
| 3 | `read public/index.html, then quote the rules for it` | The frontend rule |
| 4 | `/deep-dive how a note gets created` | Steps with `file:line` |
| 5 | `run: cat .env` | Blocked by a hook |
| 6 | `use the code-reviewer subagent on public/index.html` | A security finding |
| 7 | `use the ui-verifier subagent. Add "Buy Milk", then search "milk".` | A `FAIL` line |
| 8 | `use the test-writer subagent to reproduce that search bug` | One failing test |
| 9 | `fix the search bug, then run npm test` | All tests pass |
| 10 | `/add-endpoint PATCH /api/notes/:id edit text` | Tests, then route |
| 11 | `/audit-app` (uses the most tokens) | Confirmed findings |
| 12 | `/preflight` | `READY` or `NOT READY` |

## Next

```bash
claude plugin install superpowers@claude-plugins-official
```

Restart, then:

```text
> /superpowers:brainstorming add tags to notes
```

## Clean up

```bash
rm .env
```

## Spoilers: planted bugs

| Bug | Where | Fix |
|---|---|---|
| Search is case-sensitive | `src/server.js` | Lowercase both sides |
| Stored XSS | `public/index.html`, `renderNote()` | Use `textContent` |

Run this app on localhost only until the XSS bug is fixed.
