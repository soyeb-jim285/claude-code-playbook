# 04 Permissions and settings

## Files

| File | For |
|---|---|
| `~/.claude/settings.json` | You, all projects |
| `.claude/settings.json` | Team |
| `.claude/settings.local.json` | You, this project (wins over both) |

## Rules

Order: **deny, ask, allow**. Deny always wins.

```json
{
  "permissions": {
    "allow": ["Bash(npm test)", "Bash(git diff --stat)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)"]
  }
}
```

| Rule | Matches |
|---|---|
| `Bash(npm test)` | That exact command |
| `Bash(npm run *)` | `npm run` with any arguments |
| `Read(./.env)` | That file |
| `Edit(/docs/**)` | Everything in `docs/` |
| `mcp__playwright__browser_click` | One MCP tool |

> **Careful with `*`:** `Bash(node --test *)` can run any code. `Bash(git diff *)` can read any file with `--no-index`. Allow exact commands instead.

## Modes

Press `Shift+Tab` to switch.

| Mode | Does |
|---|---|
| `default` | Asks first |
| `acceptEdits` | Allows file edits |
| `plan` | Plans only, no changes |
| `auto` | Allows routine actions, checks risky ones |
| `dontAsk` | Denies anything not allowed |
| `bypassPermissions` | No checks |

> **Warning:** use `bypassPermissions` only in a throwaway sandbox with no internet.

A `Read` deny does not stop `cat .env` in the shell. This repo adds a [hook](08-hooks.md) for that. For real isolation use `/sandbox`.

Next: [Skills](05-skills.md)
