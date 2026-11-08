# 08 Hooks

A hook is a script that runs at set moments. Unlike `CLAUDE.md`, it always runs.

> **Warning:** hooks run as you. Check them in any repo you trust.

## Examples here

| When | File | Does |
|---|---|---|
| Before Bash | [guard-bash.mjs](../.claude/hooks/guard-bash.mjs) | Blocks risky commands |
| After Edit or Write | [check-js.mjs](../.claude/hooks/check-js.mjs) | Reports JS syntax errors |
| Session start | `settings.json` | Tells Claude the git branch |

## Add one

In `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/guard-bash.mjs\""
      }]
    }]
  }
}
```

The script gets JSON on stdin.

| Exit code | Means |
|---|---|
| `0` | OK |
| `2` | Block, send stderr to Claude |
| Other | Error, continue |

## Common events

| Event | Runs |
|---|---|
| `SessionStart` | Session begins |
| `UserPromptSubmit` | You send a prompt |
| `PreToolUse` | Before a tool |
| `PostToolUse` | After a tool |
| `Notification` | Claude needs you |
| `Stop` | Claude finishes |

## Test

```bash
echo '{"tool_input":{"command":"rm -rf src"}}' | node .claude/hooks/guard-bash.mjs
```

Prints a deny decision. In a session, `/hooks` lists all hooks.

The guard only matches text, so it can be bypassed. Use `/sandbox` for real security.

Next: [MCP and Playwright](09-mcp-and-playwright.md)
