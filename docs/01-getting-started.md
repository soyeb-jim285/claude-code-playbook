# 01 Getting started

## Install

```bash
curl -fsSL https://claude.ai/install.sh | bash
cd your-project
claude
```

Sign in, then accept the trust dialog. Run `/init` to create a `CLAUDE.md`.

## Start a session

```bash
claude                        # new session
claude -c                     # continue last session
claude -r                     # pick an old session
claude -p "summarize README"  # run once, print result
```

## Commands

| Command | Does |
|---|---|
| `/context` | Show context use |
| `/clear` | Start fresh |
| `/compact` | Shrink the conversation |
| `/rewind` | Go back to an earlier point |
| `/model` | Change model |
| `/permissions` | Edit permissions |
| `/memory` | Open memory |
| `/mcp` | Check MCP servers |
| `/plugin` | Manage plugins |
| `/doctor` | Fix install problems |

## Shortcuts

| Input | Does |
|---|---|
| `@file` | Mention a file |
| `!command` | Run a shell command |
| `Shift+Tab` | Change mode, including plan mode |
| `Esc` | Stop Claude |
| `Esc` `Esc` | Rewind |

## Good habit

Explore, plan, build, test. Run `/clear` before a new task.

Next: [CLAUDE.md and rules](02-claude-md-and-rules.md)
