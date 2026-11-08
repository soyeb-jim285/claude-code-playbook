# 02 CLAUDE.md and rules

`CLAUDE.md` is read at the start of every session. Keep it short.

## Where

| File | For |
|---|---|
| `~/.claude/CLAUDE.md` | You, all projects |
| `./CLAUDE.md` | Team, this project |
| `./CLAUDE.local.md` | You, this project (git-ignored) |

## Create

```text
> /init
```

**Add:** commands, unusual conventions, gotchas.
**Skip:** anything Claude can learn from the code.

## Import a file

```markdown
Available npm commands: @package.json
```

## Rules for certain files

A rule with `paths` loads only for matching files.

`.claude/rules/frontend.md`:

```markdown
---
paths:
  - "public/**"
---

Render user text with `textContent`, never `innerHTML`.
```

## Try

```text
> how do I run one test?
> read public/index.html, then quote the rules for that file
```

Next: [Memory](03-memory.md)
